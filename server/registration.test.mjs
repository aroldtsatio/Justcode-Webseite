import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { createRegistrationHandler } from './registration-handler.mjs';
import { validateRegistration } from './validation.mjs';
import { createRegistrationRepository } from './database.mjs';

const valid = { name: ' Test Student ', email: 'STUDENT@Example.com', major: 'Computer Science', semester: '3', interests: 'Web and AI', website: '' };
const env = { DATABASE_URL: 'postgresql://unused/test', RATE_LIMIT_SECRET: 'a'.repeat(64), NODE_ENV: 'test' };

function makeStore() {
  const records = new Map();
  const counters = new Map();
  return {
    records, counters,
    async consumeRateLimit(key) {
      const attempts = (counters.get(key) || 0) + 1;
      counters.set(key, attempts);
      return { allowed: attempts <= 5, retryAfter: 900 };
    },
    async save(data) {
      if (!records.has(data.email)) records.set(data.email, data);
    },
  };
}

async function invoke({ body = valid, method = 'POST', headers = {}, repository = makeStore(), environment = env, raw = false } = {}) {
  const req = raw ? Readable.from([Buffer.from(body)]) : { body };
  Object.assign(req, { method, headers: { 'content-type': 'application/json', origin: 'http://localhost:5173', ...headers }, socket: { remoteAddress: '127.0.0.1' } });
  const response = { headers: {}, setHeader(key,value) { this.headers[key.toLowerCase()] = value; }, end(body) { this.body = JSON.parse(body); } };
  await createRegistrationHandler({ env: environment, getRepository: () => repository, logError: () => {} })(req, response);
  return response;
}

test('normalizes input and returns only confirmation, without exposing stored personal data', async () => {
  const repository = makeStore();
  const res = await invoke({ repository });
  assert.equal(res.statusCode, 202);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(repository.records.get('student@example.com').name, 'Test Student');
  assert.equal(repository.records.get('student@example.com').semester, 3);
  assert.equal(res.headers['cache-control'], 'no-store');
  assert.match([...repository.counters.keys()][0], /^[a-f0-9]{64}$/);
});

test('duplicate email, including case variants, does not overwrite an application', async () => {
  const repository = makeStore();
  await invoke({ repository });
  const res = await invoke({ repository, body: { ...valid, email: 'student@example.com', name: 'Changed' } });
  assert.equal(res.statusCode, 202);
  assert.equal(repository.records.size, 1);
  assert.equal(repository.records.get('student@example.com').name, 'Test Student');
});

test('validation rejects missing, oversized and malformed values', () => {
  for (const body of [null, [], {}, { ...valid, email: 'bad' }, { ...valid, name: ' ' }, { ...valid, name: 'x'.repeat(121) }, { ...valid, interests: 'x'.repeat(2001) }, { ...valid, semester: '0' }, { ...valid, semester: '31' }, { ...valid, semester: '2.5' }, { ...valid, semester: 3 }, { ...valid, email: 'test@example.com\nbcc@example.com' }]) {
    assert.throws(() => validateRegistration(body), error => error.status === 400);
  }
});

test('invalid field names are returned for accessible inline errors', async () => {
  const res = await invoke({ body: { ...valid, email: 'bad', semester: '0' } });
  assert.equal(res.statusCode, 400);
  assert.deepEqual(Object.keys(res.body.fields).sort(), ['email', 'semester']);
});

test('rejects other origins and cross-site requests before storing anything', async () => {
  const repository = makeStore();
  assert.equal((await invoke({ repository, headers: { origin: 'https://elsewhere.example' } })).statusCode, 403);
  assert.equal((await invoke({ repository, headers: { 'sec-fetch-site': 'cross-site' } })).statusCode, 403);
  assert.equal(repository.records.size, 0);
});

test('configured production origin and Vercel preview origin are allowed', async () => {
  const production = { ...env, NODE_ENV: 'production', SITE_ORIGIN: 'https://justcode.example', VERCEL_URL: 'preview.vercel.app' };
  for (const origin of ['https://justcode.example', 'https://preview.vercel.app']) {
    assert.equal((await invoke({ environment: production, headers: { origin } })).statusCode, 202);
  }
  assert.equal((await invoke({ environment: production })).statusCode, 403);
});

test('POST is the only supported method and no application listing is exposed', async () => {
  for (const method of ['GET', 'PUT', 'DELETE', 'OPTIONS']) {
    const res = await invoke({ method });
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.allow, 'POST');
  }
});

test('rejects non-JSON, malformed JSON and oversized bodies', async () => {
  assert.equal((await invoke({ headers: { 'content-type': 'text/plain' } })).statusCode, 415);
  assert.equal((await invoke({ body: '{bad', raw: true })).statusCode, 400);
  assert.equal((await invoke({ body: JSON.stringify({ ...valid, interests: 'x'.repeat(17000) }), raw: true })).statusCode, 413);
  assert.equal((await invoke({ body: { ...valid, interests: 'x'.repeat(17000) } })).statusCode, 413);
});

test('honeypot submissions are discarded without opening a database connection', async () => {
  const repository = makeStore();
  const res = await invoke({ repository, body: { ...valid, website: 'spam.example' } });
  assert.equal(res.statusCode, 202);
  assert.equal(repository.records.size, 0);
  assert.equal(repository.counters.size, 0);
});

test('limit is shared between requests and concurrent handler invocations', async () => {
  const repository = makeStore();
  const results = await Promise.all(Array.from({ length: 6 }, () => invoke({ repository })));
  assert.equal(results.filter(r => r.statusCode === 202).length, 5);
  const rejected = results.find(r => r.statusCode === 429);
  assert.equal(rejected.headers['retry-after'], '900');
});

test('untrusted forwarded headers cannot bypass local rate limits', async () => {
  const repository = makeStore();
  for (let index = 0; index < 5; index++) await invoke({ repository, headers: { 'x-forwarded-for': '1.2.3.' + index } });
  assert.equal((await invoke({ repository, headers: { 'x-forwarded-for': '9.9.9.9' } })).statusCode, 429);
});

test('missing configuration or database failure never produces a success response', async () => {
  assert.equal((await invoke({ environment: { ...env, DATABASE_URL: '' } })).statusCode, 503);
  assert.equal((await invoke({ environment: { ...env, RATE_LIMIT_SECRET: 'short' } })).statusCode, 503);
  const repository = { async consumeRateLimit() { throw new Error('private database details'); } };
  const res = await invoke({ repository });
  assert.equal(res.statusCode, 503);
  assert.deepEqual(res.body, { error: 'service_unavailable' });
});

test('SQL adapter binds all applicant data and uses an atomic database limiter', async () => {
  const calls = [];
  const sql = { async query(text, values) {
    calls.push({ text, values });
    return [{ attempts: 6, retry_after: 120 }];
  } };
  const repository = createRegistrationRepository(sql);
  assert.deepEqual(await repository.consumeRateLimit('a'.repeat(64)), { allowed: false, retryAfter: 120 });
  const data = validateRegistration({ ...valid, name: "Robert'); DROP TABLE registrations;--" });
  await repository.save(data);
  const insert = calls.at(-1);
  assert(!insert.text.includes(data.name));
  assert.equal(insert.values[1], data.name);
  assert.match(insert.text, /ON CONFLICT \(email\) DO NOTHING/);
  assert.match(calls[0].text, /ON CONFLICT \(key\) DO UPDATE/);
});

test('real HTTP request passes raw JSON parser, validation and persistence boundary', async (t) => {
  const repository = makeStore();
  const handler = createRegistrationHandler({ env, getRepository: () => repository });
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const response = await fetch(`http://127.0.0.1:${server.address().port}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' }, body: JSON.stringify(valid),
  });
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(repository.records.size, 1);
});


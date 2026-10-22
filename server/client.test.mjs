import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transformWithEsbuild } from 'vite';

const source = await readFile(new URL('../src/app/utils/registration.ts', import.meta.url), 'utf8');
const { code } = await transformWithEsbuild(source, 'registration.ts', { loader: 'ts', target: 'es2022' });
const { submitRegistration } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const registration = { name: 'Test', email: 'test@example.com', major: 'CS', semester: '1', interests: 'Web', website: '' };

test('client posts JSON to the same-origin API', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, '/api/registrations');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), registration);
    return new Response(JSON.stringify({ ok: true }), { status: 202 });
  });
  await submitRegistration(registration);
});

test('client preserves server validation errors and rate-limit errors', async (t) => {
  for (const [status, error] of [[400, 'validation_failed'], [429, 'too_many_requests']]) {
    const mocked = t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ error, fields: { email: 'invalid' } }), { status }));
    await assert.rejects(submitRegistration(registration), e => e.code === error && e.fields.email === 'invalid');
    mocked.mock.restore();
  }
});

test('client rejects HTML fallback responses and network errors', async (t) => {
  const mocked = t.mock.method(globalThis, 'fetch', async () => new Response('<html>Not an API</html>', { status: 200 }));
  await assert.rejects(submitRegistration(registration), e => e.code === 'service_unavailable');
  mocked.mock.restore();
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('offline'); });
  await assert.rejects(submitRegistration(registration), e => e.code === 'network_error');
});


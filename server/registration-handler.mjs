import { createHmac, randomUUID } from 'node:crypto';
import { connectDatabase, createRegistrationRepository } from './database.mjs';
import { RequestError, validateRegistration } from './validation.mjs';

const MAX_BODY_BYTES = 16 * 1024;

async function readBody(req) {
  // Vercel parses JSON; the local Vite middleware supplies a raw Node request.
  if (req.body !== undefined) {
    const serialized = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (Buffer.byteLength(serialized) > MAX_BODY_BYTES) throw new RequestError(413, 'payload_too_large');
    try { return typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
    catch { throw new RequestError(400, 'invalid_json'); }
  }
  return new Promise((resolve, reject) => {
    let size = 0;
    let chunks = [];
    let exceeded = false;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        exceeded = true;
        chunks = [];
      } else if (!exceeded) chunks.push(chunk);
    });
    req.on('end', () => {
      if (exceeded) return reject(new RequestError(413, 'payload_too_large'));
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(new RequestError(400, 'invalid_json')); }
    });
    req.on('error', () => reject(new RequestError(400, 'invalid_request')));
    req.on('aborted', () => reject(new RequestError(400, 'invalid_request')));
  });
}

function allowedOrigins(env) {
  const origins = (env.SITE_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
  if (env.VERCEL_URL) origins.push(`https://${env.VERCEL_URL}`);
  if (env.NODE_ENV !== 'production') origins.push('http://localhost:5173', 'http://127.0.0.1:5173');
  return origins;
}

export function createRegistrationHandler({
  env = process.env,
  getRepository = () => createRegistrationRepository(connectDatabase(env.DATABASE_URL)),
  logError = (id) => console.error(`Registration request failed [${id}]`),
} = {}) {
  return async function handler(req, res) {
    const requestId = randomUUID();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Request-Id', requestId);
    const send = (status, data) => { res.statusCode = status; res.end(JSON.stringify(data)); };
    try {
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return send(405, { error: 'method_not_allowed' });
      }
      const origin = req.headers.origin;
      if (origin && (typeof origin !== 'string' || !allowedOrigins(env).includes(origin))) {
        return send(403, { error: 'origin_not_allowed' });
      }
      if (req.headers['sec-fetch-site'] === 'cross-site') return send(403, { error: 'origin_not_allowed' });
      if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) {
        return send(415, { error: 'unsupported_media_type' });
      }
      if (Number(req.headers['content-length']) > MAX_BODY_BYTES) {
        req.resume?.();
        return send(413, { error: 'payload_too_large' });
      }
      const body = await readBody(req);
      const registration = validateRegistration(body);
      if (typeof body.website === 'string' && body.website.trim()) return send(202, { ok: true });
      if (!env.DATABASE_URL || !env.RATE_LIMIT_SECRET || env.RATE_LIMIT_SECRET.length < 32) {
        return send(503, { error: 'service_unavailable' });
      }
      // Only trust forwarded headers when the request is served by Vercel.
      const ip = env.VERCEL === '1'
        ? String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
        : req.socket?.remoteAddress;
      if (!ip) return send(503, { error: 'service_unavailable' });
      const key = createHmac('sha256', env.RATE_LIMIT_SECRET).update(ip).digest('hex');
      const repository = getRepository();
      const limit = await repository.consumeRateLimit(key);
      if (!limit.allowed) {
        res.setHeader('Retry-After', String(limit.retryAfter));
        return send(429, { error: 'too_many_requests' });
      }
      await repository.save(registration);
      // A duplicate email returns the same response and never overwrites an application.
      return send(202, { ok: true });
    } catch (error) {
      if (error instanceof RequestError) return send(error.status, { error: error.code, ...(error.fields ? { fields: error.fields } : {}) });
      logError(requestId); // Never log names, email addresses, request bodies or DB credentials.
      return send(503, { error: 'service_unavailable' });
    }
  };
}

export default createRegistrationHandler();


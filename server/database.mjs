import { neon } from '@neondatabase/serverless';
import { randomUUID } from 'node:crypto';

export function connectDatabase(url) {
  if (!url) throw new Error('DATABASE_URL is required');
  return neon(url);
}

export function createRegistrationRepository(sql) {
  return {
    async consumeRateLimit(key) {
      // Database-backed and atomic: works across concurrent Vercel instances.
      const rows = await sql.query(`
        INSERT INTO registration_rate_limits (key, attempts, expires_at)
        VALUES ($1, 1, NOW() + INTERVAL '15 minutes')
        ON CONFLICT (key) DO UPDATE SET
          attempts = CASE WHEN registration_rate_limits.expires_at <= NOW()
            THEN 1 ELSE registration_rate_limits.attempts + 1 END,
          expires_at = CASE WHEN registration_rate_limits.expires_at <= NOW()
            THEN NOW() + INTERVAL '15 minutes' ELSE registration_rate_limits.expires_at END
        RETURNING attempts,
          GREATEST(1, CEIL(EXTRACT(EPOCH FROM expires_at - NOW())))::integer AS retry_after
      `, [key], { fetchOptions: { signal: AbortSignal.timeout(8000) } });
      // Only pseudonymous counters are stored; expired rows are cleaned on traffic.
      await sql.query('DELETE FROM registration_rate_limits WHERE expires_at <= NOW()', [],
        { fetchOptions: { signal: AbortSignal.timeout(8000) } });
      return { allowed: rows[0].attempts <= 5, retryAfter: rows[0].retry_after };
    },
    async save(registration) {
      const { name, email, major, semester, interests } = registration;
      await sql.query(`
        INSERT INTO registrations (id, name, email, major, semester, interests)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO NOTHING
      `, [randomUUID(), name, email, major, semester, interests],
      { fetchOptions: { signal: AbortSignal.timeout(8000) } });
    },
  };
}


import { readFile } from 'node:fs/promises';
import { connectDatabase } from './database.mjs';

try {
  const sql = connectDatabase(process.env.DATABASE_URL);
  const schema = await readFile(new URL('./migrations/001-registrations.sql', import.meta.url), 'utf8');
  const statements = schema.split(';').map(s => s.trim()).filter(Boolean);
  await sql.transaction(statements.map(statement => sql.query(statement)));
  console.log('Registration database schema is ready.');
} catch {
  console.error('Migration failed. Check DATABASE_URL, database access and permissions. No credentials were logged.');
  process.exitCode = 1;
}


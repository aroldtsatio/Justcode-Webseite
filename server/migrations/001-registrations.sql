CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY,
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 120),
  email text NOT NULL UNIQUE CHECK (length(email) BETWEEN 3 AND 254 AND email = lower(email)),
  major text NOT NULL CHECK (length(major) BETWEEN 1 AND 160),
  semester smallint NOT NULL CHECK (semester BETWEEN 1 AND 30),
  interests text NOT NULL CHECK (length(interests) BETWEEN 1 AND 2000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS registration_rate_limits (
  key char(64) PRIMARY KEY,
  attempts integer NOT NULL CHECK (attempts > 0),
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS registration_rate_limits_expiry ON registration_rate_limits (expires_at);
CREATE INDEX IF NOT EXISTS registrations_created_at ON registrations (created_at);


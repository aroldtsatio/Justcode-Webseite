export type Registration = {
  name: string;
  email: string;
  major: string;
  semester: string;
  interests: string;
};

export class RegistrationError extends Error {
  constructor(public code: string, public fields: Record<string, string> = {}) {
    super(code);
  }
}

export async function submitRegistration(registration: Registration & { website: string }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration),
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.ok !== true) {
      throw new RegistrationError(payload?.error || 'service_unavailable', payload?.fields || {});
    }
  } catch (error) {
    if (error instanceof RegistrationError) throw error;
    throw new RegistrationError('network_error');
  } finally {
    clearTimeout(timeout);
  }
}


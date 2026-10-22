export class RequestError extends Error {
  constructor(status, code, fields) {
    super(code);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export function validateRegistration(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new RequestError(400, 'invalid_request');
  }
  const fields = {};
  const result = {};
  const limits = { name: 120, email: 254, major: 160, interests: 2000 };
  for (const [key, max] of Object.entries(limits)) {
    if (typeof body[key] !== 'string') {
      fields[key] = 'required';
      continue;
    }
    const value = body[key].trim();
    if (!value || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) {
      fields[key] = 'invalid';
    } else {
      result[key] = value;
    }
  }
  if (result.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) fields.email = 'invalid';
  if (typeof body.semester !== 'string' || !/^(?:[1-9]|[12][0-9]|30)$/.test(body.semester.trim())) fields.semester = 'invalid';
  if (Object.keys(fields).length) throw new RequestError(400, 'validation_failed', fields);
  return { ...result, email: result.email.toLowerCase(), semester: Number(body.semester.trim()) };
}


// Sends an email for every new registration through the Resend HTTP API (https://resend.com).
// Configuration (server-only, never VITE_):
//   RESEND_API_KEY  – API key from resend.com
//   NOTIFY_EMAIL    – recipient(s), comma separated
//   NOTIFY_FROM     – optional sender; defaults to Resend's test sender, which can only
//                     deliver to the email address that owns the Resend account.

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function createEmailNotifier(env = process.env, fetchImpl = globalThis.fetch) {
  const recipients = (env.NOTIFY_EMAIL || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!env.RESEND_API_KEY || recipients.length === 0) return null;

  return async function notify(registration) {
    const { name, email, major, semester, interests } = registration;
    const oneLine = (value) => String(value).replace(/\s+/g, ' ').trim();
    const rows = [
      ['Name', name],
      ['E-Mail', email],
      ['Studiengang', major],
      ['Semester', semester],
      ['Interessen', interests],
    ];
    const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
    const html = `<h2>Neue Anmeldung bei JUSTCODE-KL</h2><table cellpadding="6">${rows
      .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
      .join('')}</table><p>Antworte direkt auf diese E-Mail, um ${escapeHtml(oneLine(name))} zu kontaktieren.</p>`;

    const response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.NOTIFY_FROM || 'JUSTCODE-KL <onboarding@resend.dev>',
        to: recipients,
        reply_to: email,
        subject: `Neue Anmeldung: ${oneLine(name).slice(0, 80)}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Email provider responded ${response.status}`);
  };
}

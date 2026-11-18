// POST /api/enquiry: the site's forms post here (Vercel function), which emails them through Resend.
// Replaced FormSubmit on 18 Nov 2026: FormSubmit had been answering "sent" while delivering
// nothing. Resend records every send and its delivery status, so nothing can go missing unseen.
// Built and looked after by Fika Designs.
//
// Environment (Vercel project settings):
//   RESEND_API_KEY  required. Without it every enquiry fails loudly instead of vanishing.
//   ENQUIRY_TO      optional override for the recipient, for testing on a preview.
//
// The recipient is fixed here, never taken from the page, so nobody can use the form to mail anyone else.

const CONFIG = {
  site: 'Dilham Hall Retreats',
  to: 'hello@dilhamhall.co.uk',
  from: 'Dilham Hall Retreats website <forms@fikadesigns.co.uk>',
  subject: 'New website enquiry - Dilham Hall Retreats',
  thanks: '/thanks',
  publicEmail: 'hello@dilhamhall.co.uk',
  publicPhone: '',
};

const MAX_FIELD = 300;
const MAX_LONG = 5000;
const LONG = /message|brief|details|notes|comments|enquiry/i;

const clip = (v, n) => String(v ?? '').trim().slice(0, n);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const wantsJson = (req) => (req.headers.get('accept') || '').includes('application/json');

function reply(req, status, body) {
  if (wantsJson(req)) return Response.json(body, { status });
  if (body.ok) return Response.redirect(new URL(CONFIG.thanks, req.url), 303);
  return new Response(
    `Sorry, your message did not send. Please email ${CONFIG.publicEmail}${CONFIG.publicPhone ? ` or call ${CONFIG.publicPhone}` : ''}.\n\n(${body.error || 'error'})`,
    { status, headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
}

export async function POST(req) {
  let form;
  try {
    form = await req.formData();
  } catch {
    return reply(req, 400, { ok: false, error: 'unreadable form' });
  }

  // honeypot: only bots fill the hidden field; pretend it worked and send nothing
  if (clip(form.get('_honey'), 200)) return reply(req, 200, { ok: true });

  // every visible field, in the order the form sends them; fields starting "_" are ours
  const rows = [];
  for (const [k, v] of form.entries()) {
    if (k.startsWith('_') || typeof v !== 'string') continue;
    const val = clip(v, LONG.test(k) ? MAX_LONG : MAX_FIELD);
    if (val) rows.push([clip(k, 60), val]);
  }
  const get = (re) => rows.find(([k]) => re.test(k))?.[1] || '';
  const name = get(/^(full )?name$/i);
  const email = get(/^e-?mail/i);
  if (!name || !isEmail(email)) return reply(req, 400, { ok: false, error: 'missing name or email' });

  // spam signs: flagged in the subject, never dropped, so a real enquiry can't vanish
  const t = Number(form.get('_t'));
  const quick = t > 0 && Date.now() - t < 3000;
  const links = (rows.map(([, v]) => v).join(' ').match(/https?:\/\/|www\./gi) || []).length;
  const suspect = quick || links >= 3;

  const page = clip(form.get('_page'), 200);
  console.log('enquiry', JSON.stringify({ site: CONFIG.site, page, suspect, fields: rows }));

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('enquiry not sent: RESEND_API_KEY is not set');
    return reply(req, 500, { ok: false, error: 'mail not configured' });
  }

  const kind = clip(form.get('_subject'), 120) || CONFIG.subject;
  const subject = `${suspect ? '[Possible spam] ' : ''}${kind} · ${name}`;
  if (page) rows.push(['Sent from', page]);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n\n');
  const html = `<table cellpadding="8" style="border-collapse:collapse;font:15px/1.45 -apple-system,Segoe UI,sans-serif">${rows
    .map(([k, v]) => `<tr><th align="left" valign="top" style="color:#555;white-space:nowrap">${esc(k)}</th><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table><p style="color:#888;font:13px sans-serif">Reply to this email to answer ${esc(name)} directly.</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONFIG.from,
        to: [process.env.ENQUIRY_TO || CONFIG.to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.id) {
      console.error('enquiry not sent: Resend said', res.status, JSON.stringify(out));
      return reply(req, 502, { ok: false, error: 'mail service refused' });
    }
    console.log('enquiry sent', out.id);
    return reply(req, 200, { ok: true });
  } catch (err) {
    console.error('enquiry not sent:', err);
    return reply(req, 502, { ok: false, error: 'mail service unreachable' });
  }
}

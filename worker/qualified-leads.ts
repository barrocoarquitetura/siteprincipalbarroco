/** Private feed for Google Ads scheduled HTTPS imports. Never expose raw contact data. */
type Env = { DB: D1Database; LEAD_EXPORT_PASSWORD?: string; LEAD_QUALIFICATION_TOKEN?: string };
type Row = { id: string; email: string; phone: string; gclid: string | null; qualified_at: string };
const headers = { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' };

async function equalSecret(received: string, expected: string) {
  const digest = (value: string) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  const [a, b] = await Promise.all([digest(received), digest(expected)]);
  const aa = new Uint8Array(a), bb = new Uint8Array(b);
  let difference = 0;
  for (let i = 0; i < aa.length; i++) difference |= aa[i] ^ bb[i];
  return difference === 0;
}
export async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}
export function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();
  const [local, domain] = email.split('@');
  return domain === 'gmail.com' || domain === 'googlemail.com' ? `${local.replaceAll('.', '')}@${domain}` : email;
}
export async function conversionCsv(rows: Row[]) {
  const csv = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const lines = ['Parameters:TimeZone=+0000', 'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency,Email,Phone Number,Order ID'];
  for (const row of rows) {
    const date = new Date(row.qualified_at);
    if (!Number.isFinite(date.getTime()) || date.getTime() > Date.now()) throw new Error('Invalid qualification date');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) throw new Error('Invalid email');
    if (!/^\+[1-9]\d{10,14}$/.test(row.phone)) throw new Error('Invalid phone');
    const [email, phone] = await Promise.all([sha256(normalizeEmail(row.email)), sha256(row.phone)]);
    lines.push([row.gclid || '', 'Lead qualificado', date.toISOString().slice(0,19).replace('T',' ') + '+0000', '', '', email, phone, `qualified-${row.id}`].map(csv).join(','));
  }
  return lines.join('\r\n') + '\r\n';
}
export async function handleQualifiedLeads(request: Request, env: Env) {
  const path = new URL(request.url).pathname;
  const exporting = path === '/api/ads/qualified-leads.csv';
  const secret = exporting ? env.LEAD_EXPORT_PASSWORD : env.LEAD_QUALIFICATION_TOKEN;
  if (!secret || secret.length < 32) return Response.json({error:'Integração não configurada.'}, {status:503, headers});
  let supplied = '';
  try {
    const auth = request.headers.get('authorization') || '';
    if (exporting && auth.startsWith('Basic ')) {
      const decoded = atob(auth.slice(6));
      if (decoded.startsWith('googleads:')) supplied = decoded.slice(10);
    } else if (!exporting && auth.startsWith('Bearer ')) supplied = auth.slice(7);
  } catch { /* malformed authentication is rejected */ }
  if (!await equalSecret(supplied, secret)) return new Response('Unauthorized', {status:401, headers:{...headers, 'WWW-Authenticate':'Basic realm="Google Ads import"'}});
  try {
    if (exporting && request.method === 'GET') {
      const result = await env.DB.prepare("SELECT id, email, phone, gclid, qualified_at FROM leads WHERE status = 'qualified' AND qualified_at IS NOT NULL AND consent_at IS NOT NULL AND datetime(qualified_at) >= datetime('now', '-63 days') ORDER BY qualified_at, id LIMIT 10001").all<Row>();
      if (result.results.length > 10000) return Response.json({error:'Exportação excede o limite; configure paginação.'}, {status:503,headers});
      return new Response(await conversionCsv(result.results), {headers:{...headers, 'content-type':'text/csv; charset=utf-8'}});
    }
    if (!exporting && request.method === 'POST') {
      const raw = await request.text();
      if (raw.length > 2048) return new Response(null,{status:413,headers});
      const body = JSON.parse(raw);
      if (body.confirmedQualified !== true || typeof body.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.id) || typeof body.qualifiedAt !== 'string' || !/(Z|[+-]\d{2}:\d{2})$/.test(body.qualifiedAt)) return Response.json({error:'Informe o lead confirmado e a data com fuso horário.'},{status:422,headers});
      const when = new Date(body.qualifiedAt);
      if (!Number.isFinite(when.getTime()) || when.getTime() > Date.now()) return Response.json({error:'Data inválida.'},{status:422,headers});
      const result = await env.DB.prepare("UPDATE leads SET status = 'qualified', qualified_at = COALESCE(qualified_at, ?) WHERE id = ? AND consent_at IS NOT NULL AND datetime(created_at) <= datetime(?) RETURNING id, qualified_at").bind(when.toISOString(),body.id,when.toISOString()).first();
      if (!result) return Response.json({error:'Lead não encontrado ou data anterior ao cadastro.'},{status:422,headers});
      return Response.json({ok:true,lead:result},{headers});
    }
    return new Response(null,{status:405,headers});
  } catch {
    return Response.json({error:'Não foi possível concluir a operação.'},{status:503,headers});
  }
}

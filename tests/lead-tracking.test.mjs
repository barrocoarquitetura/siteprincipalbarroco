import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import { safeContactUrl } from '../app/lib/lead-tracking.js';

const source = (await readFile(new URL('../app/lib/lead-tracking.js', import.meta.url), 'utf8')).replace(/^export /gm, '');
function context(overrides = {}) {
  const storage = new Map();
  const window = { location: new URL('https://www.barrocoarquitetura.com.br/?gclid=click-a&utm_source=google&utm_campaign=apt'),
    localStorage: { getItem: key => storage.get(key), setItem: (key,value) => storage.set(key,value), removeItem: key => storage.delete(key) } };
  const document = { referrer: '', cookie: '_gcl_aw=GCL.123.old-click' };
  const ctx = vm.createContext({ window, document, URL, URLSearchParams, Date, AbortController, setTimeout, clearTimeout, ...overrides });
  vm.runInContext(source,ctx);
  return { ctx, window, document, storage };
}
test('new channel replaces entire touch and keeps first touch separate', () => {
  const {ctx,window,storage} = context();
  assert.equal(ctx.readAttribution().gclid,'click-a');
  window.location = new URL('https://www.barrocoarquitetura.com.br/?utm_source=chatgpt');
  const next = ctx.readAttribution();
  assert.equal(next.gclid,''); assert.equal(next.utmCampaign,''); assert.equal(next.utmSource,'chatgpt');
  const saved = JSON.parse(storage.get('barroco_attribution_v2'));
  assert.equal(saved.firstTouch.gclid,'click-a'); assert.equal(saved.lastTouch.gclid,'');
  window.location = new URL('https://www.barrocoarquitetura.com.br/reformas-residenciais');
  assert.equal(ctx.readAttribution().utmSource,'chatgpt');
});
test('external referral clears old paid identifiers; internal navigation preserves them', () => {
  const {ctx,window,document} = context(); ctx.readAttribution();
  window.location = new URL('https://www.barrocoarquitetura.com.br/projetos');
  document.referrer='https://barrocoarquitetura.com.br/';
  assert.equal(ctx.readAttribution().gclid,'click-a');
  document.referrer='https://chatgpt.com/';
  assert.equal(ctx.readAttribution().gclid,'');
});
test('expired or legacy touches cannot resurrect from an old cookie', () => {
  const {ctx,window,storage} = context();
  const old = {gclid:'old',capturedAt:Date.now()-91*86400000};
  storage.set('barroco_attribution_v2',JSON.stringify({lastTouch:old,firstTouch:old}));
  storage.set('barroco_attribution_v1',JSON.stringify({gclid:'legacy'}));
  window.location=new URL('https://www.barrocoarquitetura.com.br/');
  assert.equal(ctx.readAttribution().gclid,''); assert.equal(storage.has('barroco_attribution_v1'),false);
});
test('contact analytics never includes phone, email or message', () => {
  assert.equal(safeContactUrl('https://api.whatsapp.com/send?phone=5511999999999&text=Nome%20email%40example.com'),'https://api.whatsapp.com/');
  assert.equal(safeContactUrl('https://wa.me/5511999999999?text=secret'),'https://wa.me/');
  assert.equal(safeContactUrl('mailto:a@example.com?body=secret'),'mailto:');
  assert.equal(safeContactUrl('tel:+5511999999999'),'tel:');
});
test('timeout aborts request and retry preserves the submission identifier', async () => {
  let expire, signal; const payloads=[];
  const {ctx}=context({setTimeout: cb => {expire=cb;return 1;},clearTimeout:()=>{},
    fetch: async (_,options) => { signal=options.signal; payloads.push(JSON.parse(options.body)); return new Promise(()=>{}); }});
  const payload={clientSubmissionId:'same-id'};
  const pending=ctx.submitLead('/api/leads',payload); expire();
  await assert.rejects(pending,/demorou/); assert.equal(signal.aborted,true);
  ctx.fetch=async (_,options)=>{payloads.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true,lead:{id:'same-id',reference:'REF'}})};};
  assert.equal((await ctx.submitLead('/api/leads',payload)).lead.id,'same-id');
  assert.equal(payloads[0].clientSubmissionId,payloads[1].clientSubmissionId);
});
test('no success without confirmed persistence; body parsing is also bounded', async () => {
  let expire;
  const {ctx}=context({setTimeout: cb=>{expire=cb;return 1;},clearTimeout:()=>{},fetch:async()=>({ok:true,json:async()=>({ok:true})})});
  await assert.rejects(ctx.submitLead('/api/leads',{}),/registrar/);
  ctx.fetch=async()=>({ok:true,json:()=>new Promise(()=>{})});
  const pending=ctx.submitLead('/api/leads',{}); expire(); await assert.rejects(pending,/demorou/);
});

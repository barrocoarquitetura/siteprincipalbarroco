import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";
import { safeContactUrl } from "../app/lib/lead-tracking.js";

const runtime = await readFile(new URL("../scripts/static-site-runtime.js", import.meta.url), "utf8");
const handler = runtime.slice(runtime.indexOf("  function enableContactAnalytics()"), runtime.indexOf("  function closeMobileMenus()"));

test("direct WhatsApp clicks work without form data and send only the contact conversion", () => {
  for (const href of ["https://wa.me/551127630517", "https://api.whatsapp.com/send?phone=551127630517"]) {
    let onClick;
    const calls = [];
    const events = [];
    vm.runInNewContext(`${handler}\nenableContactAnalytics();`, {
      safeContactUrl,
      document: { addEventListener: (_, listener) => { onClick = listener; } },
      window: { gtag: (...args) => calls.push(args), location: { pathname: "/projetos-de-apartamentos" } },
      whatsappConversionId: "AW-614157022/bWIoCP-morQDEN6V7aQC",
      analyticsMeasurementId: "G-YED0X4J78V",
      pushAnalytics: (...args) => events.push(args),
    });
    assert.doesNotThrow(() => onClick({ target: { closest: () => ({ href }) } }));
    const conversions = calls.filter(([command, event]) => command === "event" && event === "conversion");
    assert.equal(conversions.length, 1);
    assert.equal(conversions[0][2].send_to, "AW-614157022/bWIoCP-morQDEN6V7aQC");
    assert.equal(calls.some(([command]) => command === "set"), false);
    assert.equal(calls.some(([, event]) => event === "lead_form_whatsapp"), false);
    assert.equal(calls.filter(([, event]) => event === "whatsapp_click").length, 1);
    assert.equal(events[0][0], "whatsapp_click");
  }
});

for (const [label, file, receiver] of [
  ['React', '../app/components/LeadForm.tsx', 'analyticsWindow'],
  ['FTP', '../scripts/static-site-runtime.js', 'window'],
]) {
  test(`${label}: enhanced lead data is available when form_submit fires`, async () => {
    const source = await readFile(new URL(file, import.meta.url), 'utf8');
    const start = source.indexOf('const userData = {');
    const end = source.indexOf(`${receiver}.gtag?.("event", "lead_form_whatsapp"`, start);
    assert.ok(start >= 0 && end > start);
    let configured;
    const events = [];
    const receiverMock = { gtag: (command, name, value) => {
      if (command === 'set' && name === 'user_data') configured = value;
      if (command === 'event') events.push({name, value, configured});
    }};
    vm.runInNewContext(source.slice(start, end), {
      [receiver]: receiverMock,
      fields: {email: ' LEAD@EXAMPLE.COM ', phone: '+5511999999999'},
      normalizedPhone: value => value,
      googleAdsId: 'AW-614157022',
    });
    assert.equal(events.length, 1);
    assert.equal(events[0].name, 'form_submit');
    assert.equal(events[0].value.send_to, 'AW-614157022');
    assert.equal(events[0].configured?.email, 'lead@example.com');
    assert.equal(events[0].configured?.phone_number, '+5511999999999');
  });
}

#!/usr/bin/env node
/**
 * Verify Open Graph / Twitter Card metadata for one or more URLs.
 *
 * Simulates what WhatsApp, LinkedIn, Facebook, Twitter/X and Slack
 * crawlers see (they do NOT execute JS — only the static HTML head matters).
 *
 * Usage:
 *   node scripts/verify-og.mjs                       # checks default URLs below
 *   node scripts/verify-og.mjs https://foo.com/bar   # checks a custom URL
 */

const DEFAULT_URLS = [
  "https://algoscentrodolor.com/",
  "https://algoscentrodolor.lovable.app/",
];

// Real user-agent strings used by the major link-preview crawlers.
const CRAWLERS = {
  WhatsApp: "WhatsApp/2.23.20.0 A",
  Facebook: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  LinkedIn: "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)",
  Twitter:  "Twitterbot/1.0",
  Slack:    "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
};

// ---- tiny meta-tag parser (regex; head only, no JS execution) -------------
function parseMeta(html) {
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [html])[0];
  const tags = {};
  const links = {};
  const tagRe = /<meta\s+([^>]+?)\s*\/?>/gi;
  let m;
  while ((m = tagRe.exec(head))) {
    const attrs = {};
    for (const a of m[1].matchAll(/(\w[\w:-]*)\s*=\s*"([^"]*)"/g)) attrs[a[1].toLowerCase()] = a[2];
    const key = attrs.property || attrs.name || attrs.itemprop;
    if (key) tags[key.toLowerCase()] = attrs.content || "";
  }
  for (const l of head.matchAll(/<link\s+([^>]+?)\s*\/?>/gi)) {
    const attrs = {};
    for (const a of l[1].matchAll(/(\w[\w:-]*)\s*=\s*"([^"]*)"/g)) attrs[a[1].toLowerCase()] = a[2];
    if (attrs.rel) links[attrs.rel.toLowerCase()] = attrs.href || "";
  }
  const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].trim();
  return { tags, links, title };
}

// ---- validation rules -----------------------------------------------------
const REQUIRED = [
  { key: "title",                    where: "tag",   label: "<title>" },
  { key: "description",              where: "meta",  label: "meta description" },
  { key: "og:title",                 where: "meta" },
  { key: "og:description",           where: "meta" },
  { key: "og:type",                  where: "meta" },
  { key: "og:url",                   where: "meta" },
  { key: "og:image",                 where: "meta" },
  { key: "twitter:card",             where: "meta" },
  { key: "twitter:title",            where: "meta" },
  { key: "twitter:description",      where: "meta" },
  { key: "twitter:image",            where: "meta" },
];
const RECOMMENDED = [
  "og:site_name", "og:locale",
  "og:image:width", "og:image:height", "og:image:alt",
  "twitter:image:alt",
];

async function fetchAs(url, ua) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": ua, Accept: "text/html,*/*" },
      signal: ctrl.signal,
    });
    const html = await res.text();
    return { ok: res.ok, status: res.status, finalUrl: res.url, html };
  } finally { clearTimeout(t); }
}

async function checkImage(url) {
  if (!url) return { ok: false, reason: "no image" };
  try {
    const r = await fetch(url, { method: "HEAD", redirect: "follow" });
    const len = Number(r.headers.get("content-length") || 0);
    const type = r.headers.get("content-type") || "";
    return {
      ok: r.ok && type.startsWith("image/"),
      status: r.status,
      contentType: type,
      bytes: len,
      tooBig: len > 5 * 1024 * 1024, // FB limit
    };
  } catch (e) { return { ok: false, reason: String(e?.message || e) }; }
}

function dim(s) { return `\x1b[2m${s}\x1b[0m`; }
function red(s) { return `\x1b[31m${s}\x1b[0m`; }
function green(s) { return `\x1b[32m${s}\x1b[0m`; }
function yellow(s) { return `\x1b[33m${s}\x1b[0m`; }
function bold(s) { return `\x1b[1m${s}\x1b[0m`; }

async function verifyUrl(url) {
  console.log("\n" + bold(`━━━ ${url} ━━━`));
  const errors = [], warns = [];

  // 1. Fetch as each crawler — they sometimes get different HTML (CDN, edge rules).
  const results = {};
  for (const [name, ua] of Object.entries(CRAWLERS)) {
    try {
      const r = await fetchAs(url, ua);
      results[name] = r;
      const flag = r.ok ? green("✓") : red("✗");
      console.log(`  ${flag} ${name.padEnd(9)} HTTP ${r.status} ${dim("→ " + r.finalUrl)}`);
    } catch (e) {
      results[name] = { ok: false, error: String(e?.message || e) };
      console.log(`  ${red("✗")} ${name.padEnd(9)} ${red(String(e?.message || e))}`);
      errors.push(`${name}: fetch failed`);
    }
  }

  // 2. Use Facebook's view as the canonical reference (most strict).
  const ref = results.Facebook?.html ? results.Facebook : Object.values(results).find(r => r?.html);
  if (!ref?.html) { errors.push("no HTML to parse"); return { errors, warns }; }
  const { tags, links, title } = parseMeta(ref.html);

  // 3. Required tags present?
  console.log("\n  " + bold("Required tags"));
  for (const r of REQUIRED) {
    const val = r.where === "tag" ? title : tags[r.key];
    if (!val) { errors.push(`missing ${r.label || r.key}`); console.log(`    ${red("✗")} ${(r.label || r.key).padEnd(28)} ${red("missing")}`); }
    else      { console.log(`    ${green("✓")} ${(r.label || r.key).padEnd(28)} ${dim(val.length > 80 ? val.slice(0, 77) + "…" : val)}`); }
  }

  // 4. Recommended tags
  console.log("\n  " + bold("Recommended tags"));
  for (const k of RECOMMENDED) {
    if (tags[k]) console.log(`    ${green("✓")} ${k.padEnd(28)} ${dim(tags[k])}`);
    else { warns.push(`missing recommended ${k}`); console.log(`    ${yellow("⚠")} ${k.padEnd(28)} ${yellow("missing")}`); }
  }

  // 5. Consistency checks
  console.log("\n  " + bold("Consistency"));
  const checks = [
    ["og:url matches page",  tags["og:url"] && (tags["og:url"] === ref.finalUrl || tags["og:url"] === ref.finalUrl.replace(/\/$/, "") || tags["og:url"].replace(/\/$/, "") === ref.finalUrl.replace(/\/$/, ""))],
    ["canonical present",    !!links.canonical],
    ["canonical = og:url",   links.canonical && tags["og:url"] && links.canonical.replace(/\/$/, "") === tags["og:url"].replace(/\/$/, "")],
    ["twitter:card = summary_large_image", tags["twitter:card"] === "summary_large_image"],
    ["og:title length ≤ 70", tags["og:title"] && tags["og:title"].length <= 70],
    ["og:description 50–200 chars", tags["og:description"] && tags["og:description"].length >= 50 && tags["og:description"].length <= 200],
  ];
  for (const [label, ok] of checks) {
    if (ok) console.log(`    ${green("✓")} ${label}`);
    else { warns.push(label + " failed"); console.log(`    ${yellow("⚠")} ${label}`); }
  }

  // 6. Image reachability + size
  console.log("\n  " + bold("og:image fetch"));
  const img = await checkImage(tags["og:image"]);
  if (img.ok) {
    const kb = (img.bytes / 1024).toFixed(0);
    console.log(`    ${green("✓")} ${tags["og:image"]}`);
    console.log(`      ${dim(`${img.contentType} · ${kb} KB`)}`);
    if (img.tooBig) { warns.push("og:image > 5 MB (Facebook will drop it)"); console.log(`      ${yellow("⚠ over Facebook's 5 MB limit")}`); }
  } else {
    errors.push(`og:image unreachable: ${tags["og:image"] || "(none)"}`);
    console.log(`    ${red("✗")} ${tags["og:image"] || "(none)"} — ${img.reason || img.status}`);
  }

  // 7. Per-platform preview simulation
  console.log("\n  " + bold("Preview as it will render"));
  const renderTitle = tags["og:title"] || title;
  const renderDesc  = tags["og:description"] || tags["description"] || "";
  const renderImg   = tags["og:image"] || "(none)";
  for (const platform of ["WhatsApp", "LinkedIn", "Facebook", "Twitter"]) {
    console.log(`\n    ${dim("┌─ " + platform + " ────────────────────────────")}`);
    console.log(`    ${dim("│")} ${bold(renderTitle)}`);
    console.log(`    ${dim("│")} ${renderDesc.slice(0, 160)}${renderDesc.length > 160 ? "…" : ""}`);
    console.log(`    ${dim("│")} ${dim(renderImg)}`);
    console.log(`    ${dim("└" + "─".repeat(40))}`);
  }

  return { errors, warns };
}

const urls = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_URLS;
let totalErr = 0, totalWarn = 0;
for (const u of urls) {
  const { errors, warns } = await verifyUrl(u);
  totalErr += errors.length; totalWarn += warns.length;
}
console.log("\n" + bold(`Summary: ${totalErr === 0 ? green(totalErr + " errors") : red(totalErr + " errors")}, ${totalWarn === 0 ? green(totalWarn + " warnings") : yellow(totalWarn + " warnings")}`));
console.log(dim("Force-refresh in: developers.facebook.com/tools/debug · linkedin.com/post-inspector · cards-dev.twitter.com/validator"));
process.exit(totalErr > 0 ? 1 : 0);

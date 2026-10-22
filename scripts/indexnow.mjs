// Tells Bing (and Yandex, Seznam, Naver via IndexNow) that pages on www.elegix.net changed, so they recrawl
// in minutes instead of days. Run after a production deploy: npm run indexnow
// With no arguments it submits every URL in the live sitemap; or pass paths: npm run indexnow -- /about /careers
// The key proves we own the site: IndexNow fetches it from https://www.elegix.net/59d9d89b46d18e22bbfbbdf2b584731c.txt (public/).
const SITE = "https://www.elegix.net";
const KEY = "59d9d89b46d18e22bbfbbdf2b584731c";

const paths = process.argv.slice(2);
let urls = paths.map((p) => new URL(p, SITE).href);
if (!urls.length) {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
for (const u of urls) console.log("  " + u);
if (res.status >= 400) { console.log(await res.text()); process.exit(1); }

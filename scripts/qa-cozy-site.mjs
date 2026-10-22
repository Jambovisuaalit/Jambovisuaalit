#!/usr/bin/env node
/**
 * Cozy Studio Punavuori: production smoke test (Node 20+, no dependencies).
 * Checks URLs, language, metadata, booking destinations, gallery terminology,
 * image loading and canonical redirects. Browser/mobile visual QA is separate.
 *
 * Usage:
 *   node scripts/qa-cozy-site.mjs
 *   BASE_URL=https://preview.example.vercel.app node scripts/qa-cozy-site.mjs
 */
import assert from 'node:assert/strict';

const base = (process.env.BASE_URL || 'https://www.cozy-studio-punavuori.fi').replace(/\/$/, '');
const isProduction = base === 'https://www.cozy-studio-punavuori.fi';
const expectedAirbnb = 'https://www.airbnb.fi/rooms/1386922799666367407';
const expectedBooking = 'https://www.booking.com/hotel/fi/cozy-studio-in-punavuori-helsinki1.fi.html';
const pages = [
  ['/', 'fi'],
  ['/en/', 'en'],
  ['/book/', 'fi'],
  ['/en/book/', 'en'],
];
let failures = 0;
async function test(label, action) {
  try { await action(); console.log('PASS', label); }
  catch (error) { failures++; console.error('FAIL', label, '-', error.message); }
}
async function get(path, redirect = 'follow') {
  const response = await fetch(base + path, { redirect, signal: AbortSignal.timeout(12000) });
  assert.equal(response.status, 200, base + path + ': HTTP ' + response.status);
  return { response, body: await response.text() };
}
for (const [path, language] of pages) {
  await test(path + ' response and language', async () => {
    const { body } = await get(path);
    assert.match(body, new RegExp('<html[^>]*lang="' + language + '"'));
    assert.match(body, /<title>[^<]+<\/title>/);
    assert.ok(!/name="robots"[^>]*content="[^"]*noindex/i.test(body), 'Unexpected noindex');
    assert.ok(body.includes(expectedAirbnb), 'Airbnb destination missing');
    assert.ok(body.includes(expectedBooking), 'Booking destination missing');
    if (isProduction) assert.ok(body.includes('href="' + base + path + '"'), 'Canonical URL missing');
    if (path === '/') {
      assert.ok(body.includes('Interaktiivinen kuvagalleria'), 'Finnish gallery label missing');
      assert.ok(body.includes('interaktiivisessa kuvagalleriassa'), 'Finnish aria label missing');
    }
    if (path === '/en/') {
      assert.ok(body.includes('Interactive photo gallery'), 'English gallery label missing');
      assert.ok(body.includes('an interactive photo gallery'), 'English aria label missing');
    }
    assert.ok(!body.includes('3D-kuvakierros') && !body.includes('3D photo tour'), 'Misleading label');
  });
}
for (let i = 1; i <= 7; i++) {
  const names = ['01_living-room.jpg','02_sleeping-alcove.jpg','03_kitchen.jpg',
    '04_bathroom.jpg','05_dining.jpg','06_living-room-alt.jpg','07_sofa-bed.jpg'];
  const name = names[i-1];
  await test('image ' + name, async () => {
    const response = await fetch(base + '/images/' + name, { signal: AbortSignal.timeout(12000) });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') || '', /image\//);
  });
}
await test('robots and sitemap', async () => {
  const robots = (await get('/robots.txt')).body;
  const map = (await get('/sitemap.xml')).body;
  assert.match(robots, /Allow:\s*\//);
  assert.ok(!/Disallow:\s*\//.test(robots), 'Indexing prohibited');
  assert.match(map, /<urlset/);
});
if (isProduction) {
  await test('apex -> www permanent redirect', async () => {
    const response = await fetch('https://cozy-studio-punavuori.fi/', {
      redirect: 'manual', signal: AbortSignal.timeout(12000)
    });
    assert.ok([301, 308].includes(response.status), 'Expected permanent redirect');
    assert.equal(new URL(response.headers.get('location')).hostname, 'www.cozy-studio-punavuori.fi');
  });
}
console.log('\nSmoke QA:', failures === 0 ? 'PASS' : 'FAIL', failures + ' failing checks');
if (failures) process.exitCode = 1;

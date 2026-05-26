async function removeAds(page) {
  await page.addStyleTag({
    content: `#fixedban, footer, #adplus-anchor, iframe[id^="google_ads"] { display: none !important; }`,
  });
}

function uniqueEmail(prefix = 'test') {
  const stamp = Date.now().toString(36);
  return `${prefix}.${stamp}@example.com`;
}

function randomDigits(length) {
  let s = '';
  for (let i = 0; i < length; i++) s += Math.floor(Math.random() * 10);
  return s;
}

function pixelBuffer() {
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII=',
    'base64',
  );
}

module.exports = { removeAds, uniqueEmail, randomDigits, pixelBuffer };

import puppeteer from 'puppeteer-core'

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true },
})
const page = await browser.newPage()
await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 30000 })
await new Promise((r) => setTimeout(r, 2500))

// scroll through so lazy content mounts
const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 500) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 80))
}
await new Promise((r) => setTimeout(r, 1500))

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth
  const offenders = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0) continue
    // does an ancestor clip horizontal overflow?
    let clipped = false
    let p = el.parentElement
    while (p && p !== document.body) {
      const o = getComputedStyle(p)
      if (['hidden', 'clip'].includes(o.overflowX)) {
        clipped = true
        break
      }
      p = p.parentElement
    }
    if (!clipped && (r.right > vw + 2 || r.left < -2)) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className.baseVal ?? el.className).toString().slice(0, 90),
        text: (el.textContent || '').trim().slice(0, 32),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
      })
    }
  }
  return {
    viewport: vw,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: offenders.slice(0, 25),
  }
})
console.log(JSON.stringify(report, null, 2))
await browser.close()

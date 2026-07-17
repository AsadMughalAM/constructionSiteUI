import puppeteer from 'puppeteer-core'

const SHOT_DIR = 'C:/Users/AsadM/AppData/Local/Temp/claude/c--Users-AsadM-Desktop-DesignUI/5fd0f905-b33e-48d6-95a9-d5bee3f26d28/scratchpad'

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  defaultViewport: { width: 1440, height: 900 },
})

const page = await browser.newPage()
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('meridian-theme', 'light')
})
await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 30000 })
await new Promise((r) => setTimeout(r, 3000))

await page.screenshot({ path: SHOT_DIR + '/light-hero.png' })

for (let i = 0; i < 30; i++) {
  await page.mouse.wheel({ deltaY: 500 })
  await new Promise((r) => setTimeout(r, 120))
}
await new Promise((r) => setTimeout(r, 1200))

const report = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('#projects img')]
  return imgs.map((img) => ({
    src: img.currentSrc.split('/').pop(),
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    visibleX: Math.round(img.getBoundingClientRect().x),
  }))
})
console.log(JSON.stringify(report))

await page.screenshot({ path: SHOT_DIR + '/light-projects.png' })
await browser.close()

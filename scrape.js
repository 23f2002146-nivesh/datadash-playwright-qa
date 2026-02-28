const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const base = "https://sanand0.github.io/tdsdata/crawl_html/";

  let total = 0;

  await page.goto(base);

  // Get all folder links
  const folders = await page.$$eval("a", links =>
    links.map(a => a.href).filter(href => href.endsWith("/"))
  );

  for (const folder of folders) {
    await page.goto(folder);

    const files = await page.$$eval("a", links =>
      links.map(a => a.textContent.trim())
    );

    for (const file of files) {
      if (file.endsWith(".html")) {
        const first = file[0].toUpperCase();
        if (first >= "B" && first <= "V") {
          total++;
        }
      }
    }
  }

  console.log("TOTAL_FILES=" + total);

  await browser.close();
})();

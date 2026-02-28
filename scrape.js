const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [44,45,46,47,48,49,50,51,52,53];
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for table to render (important - JS generated)
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL_TOTAL_SUM=" + totalSum);

  await browser.close();
})();

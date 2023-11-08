import { test, expect } from "@playwright/test";

test("market banner menu items has EUR,ASIA,ASIA FX,PRE-MKT,BONDS,OIL,GOLD,CRYPTO,US,EUR FX", async ({
  page,
}) => {
  await page.goto("https://www.cnbc.com/");

  let items = page.locator("css=button.MarketsBannerMenu-marketOption");

  await expect(items).toHaveCount(10);
  await expect(items).toHaveText([
    "EUR",
    "ASIA",
    "ASIA FX",
    "PRE-MKT",
    "BONDS",
    "OIL",
    "GOLD",
    "CRYPTO",
    "US",
    "EUR FX",
  ]);
});

test('clicking market banner menu item "ASIA FX" should show market card symbol "USD/JPY"', async ({
  page,
}) => {
  await page.goto("https://www.cnbc.com/");

  let item = page
    .locator("css=button.MarketsBannerMenu-marketOption")
    .and(page.getByText("ASIA FX"));

  await expect(item).toHaveCount(1);

  await item.click();

  let symbol = page.locator("css=span.MarketCard-symbol");

  await expect(symbol).toHaveCount(5);
  await expect(symbol).toContainText(["USD/JPY"]);
});

test('searching for stock "IBM"', async ({ page }) => {
  await page.goto("https://www.cnbc.com/");
  
  await page.locator("css=button.SearchToggle-button").click();
  await page.locator("xpath=//form[@id='SearchEntry-searchForm']/input[@type='search']").fill('IBM');
  let symbolResultItems = page.locator('css=span.SymbolResultItem-symbol');

  await expect(symbolResultItems).toHaveCount(5);
  await expect(symbolResultItems).toContainText(['IBM']);

  await symbolResultItems.first().click();
  await expect(page.locator("css=span.QuoteStrip-name")).toHaveText("International Business Machines Corp");
  await expect(page.locator("css=span.QuoteStrip-symbolAndExchange")).toHaveText("IBM:NYSE");
});

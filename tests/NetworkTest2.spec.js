const { test, expect } = require("@playwright/test");

test('Security Test Request intercept', async ({ page }) => {
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    const email = "golap.hossain88151@gmail.com";
    const products = page.locator(".card-body");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Golap123#");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    //intercepting network request call
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67258030ae2afd4c0bafd12b' })
    )
    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator(".blink_me")).toHaveText('You are not authorize to view this order')
});
const { test } = require("@playwright/test");

test('Assignment 1',async ({page})=>{
    // await page.waitForURL('https://www.rahulshettyacademy.com/client', { timeout: 10000 });
    await page.goto("http://www.rahulshettyacademy.com/client")
    const userEmail = page.locator('#userEmail')
    const password = page.locator("[type='password']")
    const loginIn = page.locator('#login')
    const cardTitles = await page.locator('.card-body b')
    // await userEmail.fill("anshika@gmail.com")
    await userEmail.fill("rahulshetty@gmail.com")
    await password.fill("Iamking@000")
    await loginIn.click()
    // await page.waitForLoadState("networkidle")
    await cardTitles.first().waitFor()
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
})
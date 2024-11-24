const {test, expect} = require('@playwright/test')
test.describe.configure({mode:"serial"})
test('Screenshot taking',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'})
    await page.locator("#hide-textbox").click()
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden()
})
test('visual comparison',async({page})=>{
    await page.goto("https://www.google.com/");
    await expect(await page.screenshot()).toMatchSnapshot('landing.png')
})
test("PopUP validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    // page.on('dialog', async dialog => {
    //     expect(dialog.type()).toContain('confirm')
    //     expect(dialog.message()).toContain('Hello , Are you sure you want to confirm?')
    //     await dialog.accept(); // close by using OK button
    //     // await dialog.dismiss(); // close by using cancel
    // })
    page.on("dialog",dialog=>dialog.accept())
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover()
    const framPage = page.frameLocator("#courses-iframe")
    await framPage.locator("li a[href$='lifetime-access']:visible").click()
    const totalSubscrib = await framPage.locator(".text h2").textContent()
    console.log(totalSubscrib.split(" ")[1])
})
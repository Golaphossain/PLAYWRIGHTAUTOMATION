const { After, Before } = require('@cucumber/cucumber')
const { PageObjectManager } = require('../../pages/PageObjectManager');
const { playwright } = require('@playwright/test');
const { chromium } = require('playwright');
const { AfterStep, BeforeStep, Status } = require('@cucumber/cucumber');

Before({tags: "@foo"},async function () {
    const browser = await chromium.launch({
        headless: false
    })
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new PageObjectManager(this.page)
})
After(function () {
    console.log("I am last executed")
})
BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});
AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' })
    }
});
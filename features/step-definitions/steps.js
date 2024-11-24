const { When, Then, Given } = require('@cucumber/cucumber')
const { PageObjectManager } = require('../../pages/PageObjectManager');
const { expect } = require('@playwright/test');
const { playwright } = require('@playwright/test');
const { chromium } = require('playwright');

Given('Login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await chromium.launch({
        headless: false
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    this.poManager = new PageObjectManager(page)
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});
When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});
Then('Verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});
When('Enter valid details and Place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});
Then('Verify order is present in orderHistory page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
Given('Login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator('#username')
    const passWord = this.page.locator("[type='password']")
    const signIn = this.page.locator('#signInBtn')
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await userName.fill(username)
    await passWord.fill(password)
    await signIn.click()
    
});
Then('Verify Error Message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    const errorMsg = this.page.locator("[style*='block']")
    const msg = await errorMsg.textContent()
    console.log(msg)
    await expect(errorMsg).toContainText('Incorrect ')
});

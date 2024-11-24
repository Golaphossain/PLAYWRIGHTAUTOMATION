const { expect } = require('@playwright/test');
const { PageObjectManager } = require('../pages/PageObjectManager');
const { customTest } = require('../utils/test-base');

customTest('Client App login for test fixure', async ({ page,testData }) => {
      const poManager = new PageObjectManager(page)
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(testData.username, testData.password);
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(testData.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(testData.productName);
      await cartPage.Checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect("ind", "India");
      const orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);

      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})
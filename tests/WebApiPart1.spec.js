const { test, expect, request } = require('@playwright/test')
const { ApiUtils } = require('../utils/ApiUtils')
let response
const loginPayload = { 
   userEmail: "golap.hossain88151@gmail.com",
   userPassword: "Golap123#",
}
const orderPayload = {
   orders:[{
      country:"India",
      productOrderedId:"6581ca399fd99c85e8ee7f45"
   }]
}
test.beforeAll( async()=> {
   const apiContext = await request.newContext()
   const apiUtils = new ApiUtils(apiContext,loginPayload)
   response = await apiUtils.createOrder(orderPayload)
})

test('@Api Place The Order', async ({ page }) => {
   page.addInitScript(value =>{
      window.localStorage.setItem('token',value)
   },response.token)
   await page.goto("https://rahulshettyacademy.com/client/");
   await page.locator("button[routerlink*='myorders']").click()
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent()
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click()
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent()
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
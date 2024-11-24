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
const fakePayLoadOrders = {
   data:[],
   message:"No Orders"}
test.beforeAll( async()=> {
   const apiContext = await request.newContext()
   const apiUtils = new ApiUtils(apiContext,loginPayload)
   response = await apiUtils.createOrder(orderPayload)
})

test('Place The Order', async ({ page }) => {
   page.addInitScript(value =>{
      window.localStorage.setItem('token',value)
   },response.token)
   await page.goto("https://rahulshettyacademy.com/client/")
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async route=>{
         const response = await page.request.fetch(route.request())
         let body = JSON.stringify(fakePayLoadOrders)
         route.fulfill({
            response,
            body,
         })
         // intercepting response:- Api response->{Playwright fakeresponse}->browser->render data on UI
      }
   )
   await page.locator("button[routerlink*='myorders']").click()
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
   console.log(await page.locator(".mt-4").textContent())
});
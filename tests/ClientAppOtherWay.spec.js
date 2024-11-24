const { test, expect } = require('@playwright/test');
 
test('Web Client App', async ({ page }) => {
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole("button",{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   await page.locator(".card-body").filter({hasText:productName}).getByRole("button",{name:"Add to Cart"}).click()
   await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click()
   await page.locator("div li").first().waitFor()
   await expect(page.getByText(productName)).toBeVisible()
   await page.getByRole("button",{name:"checkout"}).click()
   await page.getByPlaceholder("Select Country").pressSequentially("ind")
   await page.getByRole("button",{name:"India"}).nth(1).click()
   await expect(page.locator(".user__name [type$='text']").first()).toHaveText(email)
   await page.getByText("PLACE ORDER").click()
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   //assignment 3
   const orderIDwithspace = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
   const orderID = orderIDwithspace.split(" ")[2]
   // console.log(orderID)
   await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click()
   await page.locator("tbody").waitFor()
   await page.getByRole('row', { name: orderID }).getByRole('button').first().click();
   const orderDetails = await page.locator(".col-text").textContent()
   expect(orderID.includes(orderDetails)).toBeTruthy()
})
const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');



test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
   const email = "testaccount2@mailinator.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Testaccount@123");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("button[type='button']").nth(1).click();
   await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropDown = await page.locator(".ta-results");
   await dropDown.waitFor();
   const optionsCount = await dropDown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i)
   {
     const text = await dropDown.locator("button").nth(i).textContent();
     if(text === " India"){
      await dropDown.locator("button").nth(i).click();
      break;
     }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = page.locator("tbody tr");

   for (let i=0; i < await rows.count(); ++i){
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)){
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   const orderIDDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIDDetails)).toBeTruthy();
   // await page.pause();

});
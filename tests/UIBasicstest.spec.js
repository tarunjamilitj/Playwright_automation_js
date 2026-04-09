const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Browser Context Playwright test', async ({browser})=>
{
    // chrome - plugins/ cookies
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator('#username');
        const passWord = page.locator("[type='password']");
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await userName.fill("rahulshetty");
        await passWord.fill("learning");
        await signIn.click();   
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.'); 
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await passWord.fill("");
        await passWord.fill("Learning@830$3mK2");
        await signIn.click();
        // console.log(await cardTitles.first().textContent()); 
        // console.log(await cardTitles.nth(1).textContent()); 
        // await page.waitForLoadState("networkidle");
        await page.locator(".card-body a").first().waitFor();
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles); 
});

test('UI Controls', async ({page})=>
{   
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('#username');
        const passWord = page.locator("[type='password']");
        const signIn = page.locator("#signInBtn");
        const dropDown = page.locator("select.form-control");
        const documentLink = page.locator("[href*='documents-request']");
        await dropDown.selectOption("Consultant");
        await page.locator(".radiotextsty").nth(1).click();
        await page.locator("#okayBtn").click();
        await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
        console.log(await page.locator(".radiotextsty").nth(1).isChecked());
        // await page.pause();
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        await expect(documentLink).toHaveAttribute("class","blinkingText");


});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());
 
 })
import { test, expect } from '../../helper/init-page';
import * as accessibility from '../../helper/accessibility';
import * as visualTest from '../../helper/global-helper';

test.describe('Landing page tests', () => {
  test('Elements are present in the landing page', { tag:'@smoke_test' }, async ({ landingPage, page }) => {
    //Validate the main elements of the landing page are present
    // - Logo - Carousel - Categories - Footer - Contact us
    expect(await landingPage.checkMainLandindElements()).toBeTruthy();
    //visual validation - first run generate a fail result, generate the image base
    //second run shoud pass the case
    //await visualTest.compareScreen(page,'strict','landingPage');
  });

  test.skip('Check webpage accessibility WCAG2.1',async ({ landingPage, page }) => {
      await accessibility.runAxeScan(page);
  });

  test('Carousel interaction',{ tag:'@smoke_test' }, async ({ landingPage }) => {
    await landingPage.clkArrowCarousel('left');
    await landingPage.clkArrowCarousel('right');
    await landingPage.clkArrowCarousel('up');
  });

  test('Categry selection',{ tag:'@smoke_test' }, async ({ landingPage }) => {
    await landingPage.clkCategory('Laptops');
    await landingPage.clkCategory('Phones');
    await landingPage.clkCategory('Monitors');
    await landingPage.clkCategory('XvlUE');
  });

  test('Add product to the card',{ tag: '@smoke_test'}, async({landingPage})=>{
    await landingPage.addProductCart();
  });

  test('Log-in - Log out navigation bar',{ tag: '@smoke_test'}, async({landingPage, testData})=>{
    await landingPage.clickLogInMenu();
    await landingPage.addUserCredentials(testData.user.name, testData.user.password);
    await landingPage.validateUserLoggedIn(testData.user.name);
    await landingPage.logOutUser();
  });

  test('Sign up navigation bar', async({landingPage, page, testData})=>{
    await landingPage.clickSignInMenu();
    await page.locator('#sign-username').fill(testData.user.email);
    await page.locator('#sign-password').fill(testData.user.password);
    await page.getByRole('button',{name: 'Sign up'}).click();
  })
});
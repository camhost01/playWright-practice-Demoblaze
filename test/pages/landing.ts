import { Page, Locator, expect } from '@playwright/test';
import { Carousel } from '../components/carousel';
import { NavigationBar } from '../components/navbar';
import {waitPageStability} from '../../helper/global-helper';
/**
 * Page Object Model 
 */
export class LandingPage {

  readonly carousel: Carousel;
  readonly navigationBar: NavigationBar;
  private readonly logo: Locator;
  private readonly categoriesContainer: Locator
  private readonly phoneCategory: Locator;
  private readonly laptopCategory: Locator;
  private readonly monitorsCategory: Locator;
  private readonly categoryResults: Locator;
  private readonly categoryResltContainer: Locator;
  private readonly addToCartBtn: Locator;
  private readonly productCardAlert: Locator;
  private readonly productCardName: Locator;
  private readonly productCardValue: Locator;
  private readonly logUserName: Locator;
  private readonly logUserPassword: Locator;
  private readonly logCancelBtn: Locator;
  private readonly logInBtn: Locator;
  private readonly signUserName: Locator;
  private readonly signUserPassword: Locator;
  private readonly signInBtn: Locator;

  constructor(private page: Page) {
    this.carousel = new Carousel(page);
    this.navigationBar = new NavigationBar(page);
    this.logo = page.locator('#nava');
    // CATEGORIES
    this.categoriesContainer = page.locator('.list-group');
    this.phoneCategory = page.getByText('Phones');   //page.locator('#itemc,oneclick',{ hasText : 'Phones' });
    this.laptopCategory = page.getByText('Laptops');
    this.monitorsCategory = page.getByText('Monitors');
    this.categoryResltContainer = page.locator('#tbodyid');
    this.categoryResults = page.locator('.col-lg-4.col-md-6.mb-4').filter({visible: true});
    this.addToCartBtn = page.getByText('Add to cart');
    this.productCardName = page.getByRole('heading', {level: 2});
    this.productCardValue = page.getByRole('heading', {level: 3});
    this.productCardAlert = page.getByRole('alert');
    this.logUserName = page.locator('#loginusername');
    this.logUserPassword = page.locator('#loginpassword');
    // LOGIN - SIGN IN
    this.logInBtn = page.getByRole('button',{name: 'Log in'});
    this.logCancelBtn = page.getByLabel('Log in').getByText('Close');
    this.signUserName = page.locator('#sign-username');
    this.signUserPassword = page.locator('#sign-password');
    this.signInBtn = page.getByRole('button',{name: 'Sign up'});
  };

  /**
   * Navigate to landing page
   */
  async goto() {
    await this.page.goto('/');
  };

  /**
   * Click on carousel arrow
   */
  async clkArrowCarousel(direction: string){
    switch(direction){
      case'left':
        await this.carousel.clkLeftArrow();
      break;
      case 'right':
        await this.carousel.clkRightArrow();
      break;
      default:
        console.log(`direction ${direction} not available`);
      break;
    }
  };

  /**
   * Click on Category
   */
  async clkCategory(type: string) {
    switch(type)
    {
      case'Phones':
        await this.phoneCategory.click();
        this.categoryResults;
        await expect(this.categoryResults).toHaveCount(7);    
      break; 
      case'Laptops':
        await this.laptopCategory.click();
        this.categoryResults;
        await expect(this.categoryResults).toHaveCount(6); 
      break;
      case'Monitors':
        await this.monitorsCategory.click();
        this.categoryResults;
        await expect(this.categoryResults).toHaveCount(2); 
      break;
      default:
        console.log(`The value ${type} is not valid`);
      break;
    }
  };

  /**
   * Wait main elements of homePage
   */
  async checkMainLandindElements(){
    await expect(this.logo).toBeVisible();
    await expect(this.categoriesContainer).toBeVisible();
    await this.carousel.carouselIsPresent();
    await expect(this.categoryResltContainer).toBeVisible();
    await this.navigationBar.navBarIsPresent();
    return true;
  };
  
  /**
   * Add product from the page, the function validate if the value
   * selected is equal between the landing page and product page detail
   */
  async addProductCart(){
    await this.clkCategory('Phones');
    const name1 = await this.categoryResults.nth(1).getByRole('heading', {level: 4}).textContent();
    const value1 = await this.categoryResults.nth(1).getByRole('heading', {level: 5}).textContent();
    await this.categoryResults.nth(1).click();
    const value2 = await this.productCardValue.textContent();
    // The expression /\s*\*.*$/ search: space, asterisk and everthing until the end
    const cleanValue2 = value2?.replace(/\s*\*.*$/, '');
    const name2 = await this.productCardName.textContent();
    expect(name1).toEqual(name2);
    expect(value1).toEqual(cleanValue2);
    await expect(this.addToCartBtn).toBeVisible();
    await this.addToCartBtn.click();
    await this.productCardAlert.isVisible();
  };

  /**
   * Click on Cart from menu on the navigation bar
   */
  async clickCartMenu(){
    await this.navigationBar.clickCart();
    expect(this.page.url().toString()).toContain('cart.html');
    await waitPageStability(this.page);
  };

  /**
   * Click on Log In from menu on the navigation bar
   */
  async clickLogInMenu(){
    await this.navigationBar.clickLogin();
  }; 

  /**
   * Click on Sign In from menu on the navigation bar
   */
  async clickSignInMenu(){
    await this.navigationBar.clickSignIn();
  }; 

  async addUserCredentials(email: string, password: string){
    await this.logUserName.fill(email);
    await this.logUserPassword.fill(password);
    await this.logInBtn.click();
  };

  async validateUserLoggedIn(username: string){
    await expect(this.logCancelBtn).toBeVisible();
    await this.logCancelBtn.click();
    await this.navigationBar.validateUserIsLogged(username);
  };

  async logOutUser(){
    await this.navigationBar.clickLogOutUser();
  };
};


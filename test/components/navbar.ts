import { Page, Locator, expect } from '@playwright/test';   
import { waitPageStability } from '../../helper/global-helper';

export class NavigationBar{
    private readonly navBar: Locator;
    private readonly cartBtn: Locator;
    private readonly loginLink: Locator;
    private readonly signUpLink: Locator;

    constructor(private page: Page){
        this.navBar = page.locator('#navbarExample');
        this.loginLink = page.getByRole('link', { name: 'Log in', exact: true })
        this.signUpLink = page.getByRole('link', { name: 'Sign up', exact: true })
        this.cartBtn = page.getByRole('link', { name: 'Cart', exact: true });
    };

    async navBarIsPresent(){
        await expect(this.navBar).toBeVisible();
        await expect(this.loginLink).toBeVisible();
        await expect(this.signUpLink).toBeVisible();
    };

    async clickCart(){
        await expect(this.cartBtn).toBeVisible();
        await waitPageStability(this.page);
        await this.cartBtn.click();
    }

    async clickLogin(){
        await expect(this.loginLink).toBeVisible();
        await this.loginLink.click();
    }

    async clickSignIn(){
        await expect(this.signUpLink).toBeVisible();
        await this.signUpLink.click();
    }
};
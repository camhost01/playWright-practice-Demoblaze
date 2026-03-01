import { expect, Page } from '@playwright/test';

/**
 * Visual testing comparing a base image against a new version of the same image
 * The home base image is taken and when a new feature or something changes
 * use to compare if the change does not inject any issue
 * @param mode - strict: rule maxDiffPixelRatio: 0.01 - maxDiffPixels: 200 or partial maxDiffPixelRatio: 0.05 - maxDiffPixels: 700
 * @param name - name of the image base
 * @example
 * await compareScreen(page,'strict','landingPage');
 * */
export async function compareScreen(page: Page, mode: string, name: string = 'default') {
    switch (mode) {
        case 'strict':
            await expect(page).toHaveScreenshot(`${name}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.01,
                maxDiffPixels: 200,
                animations: 'disabled',
            });
            break;
        case 'partial':
            await expect(page).toHaveScreenshot(`${name}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.05,
                maxDiffPixels: 700,
                animations: 'disabled',
            });
            break;
        default:
            console.log('mode not valid');
            break;
    }
};
/**
 * @param page - Page object from Playwright
 * Waits for the page to be stable by checking for network idle, DOM content loaded, and font readiness.
 * @example
 * await waitPageStability(page);
 * */
export async function waitPageStability(page: Page) {
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);
};
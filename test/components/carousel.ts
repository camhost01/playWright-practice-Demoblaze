import { Page, Locator, expect } from '@playwright/test';

const expectedImages = {
    "0": "Samsung1.jpg",
    "1": "nexus1.jpg",
    "2": "iphone1.jpg"
};
export class Carousel {
    private readonly activeSlide: Locator;
    private readonly currentImage: Locator;
    private readonly rightArrow: Locator;
    private readonly leftArrow: Locator;

    constructor(private page: Page) {
        this.activeSlide = page.locator('[data-target="#carouselExampleIndicators"][class="active"]');
        this.currentImage = page.locator('div.carousel-item.active img');
        this.rightArrow = page.locator('[data-slide="next"]');
        this.leftArrow = page.locator('[data-slide="prev"]');  
    }
    /**
     * Click on carousel arrow
     */
    async clkRightArrow() {
        await this.carousleCurrentImage();
        await this.rightArrow.click();
        await this.carousleCurrentImage();
    };

    async clkLeftArrow() {
        await this.carousleCurrentImage();
        await this.leftArrow.click();
        await this.carousleCurrentImage();
    };
    /**
     * Evaluate carousel position
     */
    async carousleCurrentImage() {
        await this.page.waitForTimeout(800);
        const slideIndex = await this.activeSlide.getAttribute('data-slide-to');
        const activeImage = await this.currentImage.getAttribute('src');
        if (slideIndex === null) {
            throw new Error('The atribute data-slide-to was not found active');
        }
        expect(activeImage).toContain(expectedImages[slideIndex as keyof typeof expectedImages]);
    };

    async carouselIsPresent(){
        await expect(this.currentImage).toBeVisible();
        await expect(this.rightArrow).toBeVisible();
        await expect(this.leftArrow).toBeVisible();
    };
}
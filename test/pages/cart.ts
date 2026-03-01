import { Page, Locator, expect } from '@playwright/test';

export class CartItem{

    private readonly item: Locator;
    private readonly delete: Locator;
    private readonly placeOrderBtn: Locator;
    private readonly nameOder: Locator;
    private readonly cardOrder: Locator;
    private readonly purchaseOrderBtn: Locator;
    private readonly orderMessage: Locator;
    private readonly okBtn: Locator;

    constructor(private page:Page){
        this.item = page.locator('#tbodyid');
        this.delete = page.getByRole('link',{name: "Delete"});
        this.nameOder = page.getByLabel('Name:',{exact: true});
        this.cardOrder = page.getByLabel('Credit card:',{exact: true});
        this.placeOrderBtn = page.getByRole('button',{name: 'Place Order', exact: true});
        this.purchaseOrderBtn = page.getByRole('button',{name: 'Purchase'});
        this.orderMessage = page.getByRole('heading', {level: 2, name: 'Thank you for your purchase!'});
        this.okBtn = page.getByRole('button',{name: 'OK'});


    };
    
    async deleteItem(){
        await this.delete.click();
        await expect(this.item).not.toBeVisible();
    };

    async purchaseOrder(name: string, card: string){
        await this.placeOrderBtn.click();
        await this.nameOder.fill(name);
        await this.cardOrder.fill(card)
        await this.purchaseOrderBtn.click();
        await this.orderMessage.isVisible();
        await this.okBtn.click();
    }
};
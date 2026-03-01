import { test } from '../../helper/init-page';

test.describe('Cart item tests', () => {
  test('Delete cart item', async ({ landingPage, cart }) => {
    await cart.deleteItem();
  });
  test('Purchase cart item', { tag: '@smoke_test' }, async ({landingPage, cart, testData }) => {
    await landingPage.clickCartMenu();
    await cart.purchaseOrder(testData.user.name, testData.user.cardNumber);
  });
});
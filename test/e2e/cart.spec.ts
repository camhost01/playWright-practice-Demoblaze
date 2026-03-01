import { test } from '../../helper/init-page';

test.describe('Cart item tests', () => {
  test('Delete cart item', async ({ cart }) => {
    await cart.deleteItem();
  });
  test('Purchase cart item', { tag: '@smoke_test' }, async ({cart, testData }) => {
    await cart.purchaseOrder(testData.user.name, testData.user.cardNumber);
  });
});
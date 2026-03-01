import { test as base, APIRequestContext } from '@playwright/test';
import { LandingPage } from '../test/pages/landing';
import { CartItem } from '../test/pages/cart';

/**
 * Interfaz que extiende las opciones de test de Playwright
 * con tus fixtures personalizadas
 */
interface CustomFixtures {
  landingPage: LandingPage;
  apiContext: APIRequestContext;
  testData: TestData;
  cart: CartItem;
}

/**
 * Datos de prueba tipados para usar en los tests
 */
interface TestData {
  user: {
    email: string;
    password: string;
    name: string;
    cardNumber: string;
  };
  config: {
    baseUrl: string;
    apiUrl: string;
    timeout: number;
  };
}

/**
 * Fixture personalizada que extiende el test base de Playwright
 * con funcionalidades comunes y páginas pre-configuradas
 */
export const test = base.extend<CustomFixtures>({
  // Fixture para página de landing pre-configurada
  landingPage: async ({ page }, use) => {
    const basePage = new LandingPage(page);
    await basePage.goto();
    await use(basePage);
  },
  cart: async({landingPage,page},use) =>{
   await landingPage.addProductCart();
   await landingPage.clickCartMenu();
    await use(new CartItem(page));
  },
  // Fixture para hacer requests API
  apiContext: async ({ request }, use: (context: APIRequestContext) => Promise<void>) => {
    await use(request);
  },

  // Fixture con datos de prueba
  testData: async ({}, use: (data: TestData) => Promise<void>) => {
    const data: TestData = {
      user: {
        email: 'test@example.com',
        password: 'test',
        name: 'test',
        cardNumber: '4455323343'
      },
      config: {
        baseUrl: 'https://playwright.dev',
        apiUrl: 'https://api.playwright.dev',
        timeout: 30000,
      },
    };
    await use(data);
  },
});

export { expect } from '@playwright/test';


import { test, expect } from "@playwright/test";
import { DataGenerator } from "../../utils/dataGenerator";
import { PageManager } from "../../utils/PageManager";


test.describe('API Tests', () => {

  const dataGenerator = new DataGenerator();

  var email, password;

  test('Test Case 1: Get Products List', async ({page}) => {
    const pageManager = new PageManager(page);
    const response = await pageManager.automationPracticeApi.getProducts();
    expect(response.products.length).toBeGreaterThan(0);
  });

  test('Test Case 2: Search Products', async ({page}) => {
    const pageManager = new PageManager(page);
    const response = await pageManager.automationPracticeApi.searchProduct('Men Tshirt');
    expect(response.products[0].name).toBe('Men Tshirt');
  });

  test('Test Case 3: Register & Check User', async ({page}) => {
    const pageManager = new PageManager(page);
    email = await dataGenerator.randomEmail();
    password = await dataGenerator.randomString(10);

    test.step('Register user', async () => {
      const response = await pageManager.automationPracticeApi.registerUser(email, password);
      expect(response.message).toBe('User created!');
    });

    test.step('Check user by credentials', async () => {
      const response = await pageManager.automationPracticeApi.verifyLogin(email, password);
      expect(response.message).toBe('User exists!');
    });

  });

});
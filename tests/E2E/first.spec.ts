import { test } from "@playwright/test";
import { DataGenerator } from "../../utils/dataGenerator";
import { testData } from "../../data/data";
import { PageManager } from "../../utils/pageManager";


test.describe('suite', () => {

  const dataGenerator = new DataGenerator();

  var name: string, email: string;

  test.beforeAll(async () => {
    console.log(process.env.ENV_NAME)
  });

  test.afterAll(async () => {
    console.log(`That's all, folks!`)
  });

  test('Test Case 1: Register User', async ({ page }) => {
    name = await dataGenerator.randomString(10);
    email = await dataGenerator.randomEmail();

    const pageManager = new PageManager(page);

    const data = {
      url: process.env.BASE_URL,
      name: name,
      email: email,
      password: testData.commonPassword,
      birthDay: testData.birthDay,
      birthMonth: testData.birthMonth,
      birthYear: testData.birthYear,
      firstName: testData.firstName,
      lastName: testData.lastName,
      company: testData.company,
      address: testData.address,
      country: testData.country,
      state: testData.state,
      city: testData.city,
      zipcode: testData.zipcode,
      mobileNumber: testData.mobileNumber
    };

    await pageManager.automationPractice.registerUser(data);

  });

});
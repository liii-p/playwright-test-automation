const { test, expect } = require("@playwright/test");

test("Put it all together", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.locator("[name='name']").first().type("James Bond");
  await page.locator("[name='email']").type("example@gmail.com");
  await page.locator("[placeholder='Password']").fill("Example123");
  await page.locator("#exampleCheck1").click();
  await expect(page.locator("#exampleCheck1")).toBeChecked();

  const selectGender = await page.locator("#exampleFormControlSelect1");
  await selectGender.selectOption("Female");
  await page.locator("input[value='option1']").click();
  await expect(page.locator("input[value='option1']")).toBeChecked();
  await expect(page.locator("input[value='option3']")).toBeDisabled();

  await page.locator("input[name='bday']").type("19051990", { delay: 100 });
  await page.locator("input[type='submit']").click();
  const confirmationMsg = await page.locator("div[class*='alert']");
  expect(confirmationMsg).toBeVisible();
});

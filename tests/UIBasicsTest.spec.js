const { test, expect } = require("@playwright/test");

test.only("Browser Context Error Login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.route("**/*.{jpg, png, jpeg}", (route) => route.abort());
  const userName = page.locator("#username");
  const pass = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status())
  );
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.type("rahulshetty");
  await pass.type("learning");
  await signIn.click();
  const warningMsg = await page.locator("[style*='block']").textContent();
  console.log(warningMsg);
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.type("rahulshettyacademy");

  await Promise.all([
    await signIn.click(),
    await page.waitForURL("**/angularpractice/shop"),
  ]);

  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkingLink = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");

  await dropdown.selectOption("consult");
  await page.locator(".checkmark").last().click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".checkmark").last()).toBeChecked();
  console.log(page.locator(".checkmark").last().isChecked());
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(blinkingLink).toHaveAttribute("class", "blinkingText");

  //await page.locator("#signInBtn").click();

  //await page.pause();
});

test("Child Windows Handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const blinkingLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkingLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  // const email = await newPage.locator("strong a").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(text);
  console.log(domain);

  await userName.type(domain);
  //await page.pause();
  //console.log(await userName.textContent());
});

test.skip("Codegen Test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.getByRole("combobox", { name: "Search" }).click();
  await page
    .getByRole("combobox", { name: "Search" })
    .fill("guardians of the galaxy");
  await page.getByRole("combobox", { name: "Search" }).press("Enter");
  await page.getByRole("tab", { name: "Cast" }).locator("span").first().click();
});

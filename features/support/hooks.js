const playwright = require("@playwright/test");
const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");

Before({ tags: "@foo" }, function () {
  // This hook will be executed before scenarios tagged with @foo
});

Before({ tags: "@foo and @bar" }, function () {
  // This hook will be executed before scenarios tagged with @foo and @bar
});

Before({ tags: "@foo or @bar" }, function () {
  // This hook will be executed before scenarios tagged with @foo or @bar
});

Before(async function () {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
});

After(async function () {
  console.log("I am last to execute");
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});

const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    email: "li@gmail.com",
    password: "Testing123!",
    productName: "zara coat 3",
  },
});

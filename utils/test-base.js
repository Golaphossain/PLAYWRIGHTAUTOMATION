const base = require("@playwright/test");

exports.customTest =
    base.test.extend({
        testData: {
            username: "golap.hossain88151@gmail.com",
            password: "Golap123#",
            productName: "ZARA COAT 3"
        }
    })
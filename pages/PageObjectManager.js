const { DashboardPage } = require("./DashboardPage")
const { LoginPage } = require("./LoginPage")
const { OrdersHistoryPage } = require('./OrdersHistoryPage')
const { OrdersReviewPage } = require('./OrdersReviewPage')
const { CartPage } = require('./CartPage')

exports.PageObjectManager =
    class PageObjectManager {
        constructor(page) {
            this.page = page;
            this.loginPage = new LoginPage(this.page);
            this.dashboardPage = new DashboardPage(this.page);
            this.ordersHistoryPage = new OrdersHistoryPage(this.page);
            this.ordersReviewPage = new OrdersReviewPage(this.page);
            this.cartPage = new CartPage(this.page);


        }

        getLoginPage() {
            return this.loginPage;
        }

        getCartPage() {
            return this.cartPage;
        }

        getDashboardPage() {
            return this.dashboardPage;
        }
        getOrdersHistoryPage() {
            return this.ordersHistoryPage;
        }

        getOrdersReviewPage() {
            return this.ordersReviewPage;
        }
    }
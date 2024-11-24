Feature: Ecommerce Validations
    @Regression
    Scenario: Placing the order
        Given Login to Ecommerce application with "golap.hossain88151@gmail.com" and "Golap123#"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify order is present in orderHistory page
Feature: Ecommerce Validations
    @Validation
    Scenario: Placing the order
        Given Login to Ecommerce2 application with "golap.hossain88151@gmail.com" and "Golap123#"
        Then Verify Error Message is displayed 
Feature: Ecommerce Validations
@Regression
 Scenario: Placing the Order
    Given I login to the Ecommerce application with "li@gmail.com" and "Testing123!"
    When "zara coat 3" is added to cart
    Then verify "zara coat 3" is displayed in the cart
    When valid details are entered with "li@gmail.com" and order is placed
    Then verify order is correct and present in the order history page

@Validation
 Scenario Outline: Placing the Order
    Given I login to the Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed

    Examples:
      | username     | password   | 
      | li@gmail.com | Testing123!|
      | test@123.com | pass123    |
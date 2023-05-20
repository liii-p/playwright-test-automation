Feature: Ecommerce Validations
@Validation
 Scenario Outline: Placing the Order
    Given I login to the Ecommerce2 application with "<username>" and "T<password>"
    Then verify error message is displayed

    Examples:
      | username     | password   | 
      | li@gmail.com | Testing123!|
      | test@123.com | pass123    |
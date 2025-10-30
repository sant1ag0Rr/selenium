Feature: User Authentication
    As a user
    I want to be able to log in to the system
    So that I can access my account

    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I enter valid credentials
            | username | test@example.com |
            | password | password123      |
        And I click the login button
        Then I should see successful login message

    Scenario: Failed login with invalid credentials
        Given I am on the login page
        When I enter invalid credentials
            | username | invalid@example.com |
            | password | wrongpassword       |
        And I click the login button
        Then I should see login error message

    Scenario: Login with empty fields
        Given I am on the login page
        When I click the login button
        Then I should see required field errors

    Scenario: Login with invalid email format
        Given I am on the login page
        When I enter invalid credentials
            | username | invalidemail |
            | password | password123  |
        And I click the login button
        Then I should see invalid email format error

    Scenario: Login with password too short
        Given I am on the login page
        When I enter invalid credentials
            | username | test@example.com |
            | password | 123              |
        And I click the login button
        Then I should see password length error

    Scenario: Account lockout after multiple failed attempts
        Given I am on the login page
        When I enter incorrect password multiple times
            | username | test@example.com |
            | password | wrongpass        |
        Then I should see account lockout message

    Scenario: Password reset link functionality
        Given I am on the login page
        When I click on forgot password link
        Then I should be redirected to password reset page

    Scenario: Remember me functionality
        Given I am on the login page
        When I enter valid credentials
            | username | test@example.com |
            | password | password123      |
        And I check remember me
        And I click the login button
        Then I should stay logged in after browser restart
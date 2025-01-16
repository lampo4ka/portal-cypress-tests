# Portal-cypress-tests

## Test cases

### Feature: Portal login

- Scenario: should redirect to dashboard page with valid user
Given user is on the login page https://wave-trial.getbynder.com/login/
When user enters valid username and password
And user clicks on the login button
Then user should be redirected to the dashboard page

- Scenario: should redirect to login page after logout
Given user is on the dashboard page
When user clicks on dropdown profile menu
And user clicks on the logout button
n user should be redirected to the login page 

- Scenario: should show error message
Given user is on the login page https://wave-trial.getbynder.com/login/
When user enters non-existing username and password
And user clicks on the login button
Then message of an incorrect username and password should be displayed

- Scenario: should display logo
Given user is on the login page https://wave-trial.getbynder.com/login/
When user click the logo
Then user should be remain on login page

- Scenario: Should remain on login page when no credentials are entered
Given user is on the login page https://wave-trial.getbynder.com/login/
When user clicks on the login button
Then user should be leave on the login page

- Scenario: Should remain on login page when only email is entered
Given user is on the login page https://wave-trial.getbynder.com/login/
When user enters valid username
And user clicks on the login button
Then user should be leave on the login page

- Scenario: should reset password
Given user is on the login page https://wave-trial.getbynder.com/login/
When user clicks on Lost password
Then Reset password form should be displayed

- Scenario: should cancel reset password
Given The user is on the login page https://wave-trial.getbynder.com/login/
When user clicks on Lost password
And user clicks on Cancel
Then user should be redirected to the login page

## Installation

## Run in Docker
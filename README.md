# portal-cypress-tests

Feature: Portal auth

Scenario: Login and logout
Given The user is on the login page https://wave-trial.getbynder.com/login/
When The user enters valid username and password
And The user clicks on the login button
Then The user should be redirected to the dashboard page
When The user clicks on dropdown profile menu
And the user clicks on the logout button
Then the user should be redirected to the login page 

Scenario: Login with non-existing credentials
Given The user is on the login page https://wave-trial.getbynder.com/login/
When The user enters non-existing username and password
And The user clicks on the login button
Then The message of an incorrect username and password should be displayed

# Installation

# Run in Docker
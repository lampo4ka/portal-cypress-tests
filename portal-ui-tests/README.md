# Portal-cypress-tests

## Prerequisites

Node.js and npm
Docker (optional)

## Local Setup

1. Install dependencies:

```bash
npm i
```

2. Create `./cypress.env.json`: 

```json
{
    // The credentials were provided in the email
    "username": "john.doe@real-business.biz",
    "password": "strongest-password-ever",
    "name": "John Doe"
}
```

3. Run tests

- Open Cypress: `npm start`
- Run in headless mode: `npm run headless`

## Docker Setup

1. Create `.env` file:

```env
# The credentials were provided in the email
USERNAME=john.doe@real-business.biz
PASSWORD=strongest-password-ever
NAME=John Doe
```

2. Create `reports` directory

3. Build and run

```bash
docker build -t ui-tests .
docker run -it -v ./reports:/app/cypress/results --env-file .env --rm ui-tests
```

## Test cases

### Feature: Portal login

**Scenario**: User should be redirected to dashboard page with valid credentials
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user logs in with valid credentials
**Then** user should be redirected to the dashboard page

**Scenario**: User should be redirected to login page after logout
**Given** user is on the dashboard page
**When** user logs out
**Then** user should be redirected to the login page

**Scenario**: User sees error message when logging in with invalid credentials
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user logs in with non-existing credentials
**Then** login error message should be displayed

**Scenario**: User remains on loggin page when only email is entered
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user logs in with only valid username
**Then** user should be remain on the login page

**Scenario**: User remains on loggin page when only password is entered
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user logs in with only valid password
**Then** user should be remain on the login page

**Scenario**: User should remain on login page when no credentials are entered
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user logs in with empty credentials
**Then** user should be remain on the login page

**Scenario**: User should be redirected to Bynder main page
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user clicks on Bynder logo
**Then** user should be redirected to the main page

**Scenario**: Language button should display different options
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user clicks on Language
**Then** list of languages should be displayed

**Scenario**: Support button should be displayed
**Given** user visits https://wave-trial.getbynder.com/login/
**When** login page is loaded
**Then** support button should be displayed

**Scenario**: Cookie button should be displayed
**Given** The a user visits https://wave-trial.getbynder.com/login/
**When** login page is loaded
**Then** cookie button should be displayed

**Scenario**: Reset password form should be displayed
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user clicks on Lost password
**Then** reset password form should be displayed

**Scenario**: User cancels reset password process
**Given** user visits https://wave-trial.getbynder.com/login/
**When** user clicks on Lost password
**And** user clicks on Cancel
**Then** user should be redirected to the login page

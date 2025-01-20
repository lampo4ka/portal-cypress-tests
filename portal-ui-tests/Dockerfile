FROM cypress/included:14.0.0

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY ./cypress.config.js ./cypress.config.js 
COPY ./cypress.env.json ./cypress.env.json
COPY ./cypress ./cypress

CMD [ "npm run ui-test" ]
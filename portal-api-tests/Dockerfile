FROM cypress/included:14.0.0

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY ./cypress.config.js ./cypress.config.js 
COPY ./reporter-config.json ./reporter-config.json
COPY ./cypress ./cypress

ARG TMDB_API_KEY ''
ARG TMDB_API_TOKEN ''

CMD [ "npm run api-test" ]
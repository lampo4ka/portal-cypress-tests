FROM cypress/base:22.12.0

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci --omit=dev

COPY . .

RUN rm ./cypress.config.js
RUN mv ./docker.cypress.config.js ./cypress.config.js

ENV TMDB_API_TOKEN=''

CMD [ "npm", "run", "headless" ]
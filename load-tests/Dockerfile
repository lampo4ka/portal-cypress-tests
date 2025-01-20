FROM grafana/k6:0.56.0

COPY ./load_test.js ./load_test.js

# ENV API_ENDPOINT 'https://api.themoviedb.org/3/movie/top_rated'
# ENV API_KEY ''
ENV K6_WEB_DASHBOARD true

CMD [ "k6", "run", "load_test.js" ]
source .env &&
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run -e TMDB_API_KEY=$TMDB_API_KEY load_test.js      
# Load Test Project with k6

A basic load test suite for [movie-top-rated-list](https://developer.themoviedb.org/reference/movie-top-rated-list) endpoint.

## Prerequisites

- k6 installed on your system. If not installed, [follow the official k6 installation guide](https://grafana.com/docs/k6/latest/set-up/install-k6/)

## Running the Test

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run load_test.js
```
Open [http://127.0.0.1:5665/ui/?endpoint=/](http://127.0.0.1:5665/ui/?endpoint=/) to see testing in progress

The load_test.js file contains a load test scenario with the following characteristics:

**Stages:**
1 minute at 20 iterations/second
1 minute ramp-up to 60 iterations/second
2 minutes at 60 iterations/second
30 seconds ramp-down to 20 iterations/second

**Thresholds**
The test includes two thresholds:
HTTP errors should be less than 1%
95% of requests should complete in less than 200ms

**Checks**
The script performs the following checks on each request:
Status code is 200
Response time is less than 200ms
Status is not 429 (Too Many Requests)
Status is not 500 (Internal Server Error)

## Viewing Results

k6 will display a summary of the test results in the html-report.html, including metrics like:
http_reqs: Total number of HTTP requests
http_req_duration: Time taken for the requests
http_req_failed: Total number of HTTP failed requests

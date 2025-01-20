# Load tests project
A basic load test suite for [movie-top-rated-list](https://developer.themoviedb.org/reference/movie-top-rated-list) endpoint.

The load_test.js file contains a load test scenario with the following characteristics:
- Start `rate` iterations per `timeUnit` for the 1st minute.
- Linearly ramp-up to starting `rate` iterations per `timeUnit` over the following 1 minute
- Continue starting `rate` iterations per `timeUnit` for the following 2 minutes.
- Linearly ramp-down to starting `rate` iterations per `timeUnit` over the last 30 seconds

## Prerequisites

- k6 installed on your system. If not installed, [follow the official k6 installation guide](https://grafana.com/docs/k6/latest/set-up/install-k6/)

## Running the Test

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run load_test.js
```
Open [http://127.0.0.1:5665/ui/?endpoint=/](http://127.0.0.1:5665/ui/?endpoint=/) to see testing in progress

## Viewing Results
k6 will display a summary of the test results in the html-report.html, including metrics like:
http_reqs: Total number of HTTP requests
http_req_duration: Time taken for the requests
http_req_failed: Total number of HTTP failed requests
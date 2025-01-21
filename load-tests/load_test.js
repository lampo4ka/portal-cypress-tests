import { check, sleep } from "k6";

export let options = {
  scenarios: {
      my_scenario: {
        executor: 'ramping-arrival-rate',

        // Start iterations per second
        startRate: 20,
        preAllocatedVUs: 50,
        maxVUs: 160,
        timeUnit: '1s',

        stages: [
          // Start 20 iterations per second for the first minute
          { target: 20, duration: '1m' },
          // Linearly ramp-up to starting 60 iterations per second over the following one minutes.
          { target: 60, duration: '1m' },
          // Continue starting 60 iterations per seconf` for the following two minutes.
          { target: 60, duration: '2m' },
          // Linearly ramp-down to starting 20 iterations per second over the last 30 seconds.
          { target: 20, duration: '30s' },
      ],

      },
    },
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
  },
};

export default function () {
  let res = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
    "status is not 429": (r) => r.status !== 429,
    "status is not 500": (r) => r.status !== 500,
  });
  sleep(1);
}

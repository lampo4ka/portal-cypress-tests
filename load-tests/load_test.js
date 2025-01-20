import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';


const myTrend = new Trend('waiting_time')

export let options = {
    scenarios: {
        my_scenario1: {
          executor: 'ramping-arrival-rate',
            // Start iterations per `timeUnit`
          startRate: 20,
          preAllocatedVUs: 50, // to allocate runtime resources     preAll
          maxVUs: 150,
          timeUnit: '1s',

          stages: [
            { target: 20, duration: '1m' }, 
            { target: 50, duration: '1m' }, 
            { target: 50, duration: '2m' }, 
            { target: 20, duration: '30s' },
        ],
          
        },
      },
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
      },
};

export default function () {
    let res = http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=4809cdd99aba59335f392c9242c52ab0');
    // let res = http.get(`${process.env.API_ENDPOINT}?api_key=${API_KEY}`);
    check(res, {
        'status is 200': r => r.status === 200,
        'response time < 500ms': r => r.timings.duration < 200
    });
    myTrend.add(res.timings.waiting);
    sleep(1);

}
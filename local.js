/**
 * Лаб 2 — Алхам 5: Локал сервер рүү load тест
 *
 * Ажиллуулах (эхлээд: node server/server.js):
 *   k6 run -e EP=fast --vus 30 --duration 30s local.js
 *   k6 run -e EP=slow --vus 30 --duration 30s local.js
 *   k6 run -e EP=cpu  --vus 100 --duration 30s local.js
 *
 * Бай нь зөвхөн localhost — ёс зүйн хувьд аюулгүй, сүлжээний хэлбэлзэлгүй.
 */
import http from 'k6/http';
import { sleep, check } from 'k6';

const EP = __ENV.EP || 'fast';

export const options = {
  vus: 5,
  duration: '30s',
  // Локал серверт зориулсан SLO: /fast,/cpu → p95<50ms, /slow → p95<150ms (100ms + 50ms нөөц)
  thresholds: {
    http_req_duration: [EP === 'slow' ? 'p(95)<150' : 'p(95)<50'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`http://localhost:3000/${EP}`);
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}

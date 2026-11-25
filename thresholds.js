/**
 * Лаб 2 — Алхам 4: Thresholds — SLO-г кодоор шалгуулах
 *
 * SLO-г өөрийн baseline-аас гаргасан:
 *   results/run-05vu.txt (5 VU, 1 мин) → p(95) = 228.37ms
 *   SLO = baseline × 1.5 ≈ 343ms → 350ms болгож бөөрөнхийлсөн.
 *   Шалтгаан: ачаалал 6 дахин өсөхөд (30 VU) хэрэглэгч мэдэгдэхүйц удаашрал
 *   (~50%-аас их) мэдрэхгүй байх ёстой гэсэн шаардлага.
 *
 * Ажиллуулах:
 *   k6 run thresholds.js                       # PASS (SLO: p95<350)
 *   k6 run -e STRICT=1 thresholds.js           # FAIL (санаатай хатуу: p95<50)
 *
 * Threshold зөрчигдвөл k6 exit code 99-өөр дуусдаг → CI pipeline-д quality gate болно.
 */
import http from 'k6/http';
import { sleep, check } from 'k6';

// STRICT=1 үед санаатайгаар биелэх боломжгүй хатуу threshold тавина
const P95_LIMIT = __ENV.STRICT ? 50 : 350;

export const options = {
  // stages-ийг энд ОРУУЛААГҮЙ: stages байвал vus/duration чимээгүй үл тоогдоно
  vus: 30,
  duration: '1m',
  thresholds: {
    http_req_duration: [`p(95)<${P95_LIMIT}`], // SLO: p95 latency
    http_req_failed: ['rate<0.01'],            // SLO: error rate < 1%
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}

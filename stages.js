/**
 * Лаб 2 — Алхам 3: Ачааллыг шатлан өсгөх (stages)
 *
 * АНХААР: stages ашигласан нэг ажиллуулалт тестийн төгсгөлд НЭГТГЭСЭН ганц
 * summary өгдөг тул 5/30/100 VU тус бүрийн p95-ыг салгаж өгөхгүй.
 * Хүснэгтийн тоог script.js-ийг --vus 5/30/100-аар тусад нь ажиллуулж авсан.
 * Энэ скрипт нь ачаалал өсөх, буух үеийн ерөнхий зургийг харахад зориулагдсан.
 */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // халаалт (warm-up)
    { duration: '1m', target: 30 },   // өсгөлт (ramp-up)
    { duration: '30s', target: 100 }, // оргил (peak)
    { duration: '30s', target: 0 },   // буулт (ramp-down)
  ],
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}

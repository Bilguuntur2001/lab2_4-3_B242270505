/**
 * Лаб 2 — Алхам 2: Анхны k6 тест (baseline)
 *
 * Бай (target): https://test.k6.io — Grafana k6-ийн албан ёсны дадлагын сайт.
 * (Ёс зүй: зөвхөн зөвшөөрөгдсөн дадлагын сайт эсвэл локал сервер рүү тестлэнэ.)
 *
 * Ажиллуулах:
 *   k6 run script.js                          # 5 VU, 30 секунд (options-оос)
 *   k6 run --vus 30 --duration 1m script.js   # CLI flag нь options-ийг дарна
 */
import http from 'k6/http';
import { sleep, check } from 'k6';

// 5 зэрэгцээ виртуал хэрэглэгч (VU) 30 секундын турш ажиллана
export const options = { vus: 5, duration: '30s' };

// VU бүр энэ функцийг давтан ажиллуулна (нэг давталт = нэг "iteration")
export default function () {
  const res = http.get('https://test.k6.io');
  // check нь тестийг зогсоодоггүй, зөвхөн амжилттай/амжилтгүйг тоолно
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  // Бодит хэрэглэгч шиг 1 секунд "бодох" хугацаа (think time)
  sleep(1);
}

/**
 * Лаб 2 — Алхам 5: Тестлэх локал сервер (гадаад сан хэрэггүй, зөвхөн Node.js)
 *
 * Endpoint-ууд:
 *   GET /fast  — шууд хариулна (baseline)
 *   GET /slow  — 100ms хүлээгээд хариулна (setTimeout: event loop-ыг БЛОКЛОХГҮЙ,
 *                өөрөөр хэлбэл DB/гадаад API-г хүлээж буй мэт I/O хүлээлт)
 *   GET /cpu   — 15ms CPU тооцоолол хийнэ (event loop-ыг БЛОКЛОНО — Node нэг thread
 *                тул хүсэлтүүд дараалалд зогсоно; хүчин чадал ≈ 1000/15 ≈ 66 req/s)
 *
 * Ажиллуулах: node server/server.js   (порт 3000)
 */
const http = require('http');

const PORT = process.env.PORT || 3000;

// CPU-г ms хугацаанд "завгүй" байлгах (жишээ нь хүнд тооцоолол, JSON parse г.м.)
function busyWait(ms) {
  const end = Date.now() + ms;
  let x = 0;
  while (Date.now() < end) x += Math.sqrt(x + 1);
  return x;
}

const server = http.createServer((req, res) => {
  const send = (body) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.url === '/fast') return send({ ok: true, endpoint: 'fast' });
  if (req.url === '/slow') return setTimeout(() => send({ ok: true, endpoint: 'slow' }), 100);
  if (req.url === '/cpu') {
    busyWait(15);
    return send({ ok: true, endpoint: 'cpu' });
  }
  res.writeHead(404).end('not found');
});

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));

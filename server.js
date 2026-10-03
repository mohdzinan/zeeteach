'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const ROOT = __dirname;

app.disable('x-powered-by');

// Security headers. Inline styles are currently used for the skip-link; scripts
// and all page assets are same-origin. Font Awesome is pinned to its CDN host.
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' https://cdnjs.cloudflare.com",
        "font-src 'self' https://cdnjs.cloudflare.com",
        "img-src 'self' data:",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        ...(isProduction ? ["upgrade-insecure-requests"] : [])
    ].join('; '));
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    if (isProduction) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    }
    next();
});

// Bounded per-process rate limit for the public read-only API. Keep trust proxy
// disabled unless the deployment explicitly configures a trusted proxy.
const rateWindowMs = 60 * 1000;
const rateLimitCount = 120;
const maxRateLimitEntries = 10_000;
const requestCounts = new Map();
function publicApiRateLimit(req, res, next) {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    let entry = requestCounts.get(key);

    if (!entry || now - entry.start >= rateWindowMs) {
        entry = { start: now, count: 0 };
        requestCounts.set(key, entry);
    }
    entry.count += 1;
    if (entry.count > rateLimitCount) {
        res.setHeader('Retry-After', String(Math.ceil((rateWindowMs - (now - entry.start)) / 1000)));
        return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    }

    if (requestCounts.size > maxRateLimitEntries) {
        for (const [address, value] of requestCounts) {
            if (now - value.start >= rateWindowMs || requestCounts.size > maxRateLimitEntries * 0.9) {
                requestCounts.delete(address);
            }
        }
    }
    next();
}

app.get('/', (req, res) => res.sendFile(path.join(ROOT, 'index.html')));
app.get('/study-guide', (req, res) => res.sendFile(path.join(ROOT, 'study-guide.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(ROOT, 'terms.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(ROOT, 'privacy.html')));

const publicAssets = new Map([
    ['/styles.css', 'styles.css'],
    ['/study-guide.css', 'study-guide.css'],
    ['/study-guide.html', 'study-guide.html'],
    ['/terms.html', 'terms.html'],
    ['/privacy.html', 'privacy.html'],
    ['/app.js', 'app.js'],
    ['/slides-data.js', 'slides-data.js'],
    ['/economyin.svg', 'economyin.svg'],
    ['/assets/cover-india-economy.svg', 'assets/cover-india-economy.svg'],
    ['/assets/development.svg', 'assets/development.svg'],
    ['/assets/history.svg', 'assets/history.svg'],
    ['/assets/reforms.svg', 'assets/reforms.svg'],
    ['/assets/sectors.svg', 'assets/sectors.svg'],
    ['/assets/agriculture.svg', 'assets/agriculture.svg'],
    ['/assets/industry.svg', 'assets/industry.svg'],
    ['/assets/services.svg', 'assets/services.svg'],
    ['/assets/challenges.svg', 'assets/challenges.svg'],
    ['/assets/public-programs.svg', 'assets/public-programs.svg'],
    ['/assets/rural-development.svg', 'assets/rural-development.svg'],
    ['/assets/urban-development.svg', 'assets/urban-development.svg'],
    ['/assets/sustainability.svg', 'assets/sustainability.svg'],
    ['/assets/global-trade.svg', 'assets/global-trade.svg']
]);
for (const [url, filename] of publicAssets) {
    app.get(url, (req, res) => {
        res.setHeader('Cache-Control', isProduction ? 'public, max-age=3600' : 'no-store');
        res.sendFile(path.join(ROOT, filename));
    });
}

app.use(['/api', '/health'], publicApiRateLimit);

app.get('/api/slides', (req, res) => {
    res.json({ success: true, totalSlides: 19, message: 'Slides data loaded successfully' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((req, res) => res.status(404).type('text').send('Not found'));

app.use((err, req, res, next) => {
    console.error('Request failed:', err.message);
    if (res.headersSent) return next(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`ZeeTeach server listening on port ${PORT} (${isProduction ? 'production' : 'development'})`);
});

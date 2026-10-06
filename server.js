'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const ROOT = __dirname;

app.disable('x-powered-by');

// Security headers. Scripts, styles, fonts, and page assets are same-origin.
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self'",
        "font-src 'self'",
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

app.get('/', (req, res) => res.sendFile(path.join(ROOT, 'pages/index.html')));
app.get('/syllabus', (req, res) => res.sendFile(path.join(ROOT, 'pages/syllabus.html')));
app.get('/streams', (req, res) => res.sendFile(path.join(ROOT, 'pages/streams.html')));
app.get('/plus-two-options', (req, res) => res.sendFile(path.join(ROOT, 'pages/plus-two-options.html')));
app.get('/commerce', (req, res) => res.sendFile(path.join(ROOT, 'pages/commerce.html')));
app.get('/commerce/economics', (req, res) => res.sendFile(path.join(ROOT, 'pages/economics.html')));
app.get('/commerce/economics/chapter-1', (req, res) => res.sendFile(path.join(ROOT, 'pages/chapter-1.html')));
app.get('/humanities', (req, res) => res.sendFile(path.join(ROOT, 'pages/humanities.html')));
app.get('/humanities/economics', (req, res) => res.sendFile(path.join(ROOT, 'pages/humanities-economics.html')));
app.get('/humanities/economics/chapter-1', (req, res) => res.sendFile(path.join(ROOT, 'pages/chapter-1.html')));
const studyMaterialDownloads = new Map([
    ['/downloads/revision-guide', 'downloads/Class_11_Economics_Important_Topics_Revision_Guide.pdf'],
    ['/downloads/economics-notes', 'downloads/Hsslive_XI INDIAN ECONOMIC DEVELOPMENT_Notes.pdf'],
    ['/downloads/scheme-of-work', 'downloads/XI_Indian_Economic_Development_Scheme_of_Work.pdf']
]);
for (const [url, filename] of studyMaterialDownloads) {
    app.get(url, (req, res) => res.download(path.join(ROOT, filename), filename));
}
app.get('/study-guide', (req, res) => res.sendFile(path.join(ROOT, 'pages/study-guide.html')));
app.get('/quiz', (req, res) => res.sendFile(path.join(ROOT, 'pages/quiz.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(ROOT, 'pages/terms.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(ROOT, 'pages/privacy.html')));

const publicAssets = new Map([
    ['/styles.css', 'public/css/styles.css'],
    ['/fonts/dm-sans-latin.woff2', 'public/fonts/dm-sans-latin.woff2'],
    ['/fonts/literata-latin.woff2', 'public/fonts/literata-latin.woff2'],
    ['/favicon.svg', 'public/favicon.svg'],
    ['/theme.js', 'public/js/theme.js'],
    ['/hub.css', 'public/css/hub.css'],
    ['/syllabus.js', 'public/js/syllabus.js'],
    ['/streams.js', 'public/js/streams.js'],
    ['/flow.js', 'public/js/flow.js'],
    ['/study-guide.css', 'public/css/study-guide.css'],
    ['/study-guide.html', 'pages/study-guide.html'],
    ['/quiz.css', 'public/css/quiz.css'],
    ['/quiz.html', 'pages/quiz.html'],
    ['/quiz-data.js', 'public/js/quiz-data.js'],
    ['/quiz.js', 'public/js/quiz.js'],
    ['/terms.html', 'pages/terms.html'],
    ['/privacy.html', 'pages/privacy.html'],
    ['/app.js', 'public/js/app.js'],
    ['/slides-data.js', 'public/js/slides-data.js'],
    ['/economyin.svg', 'public/economyin.svg'],
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

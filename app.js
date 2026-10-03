// Slideshow functionality
let currentSlide = 0;
let slides = [];

// Initialize the slideshow
function initSlideshow() {
    renderSlides();
    createIndicators();
    showSlide(0);
    setupKeyboardNavigation();
}

// Render all slides to the DOM
function renderSlides() {
    const slidesWrapper = document.getElementById('slides-wrapper');
    slidesWrapper.replaceChildren();
    slides = [];

    slidesData.forEach((slideData, index) => {
        const slideElement = createSlideElement(slideData, index);
        slidesWrapper.appendChild(slideElement);
        slides.push(slideElement);
    });

    document.getElementById('total-slides').textContent = slidesData.length;
}

// Create a slide element based on type
function createSlideElement(slideData, index) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.dataset.index = index;

    if (slideData.type === 'title') {
        slide.classList.add('slide-title-slide');
        if (isAllowedSlideImage(slideData.image)) {
            slide.classList.add('has-art');
            const artPanel = document.createElement('div');
            artPanel.className = 'slide-title-art';
            const image = document.createElement('img');
            image.src = slideData.image;
            image.alt = 'Illustration of agriculture, industry, clean energy, and a growing Indian city';
            artPanel.appendChild(image);
            slide.appendChild(artPanel);
        }
        const copyPanel = document.createElement('div');
        copyPanel.className = 'slide-title-copy';
        const heading = document.createElement('h2');
        heading.textContent = slideData.title;
        const subtitle = document.createElement('p');
        subtitle.textContent = slideData.subtitle || '';
        copyPanel.append(heading, subtitle);
        if (slideData.message) {
            const message = document.createElement('p');
            message.className = 'slide-message';
            message.textContent = slideData.message;
            copyPanel.appendChild(message);
        }
        slide.appendChild(copyPanel);
    } else if (slideData.type === 'content') {
        slide.classList.add('slide-content-slide');
        slide.append(createHeading(slideData.title), createContentList(slideData.content));
    } else if (slideData.type === 'image-content') {
        slide.classList.add('slide-with-image');
        const imagePanel = document.createElement('div');
        imagePanel.className = 'slide-image';
        if (isAllowedSlideImage(slideData.image)) {
            const image = document.createElement('img');
            image.src = slideData.image;
            image.alt = slideData.title;
            imagePanel.appendChild(image);
        }
        const textPanel = document.createElement('div');
        textPanel.className = 'slide-image-text';
        textPanel.append(createHeading(slideData.title), createContentList(slideData.content));
        slide.append(imagePanel, textPanel);
    }

    return slide;
}

function createHeading(text) {
    const heading = document.createElement('h2');
    heading.textContent = text;
    return heading;
}

function createContentList(items) {
    const list = document.createElement('ul');
    (Array.isArray(items) ? items : []).forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    return list;
}

function isAllowedSlideImage(source) {
    return typeof source === 'string' &&
        (/^data:image\/svg\+xml(?:;|,)/i.test(source) || source === 'economyin.svg' ||
            /^assets\/(?:cover-india-economy|development|history|reforms|sectors|challenges|public-programs|sustainability|global-trade)\.svg$/.test(source));
}

// Show a specific slide
function showSlide(index) {
    if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;

    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }

    // Update slide counter
    document.getElementById('current-slide').textContent = index + 1;
    document.querySelector('.slide-btn.prev').disabled = index === 0;
    document.querySelector('.slide-btn.next').disabled = index === slides.length - 1;

    // Update indicators
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        if (i === index) dot.setAttribute('aria-current', 'step');
        else dot.removeAttribute('aria-current');
    });

    currentSlide = index;
}

// Navigate to next or previous slide
function changeSlide(direction) {
    let newIndex = currentSlide + direction;

    if (newIndex >= slidesData.length) {
        newIndex = slidesData.length - 1;
    } else if (newIndex < 0) {
        newIndex = 0;
    }

    showSlide(newIndex);
}

// Create indicator dots
function createIndicators() {
    const indicator = document.getElementById('slide-indicator');
    indicator.replaceChildren();

    slidesData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'indicator-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}: ${slidesData[index].title}`);
        dot.addEventListener('click', () => showSlide(index));
        indicator.appendChild(dot);
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea, select, [contenteditable="true"]')) return;
        if (e.key === 'ArrowRight' || e.key === ' ') {
            changeSlide(1);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
            e.preventDefault();
        } else if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
            e.preventDefault();
        } else if (e.key === 'Home') {
            showSlide(0);
            e.preventDefault();
        } else if (e.key === 'End') {
            showSlide(slidesData.length - 1);
            e.preventDefault();
        }
    });
}

// Fullscreen toggle
function toggleFullscreen() {
    const slidesWrapper = document.querySelector('.slideshow-container');
    const action = document.fullscreenElement
        ? document.exitFullscreen?.()
        : slidesWrapper.requestFullscreen?.();
    if (!action) {
        announce('Fullscreen is not supported by this browser.');
        return;
    }
    action.then(() => updateFullscreenButton()).catch(() => announce('Fullscreen could not be changed.'));
}

function updateFullscreenButton() {
    const button = document.getElementById('fullscreen-button');
    if (!button) return;
    const active = Boolean(document.fullscreenElement);
    const icon = document.createElement('i');
    icon.className = `fas fa-${active ? 'compress' : 'expand'}`;
    icon.setAttribute('aria-hidden', 'true');
    button.replaceChildren(icon, document.createTextNode(` ${active ? 'Exit fullscreen' : 'Fullscreen'}`));
}

function announce(message) {
    const status = document.getElementById('action-status');
    if (status) status.textContent = message;
}

// Smooth scroll to presentation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    // Initialize slideshow
    initSlideshow();
    document.querySelector('.slide-btn.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.slide-btn.next').addEventListener('click', () => changeSlide(1));
    document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);
    document.getElementById('print-button').addEventListener('click', printPresentation);
    document.getElementById('download-button').addEventListener('click', downloadSlide);
    document.getElementById('share-button').addEventListener('click', sharePresentation);
    document.addEventListener('fullscreenchange', updateFullscreenButton);
});

// Print functionality
function printPresentation() {
    window.print();
}

// Download as image (placeholder)
function downloadSlide() {
    const data = slidesData[currentSlide];
    if (!data) return;
    const title = escapeHtml(data.title);
    const body = data.type === 'title'
        ? `${isAllowedSlideImage(data.image) ? `<img src="${escapeHtml(new URL(data.image, window.location.href).href)}" alt="Illustration for ${title}">` : ''}<p class="subtitle">${escapeHtml(data.subtitle || '')}</p>${data.message ? `<p>${escapeHtml(data.message)}</p>` : ''}`
        : `${isAllowedSlideImage(data.image) ? `<img src="${escapeHtml(data.image)}" alt="${title}">` : ''}<ul>${(Array.isArray(data.content) ? data.content : []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title><style>body{font:18px/1.6 Segoe UI,Arial,sans-serif;color:#2c3e50;background:#f5f7f0;margin:0;padding:8vw}main{max-width:900px;margin:auto;background:white;padding:4rem;border-radius:16px}h1{color:#2d5016;border-bottom:3px solid #d4a574;padding-bottom:1rem}li{margin:.7rem 0}img{max-width:100%;max-height:40vh;object-fit:contain}.subtitle{color:#4a7c9e;font-size:1.3rem}@media print{body{padding:0}main{padding:2rem}}</style><main><h1>${title}</h1>${body}</main></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title.replace(/[^\w -]/g, '').trim().replace(/\s+/g, '-') || 'slide'}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce('Slide downloaded as an HTML file.');
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

// Share functionality
function sharePresentation() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'ZeeTeach - Indian Economic Development',
            text: 'Check out this interactive presentation about Indian Economic Development!',
            url: url
        }).then(() => announce('Presentation shared.')).catch(error => {
            if (error.name !== 'AbortError') copyShareLink(url);
        });
    } else {
        copyShareLink(url);
    }
}

function copyShareLink(url) {
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(url).then(
            () => announce('Presentation link copied to clipboard.'),
            () => announce(`Copy this link to share: ${url}`)
        );
        return;
    }
    announce(`Copy this link to share: ${url}`);
}

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next slide
            changeSlide(1);
        } else {
            // Swiped right - go to previous slide
            changeSlide(-1);
        }
    }
}

// Accessibility: Skip to main content
document.addEventListener('DOMContentLoaded', () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#presentation';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to presentation';
    document.body.prepend(skipLink);
});

// Analytics-like tracking (optional)
function trackSlideView(slideIndex) {
    console.log(`Viewing slide ${slideIndex + 1}: ${slidesData[slideIndex].title}`);
}

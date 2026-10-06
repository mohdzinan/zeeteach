'use strict';

let currentSlide = 0;
let slides = [];

function initSlideshow() {
    const demo = document.querySelector('.demo');
    const loading = document.getElementById('slide-loading');

    try {
        if (!Array.isArray(slidesData) || slidesData.length === 0) {
            throw new Error('No presentation content is available.');
        }
        renderSlides();
        createIndicators();
        showSlide(0);
        setupControls();
        setupKeyboardNavigation();
        setupTouchNavigation();
        loading.hidden = true;
        demo.setAttribute('aria-busy', 'false');
    } catch (error) {
        loading.hidden = true;
        const message = document.createElement('p');
        message.className = 'slide-load-error';
        message.textContent = 'The presentation could not be loaded. Please refresh the page.';
        document.getElementById('slides-wrapper').replaceChildren(message);
        demo.setAttribute('aria-busy', 'false');
    }
}

function renderSlides() {
    const wrapper = document.getElementById('slides-wrapper');
    wrapper.replaceChildren();
    slides = slidesData.map((data, index) => {
        const slide = createSlideElement(data, index);
        wrapper.appendChild(slide);
        return slide;
    });
    document.getElementById('total-slides').textContent = String(slides.length);
    document.getElementById('total-slides-label').textContent = String(slides.length).padStart(2, '0');
}

function createSlideElement(data, index) {
    const slide = document.createElement('article');
    slide.className = 'slide';
    slide.dataset.index = String(index);
    slide.setAttribute('aria-label', `Slide ${index + 1}: ${data.title}`);

    if (data.type === 'title') {
        slide.classList.add('slide-title-slide');
        if (isAllowedSlideImage(data.image)) {
            slide.classList.add('has-art');
            const art = document.createElement('div');
            art.className = 'slide-title-art';
            const image = document.createElement('img');
            image.src = slideImageUrl(data.image);
            image.alt = data.imageAlt || `${data.title} illustration`;
            art.appendChild(image);
            slide.appendChild(art);
        }
        const copy = document.createElement('div');
        copy.className = 'slide-title-copy';
        const heading = document.createElement('h2');
        heading.textContent = data.title;
        copy.appendChild(heading);
        if (data.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.textContent = data.subtitle;
            copy.appendChild(subtitle);
        }
        if (data.message) {
            const message = document.createElement('p');
            message.className = 'slide-message';
            message.textContent = data.message;
            copy.appendChild(message);
        }
        slide.appendChild(copy);
        return slide;
    }

    if (data.type === 'image-content' && isAllowedSlideImage(data.image)) {
        slide.classList.add('slide-with-image');
        const imagePanel = document.createElement('div');
        imagePanel.className = 'slide-image';
        const image = document.createElement('img');
        image.src = slideImageUrl(data.image);
        image.alt = `${data.title} illustration`;
        imagePanel.appendChild(image);
        const textPanel = document.createElement('div');
        textPanel.className = 'slide-image-text';
        textPanel.append(createHeading(data.title), createContentList(data.content));
        slide.append(imagePanel, textPanel);
        return slide;
    }

    slide.classList.add('slide-content-slide');
    slide.append(createHeading(data.title), createContentList(data.content));
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
        /^assets\/(?:cover-india-economy|development|history|reforms|sectors|agriculture|industry|services|challenges|public-programs|rural-development|urban-development|sustainability|global-trade)\.svg$/.test(source);
}

function slideImageUrl(source) {
    return new URL(`/${source}`, window.location.origin).href;
}

function showSlide(index) {
    if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === index);
        slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true');
    });

    currentSlide = index;
    document.getElementById('current-slide').textContent = String(index + 1);
    document.getElementById('current-slide-label').textContent = String(index + 1).padStart(2, '0');
    document.querySelector('.slide-btn.prev').disabled = index === 0;
    document.querySelector('.slide-btn.next').disabled = index === slides.length - 1;
    document.querySelectorAll('.indicator-dot').forEach((dot, dotIndex) => {
        if (dotIndex === index) dot.setAttribute('aria-current', 'step');
        else dot.removeAttribute('aria-current');
    });
}

function changeSlide(direction) {
    showSlide(Math.min(slides.length - 1, Math.max(0, currentSlide + direction)));
}

function createIndicators() {
    const indicator = document.getElementById('slide-indicator');
    indicator.replaceChildren();
    slidesData.forEach((data, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'indicator-dot';
        button.textContent = String(index + 1).padStart(2, '0');
        button.setAttribute('aria-label', `Go to slide ${index + 1}: ${data.title}`);
        button.addEventListener('click', () => showSlide(index));
        indicator.appendChild(button);
    });
}

function setupControls() {
    document.querySelector('.slide-btn.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.slide-btn.next').addEventListener('click', () => changeSlide(1));
    document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);
    document.getElementById('print-button').addEventListener('click', printPresentation);
    document.getElementById('download-button').addEventListener('click', downloadSlide);
    document.getElementById('share-button').addEventListener('click', sharePresentation);
    document.addEventListener('fullscreenchange', updateFullscreenButton);
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', event => {
        if (event.target.closest('button, a, input, textarea, select, [contenteditable="true"]')) return;
        if (event.key === 'ArrowRight' || event.key === ' ') {
            changeSlide(1);
            event.preventDefault();
        } else if (event.key === 'ArrowLeft') {
            changeSlide(-1);
            event.preventDefault();
        } else if (event.key.toLowerCase() === 'f') {
            toggleFullscreen();
            event.preventDefault();
        } else if (event.key === 'Home') {
            showSlide(0);
            event.preventDefault();
        } else if (event.key === 'End') {
            showSlide(slides.length - 1);
            event.preventDefault();
        }
    });
}

function setupTouchNavigation() {
    const wrapper = document.getElementById('slides-wrapper');
    let startX = null;
    wrapper.addEventListener('touchstart', event => {
        startX = event.changedTouches[0].screenX;
    }, { passive: true });
    wrapper.addEventListener('touchend', event => {
        if (startX === null) return;
        const distance = startX - event.changedTouches[0].screenX;
        if (Math.abs(distance) > 55) changeSlide(distance > 0 ? 1 : -1);
        startX = null;
    }, { passive: true });
}

function toggleFullscreen() {
    const container = document.querySelector('.demo');
    const action = document.fullscreenElement
        ? document.exitFullscreen?.()
        : container.requestFullscreen?.();
    if (!action) {
        announce('Fullscreen is not available in this browser.');
        return;
    }
    Promise.resolve(action).then(updateFullscreenButton).catch(() => announce('Fullscreen could not be changed.'));
}

function updateFullscreenButton() {
    const button = document.getElementById('fullscreen-button');
    if (button) button.textContent = document.fullscreenElement ? 'Exit fullscreen' : 'Fullscreen';
}

function printPresentation() {
    window.print();
}

function downloadSlide() {
    const data = slidesData[currentSlide];
    if (!data) return;
    const title = escapeHtml(data.title);
    const image = isAllowedSlideImage(data.image)
        ? `<img src="${escapeHtml(slideImageUrl(data.image))}" alt="${title} illustration">`
        : '';
    const content = Array.isArray(data.content)
        ? `<ul>${data.content.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : '';
    const body = data.type === 'title'
        ? `${image}<p class="subtitle">${escapeHtml(data.subtitle || '')}</p>${data.message ? `<p>${escapeHtml(data.message)}</p>` : ''}`
        : `${image}${content}`;
    const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title><style>body{font:18px/1.6 'Segoe UI',Arial,sans-serif;color:#152a35;background:#edf1f2;margin:0;padding:8vw}main{max-width:900px;margin:auto;background:#fbfcfb;padding:3rem}h1{color:#152a35;border-bottom:1px solid #c5d0d2;padding-bottom:1rem;font:500 2.4rem Georgia,serif}li{margin:.7rem 0}img{display:block;max-width:100%;max-height:46vh;object-fit:contain;margin:auto}.subtitle{color:#24566a;font-size:1.15rem}@media(prefers-color-scheme:dark){body{color:#edf2ef;background:#101b21}main{background:#19272f}h1{color:#edf2ef;border-color:#40535b}.subtitle{color:#92bbc7}}@media print{body{padding:0}main{padding:2rem}}</style><main><h1>${title}</h1>${body}</main></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title.replace(/[^\w -]/g, '').trim().replace(/\s+/g, '-') || 'slide'}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce('Current slide saved as an HTML file.');
}

function sharePresentation() {
    const details = {
        title: 'ZeeTeach | Indian Economic Development',
        text: 'Interactive Class XI 2025 presentation on Indian economic development.',
        url: window.location.href
    };
    if (navigator.share) {
        Promise.resolve(navigator.share(details)).then(
            () => announce('Presentation shared.'),
            error => { if (error.name !== 'AbortError') copyShareLink(details.url); }
        );
    } else {
        copyShareLink(details.url);
    }
}

function copyShareLink(url) {
    if (!navigator.clipboard?.writeText) {
        announce(`Copy this link to share: ${url}`);
        return;
    }
    navigator.clipboard.writeText(url).then(
        () => announce('Presentation link copied.'),
        () => announce(`Copy this link to share: ${url}`)
    );
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function announce(message) {
    const status = document.getElementById('action-status');
    if (status) status.textContent = message;
}

document.addEventListener('DOMContentLoaded', initSlideshow);

'use strict';

(() => {
    const query = new URLSearchParams(window.location.search);
    const grade = query.get('grade');
    const syllabus = query.get('syllabus');
    const track = query.get('track');
    const courseStream = document.querySelector('[data-course-stream]');
    if (courseStream && window.location.pathname.startsWith('/humanities/')) {
        courseStream.href = '/humanities';
        courseStream.textContent = 'Humanities';
    }
    if (!['11', '12'].includes(grade) || !['kerala', 'icse', 'cbse'].includes(syllabus)) return;

    document.documentElement.dataset.grade = grade;
    document.documentElement.dataset.syllabus = syllabus;
    if (track === 'plus-one-improvement') {
        document.documentElement.dataset.track = track;
        document.querySelectorAll('[data-track-label]').forEach((node) => {
            node.textContent = 'GRADE +1 IMPROVEMENT';
            node.hidden = false;
        });
    }
    if (grade === '11' && track !== 'plus-one-improvement') {
        document.querySelectorAll('[data-improvement-only]').forEach((card) => {
            card.classList.remove('subject-card-active');
            card.classList.add('subject-card-soon');
            card.removeAttribute('href');
            card.setAttribute('aria-disabled', 'true');
            card.setAttribute('aria-label', 'Economics, coming soon while new books are added');
            const note = card.querySelector('small');
            if (note) note.textContent = 'Coming soon · New books are being added';
            const arrow = card.querySelector('.card-arrow');
            if (arrow) {
                arrow.classList.remove('card-arrow');
                arrow.classList.add('card-lock');
                arrow.textContent = '—';
            }
        });
    }
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
        const destination = new URL(link.getAttribute('href'), window.location.origin);
        if (destination.pathname === '/') return;
        destination.searchParams.set('grade', grade);
        destination.searchParams.set('syllabus', syllabus);
        if (['plus-one-improvement', 'current'].includes(track)) destination.searchParams.set('track', track);
        link.href = `${destination.pathname}${destination.search}${destination.hash}`;
    });
})();

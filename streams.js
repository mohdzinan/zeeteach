'use strict';

(() => {
    const query = new URLSearchParams(window.location.search);
    const grade = query.get('grade') === '12' ? '12' : '11';
    const syllabusNames = { kerala: 'Kerala Syllabus', icse: 'ICSE', cbse: 'CBSE' };
    const syllabus = syllabusNames[query.get('syllabus')] ? query.get('syllabus') : 'kerala';
    const gradeName = grade === '12' ? 'Class XII' : 'Class XI';
    const gradeYear = `CLASS ${grade === '12' ? 'XII' : 'XI'} · 2025`;

    document.querySelectorAll('[data-grade-syllabus]').forEach((node) => {
        node.textContent = `${gradeName} · ${syllabusNames[syllabus]}`;
    });
    document.querySelectorAll('[data-grade-year]').forEach((node) => { node.textContent = gradeYear; });
    document.documentElement.dataset.grade = grade;
    document.documentElement.dataset.syllabus = syllabus;
    document.title = `${gradeName} · ${syllabusNames[syllabus]} · Choose your stream | ZeeTeach`;

    document.querySelectorAll('[data-stream-link]').forEach((link) => {
        if (grade === '12') {
            link.classList.remove('stream-card-active');
            link.classList.add('stream-card-soon');
            link.removeAttribute('href');
            link.setAttribute('aria-disabled', 'true');
            link.setAttribute('aria-label', `${link.querySelector('strong').textContent}, coming later for Plus Two`);
            const subtitle = link.querySelector('small');
            if (subtitle) subtitle.textContent = 'Coming later for Plus Two';
            const arrow = link.querySelector('.card-arrow');
            if (arrow) {
                arrow.classList.remove('card-arrow');
                arrow.classList.add('card-lock');
                arrow.textContent = '—';
            }
            return;
        }

        const destination = new URL(link.dataset.streamLink, window.location.origin);
        destination.searchParams.set('grade', grade);
        destination.searchParams.set('syllabus', syllabus);
        link.href = `${destination.pathname}${destination.search}`;
    });
})();

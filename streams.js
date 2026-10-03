'use strict';

(() => {
    const query = new URLSearchParams(window.location.search);
    const grade = query.get('grade') === '12' ? '12' : '11';
    const syllabusNames = { kerala: 'Kerala Syllabus', icse: 'ICSE', cbse: 'CBSE' };
    const syllabus = syllabusNames[query.get('syllabus')] ? query.get('syllabus') : 'kerala';
    const track = ['plus-one-improvement', 'current'].includes(query.get('track')) ? query.get('track') : '';
    const trackLabel = track === 'plus-one-improvement' ? ' · Grade +1 Improvement' : track === 'current' ? ' · Current' : '';
    const gradeName = `${grade === '12' ? 'Class XII' : 'Class XI'}${trackLabel}`;
    const gradeYear = `CLASS ${grade === '12' ? 'XII' : 'XI'} · 2025${track === 'plus-one-improvement' ? ' · GRADE +1 IMPROVEMENT' : track === 'current' ? ' · CURRENT' : ''}`;

    document.querySelectorAll('[data-grade-syllabus]').forEach((node) => {
        node.textContent = `${gradeName} · ${syllabusNames[syllabus]}`;
    });
    document.querySelectorAll('[data-grade-year]').forEach((node) => { node.textContent = gradeYear; });
    document.querySelectorAll('[data-step]').forEach((node) => { node.textContent = track ? 'STEP 4 OF 4' : 'STEP 3 OF 3'; });
    document.documentElement.dataset.grade = grade;
    document.documentElement.dataset.syllabus = syllabus;
    document.title = `${gradeName} · ${syllabusNames[syllabus]} · Choose your stream | ZeeTeach`;

    document.querySelectorAll('[data-stream-link]').forEach((link) => {
        if (grade === '12' || syllabus !== 'kerala') {
            const comingLaterFor = grade === '12' ? 'Plus Two' : syllabusNames[syllabus];
            link.classList.remove('stream-card-active');
            link.classList.add('stream-card-soon');
            link.removeAttribute('href');
            link.setAttribute('aria-disabled', 'true');
            link.setAttribute('aria-label', `${link.querySelector('strong').textContent}, coming later for ${comingLaterFor}`);
            const subtitle = link.querySelector('small');
            if (subtitle) subtitle.textContent = `Coming later for ${comingLaterFor}`;
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
        if (track) destination.searchParams.set('track', track);
        link.href = `${destination.pathname}${destination.search}`;
    });
})();

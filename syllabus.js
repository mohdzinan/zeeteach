'use strict';

(() => {
    const query = new URLSearchParams(window.location.search);
    const grade = query.get('grade') === '12' ? '12' : '11';
    const track = ['plus-one-improvement', 'current'].includes(query.get('track')) ? query.get('track') : '';
    const trackLabel = track === 'plus-one-improvement' ? ' · Grade +1 Improvement' : track === 'current' ? ' · Current' : '';
    const gradeName = `${grade === '12' ? 'Plus Two · Class XII' : 'Plus One · Class XI'}${trackLabel}`;
    const gradeYear = `CLASS ${grade === '12' ? 'XII' : 'XI'} · 2025${track === 'plus-one-improvement' ? ' · GRADE +1 IMPROVEMENT' : track === 'current' ? ' · CURRENT' : ''}`;

    document.querySelectorAll('[data-grade-label]').forEach((node) => { node.textContent = gradeName; });
    document.querySelectorAll('[data-grade-year]').forEach((node) => { node.textContent = gradeYear; });
    document.querySelectorAll('[data-step]').forEach((node) => { node.textContent = track ? 'STEP 3 OF 4' : 'STEP 2 OF 3'; });
    document.querySelectorAll('[data-syllabus]').forEach((link) => {
        const destination = new URL('/streams', window.location.origin);
        destination.searchParams.set('grade', grade);
        destination.searchParams.set('syllabus', link.dataset.syllabus);
        if (track) destination.searchParams.set('track', track);
        link.href = `${destination.pathname}${destination.search}`;
    });
    document.title = `${gradeName} · Choose your syllabus | ZeeTeach`;
})();

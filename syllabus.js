'use strict';

(() => {
    const query = new URLSearchParams(window.location.search);
    const grade = query.get('grade') === '12' ? '12' : '11';
    const gradeName = grade === '12' ? 'Plus Two · Class XII' : 'Plus One · Class XI';
    const gradeYear = grade === '12' ? 'CLASS XII · 2025' : 'CLASS XI · 2025';

    document.querySelectorAll('[data-grade-label]').forEach((node) => { node.textContent = gradeName; });
    document.querySelectorAll('[data-grade-year]').forEach((node) => { node.textContent = gradeYear; });
    document.querySelectorAll('[data-syllabus]').forEach((link) => {
        const destination = new URL('/streams', window.location.origin);
        destination.searchParams.set('grade', grade);
        destination.searchParams.set('syllabus', link.dataset.syllabus);
        link.href = `${destination.pathname}${destination.search}`;
    });
    document.title = `${gradeName} · Choose your syllabus | ZeeTeach`;
})();

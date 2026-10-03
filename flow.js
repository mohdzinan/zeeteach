'use strict';

(() => {
    const query = new URLSearchParams(window.location.search);
    const grade = query.get('grade');
    const syllabus = query.get('syllabus');
    const track = query.get('track');
    if (!['11', '12'].includes(grade) || !['kerala', 'icse', 'cbse'].includes(syllabus)) return;

    document.documentElement.dataset.grade = grade;
    document.documentElement.dataset.syllabus = syllabus;
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
        const destination = new URL(link.getAttribute('href'), window.location.origin);
        if (destination.pathname === '/') return;
        destination.searchParams.set('grade', grade);
        destination.searchParams.set('syllabus', syllabus);
        if (['plus-one-improvement', 'current'].includes(track)) destination.searchParams.set('track', track);
        link.href = `${destination.pathname}${destination.search}${destination.hash}`;
    });
})();

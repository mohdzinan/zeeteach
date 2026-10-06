'use strict';

(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const root = document.documentElement;

    function applySystemTheme(isDark) {
        const theme = isDark ? 'dark' : 'light';
        root.dataset.theme = theme;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = isDark ? '#101b21' : '#edf1f2';
    }

    applySystemTheme(media.matches);
    const handleChange = event => applySystemTheme(event.matches);
    if (media.addEventListener) media.addEventListener('change', handleChange);
    else media.addListener(handleChange);
})();

'use strict';

(() => {
    const preferenceKey = 'zeeteach-theme';
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    let savedPreference = null;

    try {
        const stored = window.localStorage.getItem(preferenceKey);
        if (stored === 'light' || stored === 'dark') savedPreference = stored;
    } catch (_) {
        // If storage is unavailable, keep the page in sync with the system setting.
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === 'dark' ? '#191f1b' : '#f2eee5';
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            const nextTheme = theme === 'dark' ? 'light' : 'dark';
            const label = button.querySelector('.theme-label');
            if (label) label.textContent = nextTheme === 'dark' ? 'Dark' : 'Light';
            button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
            button.setAttribute('aria-pressed', String(theme === 'dark'));
        });
        document.querySelectorAll('[data-theme-system]').forEach((button) => {
            button.hidden = savedPreference === null;
        });
    }

    applyTheme(savedPreference || (media.matches ? 'dark' : 'light'));

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.addEventListener('click', () => {
                savedPreference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                try { window.localStorage.setItem(preferenceKey, savedPreference); } catch (_) { /* Session-only choice. */ }
                applyTheme(savedPreference);
            });
        });
        document.querySelectorAll('[data-theme-system]').forEach((button) => {
            button.addEventListener('click', () => {
                savedPreference = null;
                try { window.localStorage.removeItem(preferenceKey); } catch (_) { /* System choice still applies for this visit. */ }
                applyTheme(media.matches ? 'dark' : 'light');
            });
        });
        applyTheme(document.documentElement.dataset.theme);
    });

    const onSystemChange = (event) => {
        if (savedPreference === null) applyTheme(event.matches ? 'dark' : 'light');
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else media.addListener(onSystemChange);
})();

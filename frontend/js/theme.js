import { renderIcons } from './icons.js';

function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    return next;
}

function updateThemeIcon(iconEl, theme) {
    iconEl.dataset.icon = theme === 'dark' ? 'light_mode' : 'dark_mode';
    renderIcons(iconEl.parentElement);
}

export { initTheme, toggleTheme, updateThemeIcon };
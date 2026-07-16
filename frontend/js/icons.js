const ICONS = {
    hub: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="9.5" y1="10" x2="5.5" y2="7.2"/><line x1="14.5" y1="10" x2="18.5" y2="7.2"/><line x1="9.5" y1="14" x2="5.5" y2="16.8"/><line x1="14.5" y1="14" x2="18.5" y2="16.8"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
    dark_mode: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
    light_mode: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/><line x1="4.2" y1="4.2" x2="6" y2="6"/><line x1="18" y1="18" x2="19.8" y2="19.8"/><line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/><line x1="4.2" y1="19.8" x2="6" y2="18"/><line x1="18" y1="6" x2="19.8" y2="4.2"/></svg>`,
    home: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>`,
    login: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M3 12h13"/><path d="M12 8l4 4-4 4"/></svg>`,
    app_registration: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/><path d="M21 12H8"/><path d="M15 8l4 4-4 4"/></svg>`,
    favorite: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.7-9C.9 8 2 4.8 5 3.8c2-.6 4 .2 5 2 1-1.8 3-2.6 5-2 3 1 4.1 4.2 2.7 7.7-2.2 4.4-9.7 9-9.7 9z"/></svg>`,
    favorite_filled: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 20.5s-7.5-4.6-9.7-9C.9 8 2 4.8 5 3.8c2-.6 4 .2 5 2 1-1.8 3-2.6 5-2 3 1 4.1 4.2 2.7 7.7-2.2 4.4-9.7 9-9.7 9z"/></svg>`,
    chat_bubble: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5z"/></svg>`,
    visibility: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
    visibility_off: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a15.6 15.6 0 0 1-3.4 4.3"/><path d="M6.6 6.6C3.5 8.5 1.5 12 1.5 12s3.5 7 10.5 7c1.3 0 2.5-.2 3.6-.6"/><path d="M9.5 9.7a3 3 0 0 0 4.2 4.2"/></svg>`,
    person_add: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>`,
};

function renderIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(el => {
        const name = el.dataset.icon;
        if (ICONS[name]) el.innerHTML = ICONS[name];
    });
}

export { renderIcons, ICONS };
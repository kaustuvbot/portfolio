// ==================== EXPERIENCE TAB NAVIGATION ====================

(function () {
    const expTabs = document.querySelectorAll('.exp-tab');
    const expPanels = document.querySelectorAll('.exp-panel');

    if (!expTabs.length) return;

    expTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const index = tab.dataset.index;

            // Update tabs
            expTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update panels
            expPanels.forEach(p => p.classList.remove('active'));
            const target = document.getElementById('exp-panel-' + index);
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // Keyboard navigation (arrow keys)
    expTabs.forEach((tab, i) => {
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const next = expTabs[i + 1] || expTabs[0];
                next.click();
                next.focus();
            }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = expTabs[i - 1] || expTabs[expTabs.length - 1];
                prev.click();
                prev.focus();
            }
        });
    });
})();

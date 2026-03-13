// ==================== CHEATSHEET LIVE SEARCH ====================

(function () {
    const searchInput = document.getElementById('cheatsheet-search');
    const clearButton = document.getElementById('cheatsheet-search-clear');
    const status = document.getElementById('cheatsheet-search-status');
    const cards = Array.from(document.querySelectorAll('.cheat-card'));
    const sections = Array.from(document.querySelectorAll('.cheatsheet-section'));

    if (!searchInput || !cards.length || !sections.length) return;

    const cardIndexes = cards.map((card) => {
        const section = card.closest('.cheatsheet-section');
        const sectionTitle = section ? (section.querySelector('.section-title')?.textContent || '') : '';
        const sectionKicker = section ? (section.querySelector('.cheatsheet-kicker')?.textContent || '') : '';
        const cardTitle = card.querySelector('.cheat-card-title')?.textContent || '';
        const cardCopy = card.querySelector('.cheat-card-copy')?.textContent || '';
        const items = Array.from(card.querySelectorAll('.cheat-item')).map((item) => {
            const itemText = [
                sectionTitle,
                sectionKicker,
                cardTitle,
                cardCopy,
                item.querySelector('.cheat-command')?.textContent || '',
                item.querySelector('.cheat-description')?.textContent || '',
                item.querySelector('.cheat-note')?.textContent || '',
            ].join(' ').toLowerCase();

            return { element: item, text: itemText };
        });

        return { element: card, section, items };
    });

    function isEditableTarget(target) {
        if (!target) return false;
        if (target.isContentEditable) return true;
        const tag = target.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    }

    function setStatus(query, visibleItems) {
        if (!status) return;

        if (!query) {
            status.textContent = 'Showing all commands.';
            return;
        }

        if (!visibleItems) {
            status.textContent = `No commands found for "${query}".`;
            return;
        }

        status.textContent = `${visibleItems} command${visibleItems === 1 ? '' : 's'} found for "${query}".`;
    }

    function applySearch(rawQuery) {
        const query = rawQuery.trim().toLowerCase();
        let visibleItems = 0;

        cardIndexes.forEach(({ element, items }) => {
            let cardHasVisibleItems = false;

            items.forEach(({ element: item, text }) => {
                const matches = !query || text.includes(query);
                item.hidden = !matches;
                if (matches) {
                    cardHasVisibleItems = true;
                    visibleItems += 1;
                }
            });

            element.hidden = !cardHasVisibleItems;
        });

        sections.forEach((section) => {
            const hasVisibleCard = Array.from(section.querySelectorAll('.cheat-card')).some((card) => !card.hidden);
            const sectionMeta = section.querySelector('.cheatsheet-section-head');
            section.hidden = !hasVisibleCard;
            if (sectionMeta) {
                sectionMeta.hidden = !hasVisibleCard;
            }
        });

        document.body.classList.toggle('search-active', Boolean(query));
        document.body.classList.toggle('search-empty', Boolean(query) && visibleItems === 0);
        setStatus(rawQuery.trim(), visibleItems);
    }

    searchInput.addEventListener('input', () => {
        applySearch(searchInput.value);
    });

    clearButton?.addEventListener('click', () => {
        searchInput.value = '';
        applySearch('');
        searchInput.focus();
    });

    document.addEventListener('keydown', (event) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
        if (event.key.length !== 1 || /\s/.test(event.key)) return;
        if (isEditableTarget(event.target)) return;

        searchInput.focus();

        const start = searchInput.selectionStart ?? searchInput.value.length;
        const end = searchInput.selectionEnd ?? searchInput.value.length;
        const nextValue = `${searchInput.value.slice(0, start)}${event.key}${searchInput.value.slice(end)}`;

        searchInput.value = nextValue;
        const nextCaret = start + event.key.length;
        searchInput.setSelectionRange(nextCaret, nextCaret);
        applySearch(nextValue);
        event.preventDefault();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchInput.value = '';
            applySearch('');
            searchInput.blur();
        }
    });

    applySearch('');
})();

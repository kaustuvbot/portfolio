// ==================== CHEATSHEET LIVE SEARCH ====================

(function () {
    const searchInput = document.getElementById('cheatsheet-search');
    const clearButton = document.getElementById('cheatsheet-search-clear');
    const status = document.getElementById('cheatsheet-search-status');
    const cards = Array.from(document.querySelectorAll('.cheat-card'));
    const sections = Array.from(document.querySelectorAll('.cheatsheet-section'));
    let lastQuery = '';
    const termAliases = {
        deploy: ['deployment', 'deployments', 'rollout', 'rollouts', 'replicaset'],
        deployment: ['deploy', 'deployments', 'rollout', 'rollouts', 'replicaset'],
        deployments: ['deploy', 'deployment', 'rollout', 'rollouts', 'replicaset'],
        deployement: ['deploy', 'deployment', 'deployments', 'rollout', 'rollouts', 'replicaset'],
        rollout: ['deployment', 'deployments', 'deploy', 'replicaset'],
        rollouts: ['deployment', 'deployments', 'deploy', 'replicaset'],
        pod: ['pods', 'container', 'containers'],
        pods: ['pod', 'container', 'containers'],
        image: ['images', 'tag', 'registry', 'docker'],
        images: ['image', 'tag', 'registry', 'docker'],
        service: ['services', 'svc', 'ingress', 'endpoint'],
        services: ['service', 'svc', 'ingress', 'endpoint'],
        svc: ['service', 'services'],
        namespace: ['namespaces', 'ns'],
        namespaces: ['namespace', 'ns'],
        ns: ['namespace', 'namespaces'],
        config: ['configmap', 'configmaps', 'secret', 'secrets'],
        configmap: ['config', 'configmaps'],
        configmaps: ['config', 'configmap'],
        secret: ['secrets', 'config'],
        secrets: ['secret', 'config'],
        compose: ['docker', 'container', 'containers'],
        container: ['containers', 'docker', 'pod', 'pods'],
        containers: ['container', 'docker', 'pod', 'pods'],
        branch: ['branches', 'git', 'switch', 'checkout'],
        branches: ['branch', 'git', 'switch', 'checkout'],
        commit: ['commits', 'git', 'staging', 'history'],
        commits: ['commit', 'git', 'staging', 'history'],
        log: ['logs', 'history'],
        logs: ['log', 'history'],
        volume: ['volumes', 'storage'],
        volumes: ['volume', 'storage'],
    };

    if (!searchInput || !cards.length || !sections.length) return;

    function normalizeText(value) {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function expandToken(token) {
        const variants = new Set([token]);

        if (token.endsWith('s') && token.length > 3) {
            variants.add(token.slice(0, -1));
        } else if (token.length > 3) {
            variants.add(`${token}s`);
        }

        (termAliases[token] || []).forEach((alias) => variants.add(alias));
        return Array.from(variants);
    }

    function tokenize(value) {
        return normalizeText(value).split(/\s+/).filter(Boolean);
    }

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
            ].join(' ');
            const tokens = tokenize(itemText);
            const expandedTokens = new Set(tokens);
            tokens.forEach((token) => {
                expandToken(token).forEach((variant) => expandedTokens.add(variant));
            });

            return {
                element: item,
                text: normalizeText(itemText),
                tokens: Array.from(expandedTokens),
            };
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

    function scrollToFirstVisibleResult(query) {
        if (!query) return;

        const firstVisibleCard = cardIndexes.find(({ element }) => !element.hidden)?.element;
        if (!firstVisibleCard) return;

        const rect = firstVisibleCard.getBoundingClientRect();
        const headerOffset = 88;
        const alreadyVisible = rect.top >= headerOffset && rect.bottom <= window.innerHeight;

        if (!alreadyVisible) {
            const top = rect.top + window.scrollY - headerOffset;
            window.scrollTo({
                top: Math.max(top, 0),
                behavior: 'smooth'
            });
        }
    }

    function applySearch(rawQuery) {
        const query = normalizeText(rawQuery);
        const queryTokens = tokenize(rawQuery).map((token) => expandToken(token));
        let visibleItems = 0;

        cardIndexes.forEach(({ element, items }) => {
            let cardHasVisibleItems = false;

            items.forEach(({ element: item, text, tokens }) => {
                const matches = !query || queryTokens.every((tokenGroup) =>
                    tokenGroup.some((token) =>
                        text.includes(token) || tokens.some((itemToken) => itemToken.includes(token))
                    )
                );
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

        if (query && query !== lastQuery && visibleItems > 0) {
            scrollToFirstVisibleResult(query);
        }

        lastQuery = query;
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

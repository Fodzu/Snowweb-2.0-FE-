document.getElementById('sidebarToggle').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleLine = document.getElementById('sidebarToggle');

    sidebar.classList.toggle('collapsed');

    const isCollapsed = sidebar.classList.contains('collapsed');
    toggleLine.style.left = isCollapsed ? '80px' : '320px';
});

document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
document.querySelector('.btn-Additem').addEventListener('click', function() {
    window.location.href = 'itemadd.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const itemsBtn = document.getElementById('itemsBtn');
    const itemCardsContainer = document.getElementById('itemCardsContainer');
    const mainContent = document.querySelector('.main-content');

    itemsBtn.addEventListener('click', function() {
        // Toggle the visibility of the item cards container
        if (itemCardsContainer.style.display === 'none') {
            itemCardsContainer.style.display = 'grid';
            // Optionally, you might want to adjust the main content's padding
            // mainContent.style.paddingBottom = '20px' + (itemCardsContainer.offsetHeight + 40) + 'px';
        } else {
            itemCardsContainer.style.display = 'none';
            // Reset the main content's padding if adjusted
            // mainContent.style.paddingBottom = '40px';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const itemsBtn = document.getElementById('itemsBtn');
    const itemCardsContainer = document.getElementById('itemCardsContainer');
    const backendUrl = 'http://localhost:8081';

    itemsBtn.addEventListener('click', function() {
        itemCardsContainer.innerHTML = '';
        itemCardsContainer.style.display = 'grid';

        // Render skeleton cards
        for (let i = 0; i < 4; i++) {
            const skeletonCard = document.createElement('div');
            skeletonCard.classList.add('item-card', 'skeleton-card');
            skeletonCard.innerHTML = `
                <div class="item-icon-area skeleton-icon"></div>
                <div class="item-details">
                    <h3 class="item-name skeleton-text skeleton-text-long"></h3>
                    <p class="item-amount skeleton-text skeleton-text-medium"></p>
                    <p class="item-value skeleton-text skeleton-text-short"></p>
                </div>
            `;
            itemCardsContainer.appendChild(skeletonCard);
        }

        fetch(`${backendUrl}/api/items`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                itemCardsContainer.innerHTML = '';

                data.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('item-card');
                    card.innerHTML = `
                        <div class="item-icon-area">
                            ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name || 'Item Icon'}" loading="lazy">` : `<div class="item-icon">${item.name ? item.name.charAt(0).toUpperCase() : '?'}</div>`}
                        </div>
                        <div class="item-details">
                            <h3 class="item-name">${item.name || 'Unnamed Item'}</h3>
                            ${item.quantity ? `<p class="item-amount">Found: ${item.quantity}</p>` : ''}
                            ${item.value ? `<p class="item-value">Worth: ${item.value}</p>` : ''}
                        </div>
                    `;

                    card.addEventListener('click', function() {
                        console.log('Item being passed to openItemViewer:', item);
                        openItemViewer(item);
                        const currentlyExpanded = document.querySelector('.item-card.expanded');
                        if (currentlyExpanded && currentlyExpanded !== card) {
                            currentlyExpanded.classList.remove('expanded');
                        }

                        card.classList.toggle('expanded');
                    });

                    itemCardsContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                itemCardsContainer.innerHTML = '<p>Failed to load items.</p>';
            });
    });
});

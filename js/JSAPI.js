// noinspection t

document.addEventListener('DOMContentLoaded', function() {
    const itemsBtn = document.getElementById('itemsBtn');
    const itemCardsContainer = document.getElementById('itemCardsContainer');
    const backendUrl = 'snowbase-production.up.railway.app:8080';

    itemsBtn.addEventListener('click', function() {
        if (itemCardsContainer.style.display === 'none') {
            fetch(`${backendUrl}/api/items`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    itemCardsContainer.innerHTML = ''; // Clear any existing content

                    if (data && Array.isArray(data)) {
                        data.forEach(item => {
                            const card = document.createElement('div');
                            card.classList.add('item-card');

                            const iconArea = document.createElement('div');
                            iconArea.classList.add('item-icon-area');
                            const icon = document.createElement('div');
                            icon.classList.add('item-icon');
                            icon.textContent = item.imageUrl ? '' : (item.name ? item.name.charAt(0).toUpperCase() : '?'); // Placeholder if no image
                            if (item.imageUrl) {
                                const img = document.createElement('img');
                                img.src = item.imageUrl;
                                img.alt = item.name || 'Item Icon';
                                icon.appendChild(img);
                                icon.style.backgroundColor = 'transparent'; // Remove background if image exists
                            } else {
                                icon.style.backgroundColor = '#555'; // Default background for placeholder
                            }
                            iconArea.appendChild(icon);

                            const details = document.createElement('div');
                            details.classList.add('item-details');
                            const name = document.createElement('h3');
                            name.classList.add('item-name');
                            name.textContent = item.name || 'Unnamed Item';
                            const description = document.createElement('p');
                            description.classList.add('item-description');
                            description.textContent = item.description || 'No description provided.';

                            details.appendChild(name);
                            details.appendChild(description);

                            card.appendChild(iconArea);
                            card.appendChild(details);

                            itemCardsContainer.appendChild(card);
                        });
                        itemCardsContainer.style.display = 'grid';
                    } else {
                        itemCardsContainer.innerHTML = '<p>No items found.</p>';
                        itemCardsContainer.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error fetching items:', error);
                    itemCardsContainer.innerHTML = '<p>Failed to load items.</p>';
                    itemCardsContainer.style.display = 'block';
                });
        } else {
            itemCardsContainer.style.display = 'none';
        }
    });
});
document.getElementById('sidebarToggle').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleLine = document.getElementById('sidebarToggle');

    sidebar.classList.toggle('collapsed');

    const isCollapsed = sidebar.classList.contains('collapsed');
    toggleLine.style.left = isCollapsed ? '80px' : '320px';
});


document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = 'wintersWiki.html';
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




document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const backendUrl = 'https://snowbase-production.up.railway.app';

    const newItem = {
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        imageUrl: document.getElementById('itemImageUrl').value,
        quantity: parseInt(document.getElementById('itemQuantity').value),
        value: parseInt(document.getElementById('itemValue').value)
    };

    // Debugging: Print the new item data to the console
    console.log('Submitting new item:', newItem);

    fetch(`${backendUrl}/api/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
        .then(response => {
            if (response.ok) {
                alert('Item added successfully!');
                document.getElementById('itemForm').reset();
            } else {
                alert('Failed to add item.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding item.');
        });
});



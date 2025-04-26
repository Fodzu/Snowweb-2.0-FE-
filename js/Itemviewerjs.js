function openItemViewer(itemData) {
    document.getElementById('viewerImage').src = itemData.imageUrl || '';
    document.getElementById('viewerName').textContent = itemData.name || 'Unnamed Item';
    document.getElementById('viewerDescription').textContent = itemData.description || 'No description';
    document.getElementById('viewerExtra').textContent = itemData.extra || '';

    const viewer = document.getElementById('itemViewer');
    viewer.classList.remove('hidden');
    viewer.classList.add('show'); // Ensure visibility is toggled with CSS classes

    // Initially show details and hide edit form
    document.getElementById('viewerDetails').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';

    // Store item data for editing
    viewer.dataset.itemId = itemData.id;
    viewer.dataset.itemName = itemData.name;
    viewer.dataset.itemDescription = itemData.description;
    viewer.dataset.itemImageUrl = itemData.imageUrl;
    viewer.dataset.itemQuantity = itemData.quantity;
    viewer.dataset.itemValue = itemData.value;
}

document.getElementById('viewerClose').addEventListener('click', closeItemViewer);

function closeItemViewer() {
    const viewer = document.getElementById('itemViewer');
    viewer.classList.add('hidden'); // Hide the viewer
    viewer.classList.remove('show');
}

document.getElementById('itemViewer').addEventListener('click', function (e) {
    if (e.target === this) {
        closeItemViewer(); // Close viewer if the background is clicked
    }
});

// Edit button functionality
document.getElementById('editBtn').addEventListener('click', () => {
    // Hide details and show the edit form
    document.getElementById('viewerDetails').style.display = 'none';
    document.getElementById('editForm').style.display = 'block';

    // Populate edit form with current item data
    const viewer = document.getElementById('itemViewer');
    document.getElementById('editItemId').value = viewer.dataset.itemId;
    document.getElementById('editName').value = viewer.dataset.itemName;
    document.getElementById('editDescription').value = viewer.dataset.itemDescription || '';
    document.getElementById('editImageUrl').value = viewer.dataset.itemImageUrl || '';
    document.getElementById('editQuantity').value = viewer.dataset.itemQuantity || '';
    document.getElementById('editValue').value = viewer.dataset.itemValue || '';
});

// Submit edited item functionality
document.getElementById('submitEditBtn').addEventListener('click', (event) => {
    const backendUrl = 'https://snowbase-production.up.railway.app'; // Backend URL
    event.preventDefault();

    // Get the updated item data from the form
    const itemId = document.getElementById('editItemId').value;
    const name = document.getElementById('editName').value;
    const description = document.getElementById('editDescription').value;
    const imageUrl = document.getElementById('editImageUrl').value;
    const quantity = document.getElementById('editQuantity').value;
    const value = document.getElementById('editValue').value;

    const updatedItem = { name, description, imageUrl, quantity, value };

    // Send the updated data to the backend
    fetch(`${backendUrl}/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Item updated:', data);
            closeItemViewer();
            // Refresh the item list
            document.getElementById('itemsBtn').click();
        })
        .catch(error => {
            console.error('Error updating item:', error);
            // Display an error message to the user
        });
});

// Delete button functionality
document.getElementById('deleteBtn').addEventListener('click', () => {
    const itemId = document.getElementById('itemViewer').dataset.itemId;
    const itemName = document.getElementById('itemViewer').dataset.itemName;
    const backendUrl = 'https://snowbase-production.up.railway.app'; // Backend URL

    // Confirm deletion
    if (confirm(`Are you sure you want to delete ${itemName}?`)) {
        fetch(`${backendUrl}/api/items/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Item deleted:', itemId);
                    closeItemViewer();
                    // Refresh the item list
                    document.getElementById('itemsBtn').click();
                } else {
                    alert('Failed to delete item.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting item.');
            });
    }
});

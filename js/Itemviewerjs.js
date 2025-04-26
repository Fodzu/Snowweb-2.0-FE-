document.addEventListener('DOMContentLoaded', function () {
    function openItemViewer(Item) {
        document.getElementById('viewerImage').src = Item.imageUrl || '';
        document.getElementById('viewerName').textContent = Item.name || 'Unnamed Item';
        document.getElementById('viewerDescription').textContent = Item.description || 'No description';
        document.getElementById('viewerExtra').textContent = Item.extra || '';

        const viewer = document.getElementById('itemViewer');
        viewer.classList.remove('hidden');
        viewer.classList.add('show'); // Ensure visibility is toggled with CSS classes

        // Initially show details and hide edit form
        document.getElementById('viewerDetails').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';

        // Store item data for editing
        viewer.dataset.itemId = Item.id;
        viewer.dataset.itemName = Item.name;
        viewer.dataset.itemDescription = Item.description;
        viewer.dataset.itemImageUrl = Item.imageUrl;
        viewer.dataset.itemQuantity = Item.quantity;
        viewer.dataset.itemValue = Item.value;
    }

    const viewerClose = document.getElementById('viewerClose');
    if (viewerClose) {
        viewerClose.addEventListener('click', closeItemViewer);
    }

    function closeItemViewer() {
        const viewer = document.getElementById('itemViewer');
        viewer.classList.add('hidden'); // Hide the viewer
        viewer.classList.remove('show');
    }

    const itemViewer = document.getElementById('itemViewer');
    if (itemViewer) {
        itemViewer.addEventListener('click', function (e) {
            if (e.target === this) {
                closeItemViewer(); // Close viewer if the background is clicked
            }
        });
    }

    // Edit button functionality
    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
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
    }

    // Submit edited item functionality
    const submitEditBtn = document.getElementById('submitEditBtn');
    if (submitEditBtn) {
        submitEditBtn.addEventListener('click', (event) => {
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
                });
        });
    }

    // Delete button functionality
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
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
    }
});

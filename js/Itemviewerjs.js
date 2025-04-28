// Define the openItemViewer function outside the DOMContentLoaded listener so it's globally accessible
function openItemViewer(item) {
    document.getElementById('viewerImage').src = item.imageUrl || '';
    document.getElementById('viewerName').textContent = item.name || 'Unnamed item';
    document.getElementById('viewerDescription').textContent = item.description || 'No description';
    document.getElementById('viewerExtra').textContent = item.extra || '';

    const viewer = document.getElementById('itemViewer');
    viewer.dataset.itemId = item.id;
    viewer.classList.remove('hidden');
    viewer.classList.add('show'); // Ensure visibility is toggled with CSS classes

    // Initially show details and hide edit form
    document.getElementById('viewerDetails').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';

    // Store item data for editing
    viewer.dataset.itemId = item.id;
    viewer.dataset.itemName = item.name;
    viewer.dataset.itemDescription = item.description;
    viewer.dataset.itemImageUrl = item.imageUrl;
    viewer.dataset.itemQuantity = item.quantity;
    viewer.dataset.itemValue = item.value;
}

// Wait for the DOM to be fully loaded before attaching other event listeners
document.addEventListener('DOMContentLoaded', function () {
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
            const viewer = document.getElementById('itemViewer');
            const itemId = viewer.dataset.itemId;

            const editUrl = `edititemForm.html?id=${itemId}`; // Only pass the ID
            console.log('ItemViewer Dataset before reading itemId:', viewer.dataset); // Add this line

            window.location.href = editUrl;
        });
    }
    // Delete button functionality
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const itemId = document.getElementById('itemViewer').dataset.itemId;
            const itemName = document.getElementById('itemViewer').dataset.itemName;
            const backendUrl = 'https://snowbase-production.up.railway.app';

            // Confirm deletion
            if (confirm(`Are you sure you want to delete ${itemName}?`)) {
                fetch(`${backendUrl}/api/items/${itemId}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('item deleted:', itemId);
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

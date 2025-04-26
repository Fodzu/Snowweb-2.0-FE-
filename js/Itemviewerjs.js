function openItemViewer(itemData) {
    document.getElementById('viewerImage').src = itemData.imageUrl;
    document.getElementById('viewerName').textContent = itemData.name;
    document.getElementById('viewerDescription').textContent = itemData.description;
    document.getElementById('viewerExtra').textContent = itemData.extra;

    const viewer = document.getElementById('itemViewer');
    viewer.classList.remove('hidden');
    viewer.classList.add('show');
}

document.getElementById('viewerClose').addEventListener('click', closeItemViewer);

function closeItemViewer() {
    const viewer = document.getElementById('itemViewer');
    viewer.classList.add('hidden');
    viewer.classList.remove('show');
}
document.getElementById('itemViewer').addEventListener('click', function(e) {
    if (e.target === this) {
        closeItemViewer();
    }
});

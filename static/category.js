let currentBooks = [];

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');
    const container = document.getElementById('books-container');
    const titleElement = document.getElementById('category-title');
    const sortSelect = document.getElementById('sort-select');

    if (!categoryId) {
        container.innerHTML = '<p>No category selected.</p>';
        return;
    }

    try {
        // Fetch all books and filter client-side
        const response = await fetch('/books/getAllBooksWithRating');
        const books = await response.json();
        
        // Filter books by the category ID from URL
        const filteredBooks = books.filter(book => book.CATEGORY_ID == categoryId);
        currentBooks = filteredBooks;

        if (filteredBooks.length > 0) {
            // Update title with the category name from the first book found
            titleElement.textContent = `Browse Books: ${filteredBooks[0].CATEGORY_NAME}`;
            renderBooks(currentBooks);
        } else {
            container.innerHTML = '<p>No books found in this category.</p>';
        }
    } catch (error) {
        console.error('Error loading books:', error);
        container.innerHTML = '<p>Error loading books.</p>';
    }

    // Sort Event Listener
    sortSelect.addEventListener('change', () => {
        const criteria = sortSelect.value;
        let sortedBooks = [...currentBooks];

        if (criteria === 'rating') {
            // Sort by rating descending
            sortedBooks.sort((a, b) => (Number(b.avg_rate) || 0) - (Number(a.avg_rate) || 0));
        } else if (criteria === 'date') {
            // Sort by ID descending (Newest first)
            sortedBooks.sort((a, b) => b.BOOK_ID - a.BOOK_ID);
        }
        
        renderBooks(sortedBooks);
    });
});

function renderBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.IMAGE_URL || 'https://via.placeholder.com/200x300'}" alt="${book.BOOK_NAME}">
            <h3>${book.BOOK_NAME}</h3>
            <div class="rating">★ ${book.avg_rate ? Number(book.avg_rate).toFixed(1) : 'N/A'} Rating</div>
            <button onclick="window.location.href='book_details.html?id=${book.BOOK_ID}'" style="margin-top: 10px; padding: 5px 10px; cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 4px;">View Details</button>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const titleQuery = urlParams.get('title');
    
    const titleInput = document.getElementById('search-title');
    const authorInput = document.getElementById('search-author');
    const categorySelect = document.getElementById('category-select');
    const searchBtn = document.querySelector('.search-btn');

    // Load categories into dropdown
    await loadCategories();

    // Pre-fill and search if URL param exists
    if (titleQuery) {
        titleInput.value = titleQuery;
        await performSearch(titleQuery);
    }

    // Handle manual search button click
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submit refresh
        performSearch(titleInput.value, authorInput.value, categorySelect.value);
    });
});

async function loadCategories() {
    try {
        const response = await fetch('/categories/');
        const categories = await response.json();
        const select = document.getElementById('category-select');
        
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.CATEGORY_ID;
            option.textContent = cat.CATEGORY_NAME;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function performSearch(title, author, category) {
    const container = document.getElementById('results-container');
    // Allow search if at least one field is filled
    if (!title && !author && !category) return;
    
    container.innerHTML = '<p style="text-align:center; width:100%;">Searching...</p>';

    try {
        // Construct query params
        const params = new URLSearchParams();
        if (title) params.append('book_title', title);
        if (author) params.append('author', author);
        if (category) params.append('my_categories', category);

        const response = await fetch(`/books/search?${params.toString()}`);
        const books = await response.json();
        
        container.innerHTML = '';
        if (books.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100%;">No books found.</p>';
            return;
        }

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <img src="${book.IMAGE_URL || 'https://via.placeholder.com/150'}" alt="${book.BOOK_NAME}">
                <h3>${book.BOOK_NAME}</h3>
                <p class="rating">★ ${book.avg_rate ? Number(book.avg_rate).toFixed(1) : 'N/A'}</p>
                <button onclick="window.location.href='book_details.html?id=${book.BOOK_ID}'" style="padding:5px 10px; margin-top:10px; cursor:pointer;">View Details</button>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p style="text-align:center; width:100%;">Error loading results.</p>';
    }
}

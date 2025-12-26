// Function to fetch data from the API
async function loadBooks() {
    try {
        const response = await fetch('/books/getAllBooksWithRating');
        const books = await response.json();
        console.log(books);

        const container = document.getElementById('books-container');
        container.innerHTML = ''; // Clear loading state
        
        // Group books by Category Name
        const booksByCategory = {};
        books.forEach(book => {
            const catName = book.CATEGORY_NAME || 'Uncategorized';
            if (!booksByCategory[catName]) {
                booksByCategory[catName] = [];
            }
            booksByCategory[catName].push(book);
        });

        // Iterate over categories and create sections
        for (const [categoryName, categoryBooks] of Object.entries(booksByCategory)) {
            // Create Section Container
            const section = document.createElement('div');
            section.className = 'category-section';

            // Get Category ID from the first book in the list for the link
            const catId = categoryBooks[0].CATEGORY_ID;
            
            section.innerHTML = `
                <div class="category-header">
                    <h2>${categoryName}</h2>
                    <a href="category.html?id=${catId}" class="see-more-btn">See More</a>
                </div>
                <div class="books-grid"></div>
            `;

            const grid = section.querySelector('.books-grid');

            // Add up to 5 books
            categoryBooks.slice(0, 5).forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card';
                card.innerHTML = `
                    <img src="${book.IMAGE_URL || 'https://via.placeholder.com/150'}" alt="${book.BOOK_NAME}">
                    <h3>${book.BOOK_NAME}</h3>
                    <p class="rating">★ ${book.avg_rate ? Number(book.avg_rate).toFixed(1) : 'N/A'}</p>
                    <button onclick="window.location.href='book_details.html?id=${book.BOOK_ID}'">View Details</button>
                `;
                grid.appendChild(card);
            });

            container.appendChild(section);
        }
    } catch (error) {
        console.error('Error loading books:', error);
        document.getElementById('books-container').innerHTML = '<p>Error loading data.</p>';
    }
}

function handleNavSearch() {
    const query = document.getElementById('nav-search').value;
    if (query.trim()) {
        window.location.href = `advanced_search.html?title=${encodeURIComponent(query)}`;
    }
}

// Execute when the page loads
document.addEventListener('DOMContentLoaded', loadBooks);

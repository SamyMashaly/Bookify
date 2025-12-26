document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');
    
    if (!bookId) {
        document.getElementById('book-title').textContent = 'No Book Selected';
        return;
    }

    try {
        // Fetch all books to find the specific one
        const response = await fetch('/books/getAllBooksWithRating');
        const books = await response.json();
        const book = books.find(b => b.BOOK_ID == bookId);

        if (book) {
            document.getElementById('book-cover').src = book.IMAGE_URL || 'https://via.placeholder.com/250x350';
            document.getElementById('book-title').textContent = book.BOOK_NAME;
            document.getElementById('book-author').textContent = `Author: ${book.AUTHOR || 'Unknown'}`;
            document.getElementById('book-category').textContent = `Category: ${book.CATEGORY_NAME || 'Unknown'}`;
            document.getElementById('book-rating').textContent = `★ Rating: ${book.avg_rate ? Number(book.avg_rate).toFixed(1) : 'N/A'} / 5 stars`;
            document.getElementById('book-description').textContent = book.DESCRIBTION || 'No description available.';
        } else {
            document.getElementById('book-title').textContent = 'Book Not Found';
            document.querySelector('.book-details').innerHTML = '<p>The requested book details could not be loaded.</p>';
        }

        // Load existing reviews
        loadReviews(bookId);

    } catch (error) {
        console.error('Error fetching book details:', error);
    }

    // Handle Review Submission
    document.getElementById('review-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewer-name').value;
        const rate = document.getElementById('review-rate').value;
        const review = document.getElementById('review-text').value;

        if (!name || !review) {
            alert("Please fill in all fields");
            return;
        }

        const payload = {
            user_name: name,
            book_id: parseInt(bookId),
            review: review,
            rate: parseInt(rate)
        };

        try {
            const res = await fetch('/reviews/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('Review added successfully!');
                document.getElementById('review-form').reset();
                loadReviews(bookId); // Refresh reviews list
            } else {
                alert('Failed to add review.');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Error submitting review.');
        }
    });
});

async function loadReviews(bookId) {
    const container = document.getElementById('reviews-container');
    container.innerHTML = '<p>Loading reviews...</p>';
    
    try {
        const res = await fetch(`/reviews/getBookReviews/${bookId}`);
        const reviews = await res.json();
        console.log("Reviews data:", reviews); // Debugging: Check console to see actual keys
        
        container.innerHTML = '';
        
        if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
            container.innerHTML = '<p>No reviews yet. Be the first!</p>';
            return;
        }

        reviews.forEach(r => {
            // Handle potential case sensitivity issues from DB (e.g., RATE vs rate)
            const userName = r.User_Name || r.user_name || r.USER_NAME || 'Anonymous';
            const rating = r.rate || r.RATE || r.Rate || '?';
            const comment = r.review || r.REVIEW || r.Review || '';

            const card = document.createElement('div');
            card.className = 'review-card';
            // Using User_Name and rate from the database columns
            card.innerHTML = `
                <div class="review-header">${userName} (Rating: ${rating}/5):</div>
                <div>${comment}</div>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p>Error loading reviews.</p>';
    }
}

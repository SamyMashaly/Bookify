async function loadCategories() {
    try {
        // Fetch categories from the backend. 
        // Ensure you have an endpoint like '/categories' that returns a JSON list of categories.
        const response = await fetch('/categories'); 
        const categories = await response.json();
        
        const container = document.getElementById('categories-container');
        
        categories.forEach(category => {
            const card = document.createElement('a');
            card.className = 'category-card';
            // Link to the specific category page, passing the ID
            card.href = `category.html?id=${category.CATEGORY_ID}`;
            
            // Use a placeholder image if one isn't provided in the database
            // Assuming the database has columns: CATEGORY_NAME, CATEGORY_ID
            // If you have an image column, replace 'null' with category.IMAGE_URL
            
            // Normalize name for lookup (lowercase and trim)
            const normalizedName = (category.CATEGORY_NAME || '').toLowerCase().trim();
            
            // Fixed images for your specific categories
            const categoryImages = {
                'fiction & classics': 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=500&q=80',
                'sci-fi & fantasy': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80',
                'mystery & thriller': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80',
                'biography & history': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&q=80',
                'technology & science': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
                'self-improvement & business': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80'
            };

            // Use the fixed image if defined, otherwise fallback to DB image or placeholder
            const imageUrl = categoryImages[normalizedName] || category.IMAGE_URL || 'https://via.placeholder.com/400x300?text=Category';

            card.innerHTML = `
                <img src="${imageUrl}" class="category-image" alt="${category.CATEGORY_NAME}">
                <div class="category-name">${category.CATEGORY_NAME}</div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        document.getElementById('categories-container').innerHTML = '<p style="text-align:center">Error loading categories.</p>';
    }
}

function handleNavSearch() {
    const query = document.getElementById('nav-search').value;
    if (query.trim()) {
        window.location.href = `advanced_search.html?title=${encodeURIComponent(query)}`;
    }
}

document.addEventListener('DOMContentLoaded', loadCategories);

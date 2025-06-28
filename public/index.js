// Reusable function to fetch and render data
function fetchAndRender(url, sectionId, template, callback = () => {}) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.innerHTML = template(data);
                callback(); // Execute callback after rendering
            } else {
                console.error(`Section with ID ${sectionId} not found`);
            }
        })
        .catch(error => console.error(`Error fetching ${sectionId} data:`, error.message));
}

// Fetch random image from Foodish API
async function fetchFoodishImage() {
    try {
        const response = await fetch('https://foodish-api.com/api/');
        const data = await response.json();
        return data.image;
    } catch (error) {
        console.error('Foodish API fetch failed:', error);
        return 'images/placeholder.jpg';
    }
}

// Track favorite recipe IDs locally
let favorites = new Set();

// Fetch initial data and render categories with Foodish
async function fetchInitialData() {
    const categoriesData = await fetch('https://daily-delights-website.onrender.com/categories')
        .then(res => res.json())
        .catch(() => []);
    const imageUrl = await fetchFoodishImage();
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
        categoriesSection.innerHTML = categoriesData.length ? `
            <h2>Dive into the World of Flavors</h2>
            <p>Dive into the world of flavors with our diverse categories...</p>
            <div id="foodish-content">
                <h3>Food Inspiration</h3>
                <img src="${imageUrl}" alt="Random food image" class="foodish-image">
                <button id="refresh-foodish">Refresh Image</button>
            </div>
            ${categoriesData.map(category => `
                <div id="${category.category}">
                    <h4>${category.title}</h4>
                    <p>${category.description}</p>
                    ${category.recipes.map(recipe => `
                        <div class="recipe">
                            <h4>${recipe.title}</h4>
                            <p>${recipe.description}</p>
                            <img src="${recipe.image || 'images/placeholder.jpg'}" alt="${recipe.title}" class="recipe-image">
                            <h5>Ingredients</h5>
                            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                            <h5>Instructions</h5>
                            <ol>${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ol>
                            <p><strong>Prep Time:</strong> ${recipe.prepTime} | <strong>Cook Time:</strong> ${recipe.cookTime} | <strong>Servings:</strong> ${recipe.servings}</p>
                            <p><em>Tip:</em> ${recipe.tip}</p>
                            <span class="favorite-heart" data-recipe-id="${recipe.id}" style="cursor: pointer; font-size: 24px; color: black;" role="button" aria-label="Toggle favorite for ${recipe.title}">♥</span>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
            <input type="text" id="recipeSearch" placeholder="Search recipes...">
            <button id="darkMode">Toggle Dark Mode</button>
        ` : '<p>No categories data available. Check the server.</p>';

        // Attach event listeners
        document.getElementById('refresh-foodish')?.addEventListener('click', async () => {
            const imageUrl = await fetchFoodishImage();
            document.querySelector('#foodish-content img').src = imageUrl;
        });
        document.getElementById('darkMode')?.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
        document.getElementById('recipeSearch')?.addEventListener('input', filterRecipes);
    } else {
        console.error('Categories section not found');
    }

    function filterRecipes(e) {
        const searchTerm = e.target.value.toLowerCase();
        const recipes = document.querySelectorAll('.recipe');
        recipes.forEach(recipe => {
            const title = recipe.querySelector('h4').textContent.toLowerCase();
            recipe.style.display = searchTerm ? (title.includes(searchTerm) ? 'block' : 'none') : 'block';
        });
    }
}

// Toggle favorite status and sync with json-server
async function toggleFavorite(recipeId, recipeTitle, category) {
    const isFavorite = favorites.has(recipeId);
    console.log('Toggling favorite:', { recipeId, recipeTitle, category, isFavorite });
    try {
        if (isFavorite) {
            favorites.delete(recipeId);
            const response = await fetch(`https://daily-delights-website.onrender.com/favorites/${recipeId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Delete failed');
            console.log('Favorite deleted:', recipeId);
        } else {
            favorites.add(recipeId);
            const response = await fetch('https://daily-delights-website.onrender.com/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: recipeId, title: recipeTitle, category: category }),
            });
            if (!response.ok) throw new Error('Add failed');
            console.log('Favorite added:', { recipeId, recipeTitle, category });
        }
        renderFavorites();
    } catch (error) {
        console.error('Favorite operation failed:', error.message);
    }
    const heart = document.querySelector(`.favorite-heart[data-recipe-id="${recipeId}"]`);
    if (heart) heart.style.color = !isFavorite ? 'red' : 'black';
}

// Render favorites in cookbook
async function renderFavorites() {
    try {
        const response = await fetch('https://daily-delights-website.onrender.com/favorites');
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        console.log('Favorites data:', data);
        const favoriteDiv = document.getElementById('favorite');
        if (favoriteDiv) {
            favoriteDiv.innerHTML = `
                <h3>Cherished Family Favorites</h3>
                ${data.length > 0 ? data.map(fav => `
                    <div class="favorite-title">
                        <a href="#${fav.category}">${fav.title}</a>
                    </div>
                `).join('') : '<p>No favorites yet!</p>'}
            `;
        } else {
            console.warn('Favorite div not found in DOM');
        }
    } catch (error) {
        console.error('Favorites fetch failed:', error.message);
    }
}

// Event listener for DOM content loading
document.addEventListener('DOMContentLoaded', () => {
    // Render Home section
    fetchAndRender('https://daily-delights-website.onrender.com/learning', 'home', data => `
        <h2>Savor the Magic of Everyday Meals</h2>
        <p>Unleash your inner chef with recipes and tips...</p>
        <div class="learning-content">
            <h3>Learn to Cook with Daily Delights</h3>
            <p>Mastering the art of cooking with expert guidance...</p>
            <ul>
                ${data.map(item => `<li><a href="#${item.section}">${item.title}</a></li>`).join('')}
            </ul>
            ${data.map(item => `
                <div id="${item.section}">
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                </div>
            `).join('')}
        </div>
    `);

    // Render About section
    fetchAndRender('https://daily-delights-website.onrender.com/about', 'about', data => `
        <h2>Our Story: Crafting Daily Delights</h2>
        ${data.map(item => `<p>${item.content}</p>`).join('')}
    `);

    // Render Cookbook section with favorites
    fetchAndRender('https://daily-delights-website.onrender.com/cookbook', 'cookbook', data => `
        <h2>Curate Your Perfect Cookbook</h2>
        <p>Curate your perfect cookbook with recipes that reflect your journey...</p>
        <div id="favorite"></div>
    `, renderFavorites); // Render favorites after Cookbook

    // Initial categories fetch (between Cookbook and Shop)
    fetchInitialData();

    // Render Shop section
    fetchAndRender('https://daily-delights-website.onrender.com/shop', 'shop', data => `
        <h2>Discover Our Kitchen Goodies</h2>
        <p>${data[0].description}</p>
        <ul>
            ${data[0].items.map(item => `
                <li><strong>${item.name}</strong> - $${item.price}<p>${item.description}</p></li>
            `).join('')}
        </ul>
        <img src="https://i.pinimg.com/736x/fd/11/42/fd1142f40a8eee585a2cb36b94569f3e.jpg" alt="Shop decoration 2" class="shop-decoration">
        <img src="https://i.pinimg.com/736x/67/b4/ae/67b4aeda3d7503ec2f749ffa12608a2c.jpg" alt="Shop decoration 3" class="shop-decoration">
        <img src="https://i.pinimg.com/736x/10/5a/a2/105aa216193627fb6443d2babc457fe4.jpg" alt="Shop decoration 4" class="shop-decoration">
    `);

    // Render Footer section
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: <a href="mailto:info@dailydelights.com">info@dailydelights.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </div>
                <div class="footer-section sitemap">
                    <h4>Sitemap</h4>
                    <ul>
                        <li><a href="#">Ingredients</a></li>
                        <li><a href="#">Recipes</a></li>
                        <li><a href="#">Expert Advice</a></li>
                    </ul>
                </div>
                <div class="footer-section social">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <p class="copyright">© 2025 Daily Delights. All rights reserved.</p>
        `;
    } else {
        console.error('Footer section not found');
    }

    // Event listener for favorite heart clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-heart')) {
            const recipeId = e.target.getAttribute('data-recipe-id');
            const recipe = e.target.closest('.recipe');
            const recipeTitle = recipe.querySelector('h4').textContent;
            const category = e.target.closest('[id]').id;
            toggleFavorite(recipeId, recipeTitle, category);
        }
    });
});
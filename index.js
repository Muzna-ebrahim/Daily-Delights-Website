// Select all anchor elements whose href starts with "#" for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Reusable function to fetch and render data
function fetchAndRender(url, sectionId, template) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById(sectionId).innerHTML = template(data);
        })
        .catch(error => console.error(`Error fetching ${sectionId} data:`, error));
}

// Fetch random image from Foodish API
async function fetchFoodishImage() {
    try {
        const response = await fetch('https://foodish-api.com/api/');
        const data = await response.json();
        return data.image; // Returns URL like https://foodish-api.com/images/pizza/pizza1.jpg
    } catch (error) {
        console.error('Foodish API fetch failed:', error);
        return 'images/placeholder.jpg'; // Fallback image
    }
}

// Track favorite recipe IDs locally (sync with json-server)
let favorites = new Set();

// Fetch initial data and render categories with Foodish
async function fetchInitialData() {
    const categoriesData = await fetch('http://localhost:3000/categories').then(res => res.json());
    const imageUrl = await fetchFoodishImage();
    document.getElementById('categories').innerHTML = `
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
                    <div class="recipe" style="display: block;">
                        <h4>${recipe.title}</h4>
                        <p>${recipe.description}</p>
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
    `;

    // Attach event listeners after rendering
    const darkModeButton = document.getElementById('darkMode');
    if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
    }
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    const searchInput = document.getElementById('recipeSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterRecipes);
    }
    function filterRecipes(e) {
        const searchTerm = e.target.value.toLowerCase();
        const recipes = document.querySelectorAll('.recipe');
        recipes.forEach(recipe => {
            const title = recipe.querySelector('h4').textContent.toLowerCase();
            recipe.style.display = searchTerm ? (title.includes(searchTerm) ? 'block' : 'none') : 'block';
        });
    }

    const refreshButton = document.getElementById('refresh-foodish');
    if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
            const imageUrl = await fetchFoodishImage();
            document.querySelector('#foodish-content img').src = imageUrl;
        });
    }
}

// Toggle favorite status and sync with json-server
function toggleFavorite(recipeId, recipeTitle, category) {
    const isFavorite = favorites.has(recipeId);
    console.log('Toggling favorite:', { recipeId, recipeTitle, category, isFavorite }); // Debug log
    if (isFavorite) {
        favorites.delete(recipeId);
        fetch(`http://localhost:3000/favorites/${recipeId}`, {
            method: 'DELETE',
        })
        .then(() => console.log('Favorite deleted:', recipeId))
        .catch(error => console.error('Delete favorite failed:', error));
    } else {
        favorites.add(recipeId);
        fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: recipeId, title: recipeTitle, category: category }),
        })
        .then(response => {
            console.log('Favorite added:', { recipeId, recipeTitle, category });
            return response.json();
        })
        .catch(error => console.error('Add favorite failed:', error));
    }
    renderFavorites();
    const heart = document.querySelector(`.favorite-heart[data-recipe-id="${recipeId}"]`);
    if (heart) {
        heart.style.color = !isFavorite ? 'red' : 'black';
    }
}

// Render favorites in cookbook
function renderFavorites() {
    fetch('http://localhost:3000/favorites')
        .then(response => response.json())
        .then(data => {
            console.log('Favorites data:', data); // Debug log
            document.getElementById('favorite').innerHTML = `
                <h3>Cherished Family Favorites</h3>
                ${data.length > 0 ? data.map(fav => `
                    <div class="favorite-title">
                        <a href="#${fav.category}">${fav.title}</a>
                    </div>
                `).join('') : '<p>No favorites yet!</p>'}
            `;
        })
        .catch(error => console.error('Favorites fetch failed:', error));
}

// Event listener for DOM content loading
document.addEventListener('DOMContentLoaded', () => {
    // Render Home section
    fetchAndRender('http://localhost:3000/learning', 'home', data => `
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
    fetchAndRender('http://localhost:3000/about', 'about', data => `
        <h2>Our Story: Crafting Daily Delights</h2>
        ${data.map(item => `<p>${item.content}</p>`).join('')}
    `);

    // Initial categories fetch
    fetchInitialData();

    // Render Cookbook section with favorites
    fetchAndRender('http://localhost:3000/cookbook', 'cookbook', data => `
        <h2>Curate Your Perfect Cookbook</h2>
        <p>Curate your perfect cookbook with recipes that reflect your journey...</p>
        <div id="favorite"></div>
    `);

    // Render Shop section with decoration images
    fetchAndRender('http://localhost:3000/shop', 'shop', data => `
        <h2>Discover Our Kitchen Goodies</h2>
        <p>${data[0].description}</p>
        <ul>
            ${data[0].items.map(item => `
                <li><strong>${item.name}</strong> - $${item.price}<p>${item.description}</p></li>
            `).join('')}
        </ul>
        <img src="https://i.pinimg.com/736x/0f/64/8a/0f648a264b8179e13a7c6ff540da4e4f.jpg" alt="Shop decoration 1" class="shop-decoration">
        <img src="https://i.pinimg.com/736x/fd/11/42/fd1142f40a8eee585a2cb36b94569f3e.jpg" alt="Shop decoration 2" class="shop-decoration" style="margin-top: 20px;">
        <img src="https://i.pinimg.com/736x/67/b4/ae/67b4aeda3d7503ec2f749ffa12608a2c.jpg" alt="Shop decoration 3" class="shop-decoration" style="margin-top: 20px;">
        <img src="https://i.pinimg.com/736x/10/5a/a2/105aa216193627fb6443d2babc457fe4.jpg" alt="Shop decoration 4" class="shop-decoration" style="margin-top: 20px;">
    `);

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

    // Initial render of favorites
    renderFavorites();
});
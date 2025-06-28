# Daily Delights

## DESCRIPTION
This project is a client-side recipe management application designed to help users explore, curate, and enjoy a variety of culinary delights. It offers an inviting interface to view detailed recipes, toggle favorites, and discover cooking tips, all powered by a local `json-server` to simulate a backend API. This setup allows for easy testing and demonstration of front-end interactions without requiring a full server infrastructure.

## FEATURES
1. **Culinary Categories**: Dive into cakes, cookies, bread, and main meals with richly detailed recipes.
2. **Personalized Favorites**: Toggle your favorite recipes and explore them in the "Cherished Family Favorites" section.
3. **Live Content**: Seamlessly fetches data from a local `json-server` API for a dynamic experience.
4. **Theme Versatility**: Switch effortlessly between light and dark themes to suit your mood.
5. **Smart Search**: Filter recipes by name with an intuitive search tool.
6. **Inspirational Imagery**: Displays random food images with a refreshing option to spark creativity.

## TECHNOLOGIES USED
1. **HTML5**: Provides the foundational structure and semantic layout of the web page.
2. **CSS3**: Styles the application, delivering a clean, modern, and responsive user interface with dark mode support.
3. **JavaScript (ES6+)**: Powers all interactive elements and dynamic content management, including:
   - Fetching and displaying data from the `json-server`.
   - Handling favorite toggling and local storage updates.
   - Managing UI visibility (e.g., theme switching, search filtering).
   - Rendering recipe details and inspirational images.
4. **JSON Server**: A lightweight, command-line tool used to create a fake REST API, serving as the "backend" for this project.

## HOW TO RUN THIS PROJECT
To get **Daily Delights** up and running on your machine, follow these steps:

### 1. Project Setup
- **Save Files**: Ensure you have `index.html`, `index.js`, `style.css`, and a `db.json` file (as provided below) all in the same directory.
- **Create db.json**: In your project's root directory, create a file named `db.json` and paste the following content into it. This will be your initial recipe data.

### JSON
```json
{
    "about": [
        {
            "id": 1,
            "title": "Our Story: Crafting Daily Delights:",
            "content": "My journey began with the joy of fulfilling orders, cooking hearty meals and baking treats with care for those who trusted my hands. Daily Delights is my heartfelt tribute, a legacy of love baked into every recipe, inviting you to taste the passion behind each bite."
        }
    ],
    "learning": [
        {
            "id": 1,
            "section": "basics",
            "title": "Seasoning Secrets Unveiled:",
            "content": "Unlock the true power of flavor. This section reveals the art of seasoning, showing you how to perfectly balance and layer spices, herbs, and salts. Transform your dishes from good to extraordinary with simple, intentional additions."
        },
        {
            "id": 2,
            "section": "baking",
            "title": "Baking with Alternative Flours:",
            "content": "Step into a versatile world of baking beyond traditional grains! Here at Daily Delights, we demystify baking with alternative flours, guiding you through the unique properties of options like almond, oat, and coconut flour. Learn how to adapt recipes, achieve perfect textures, and infuse your baked goods with exciting new flavors, opening up a whole new realm of delicious possibilities for your kitchen."
        },
        {
            "id": 3,
            "section": "tips",
            "title": "Quick Meal Prep Tricks:",
            "content": "Transform your cooking routine and reclaim your precious time with Daily Delights' clever meal prep tricks! Discover smart strategies for efficient chopping, batch cooking, and savvy storage that will streamline your kitchen work. Learn how simple planning can lead to stress-free weeknights, ensuring you always have delicious, homemade meals ready when hunger strikes. Get ready to revolutionize your approach to everyday eating!"
        }
    ],
    "categories": [
        {
            "id": 1,
            "category": "cakes-cookies",
            "title": "Delightful Dessert Creations:",
            "description": "Unleash your inner pastry chef with delightful dessert creations, featuring easy recipes for cakes, cookies, and more to sweeten your daily life.",
            "recipes": [
                {
                    "id": 1,
                    "title": "Chocolate Chip Cookie Bliss",
                    "description": "A classic, gooey cookie packed with chocolate chips—perfect for a sweet treat any time of day!",
                    "image": "images/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg",
                    "ingredients": [
                        "1 cup all-purpose flour",
                        "1/2 cup butter, softened",
                        "1/2 cup brown sugar",
                        "1 egg",
                        "1 cup chocolate chips",
                        "1/2 tsp baking soda",
                        "1/4 tsp salt"
                    ],
                    "instructions": [
                        "Preheat oven to 350°F (175°C) and line a baking sheet with parchment paper.",
                        "Cream butter and brown sugar in a bowl until smooth.",
                        "Beat in the egg, then mix in flour, baking soda, and salt.",
                        "Fold in chocolate chips and drop spoonfuls onto the baking sheet.",
                        "Bake for 10-12 minutes until edges are golden. Let cool and enjoy!"
                    ],
                    "prepTime": "15 minutes",
                    "cookTime": "12 minutes",
                    "servings": "12 cookies",
                    "tip": "Add a pinch of sea salt on top for a gourmet touch!"
                }
            ]
        },
        {
            "id": 2,
            "category": "bread",
            "title": "Artisan Bread Delights",
            "description": "Master the art of bread-making with artisan bread delights, featuring rustic recipes and simple techniques to fill your home with warm, delicious aromas.",
            "recipes": [
                {
                    "id": 2,
                    "title": "Classic Artisan Bread",
                    "description": "A crusty, flavorful loaf perfect for any meal, baked with love and simple ingredients.",
                    "image": "images/download.jpeg",
                    "ingredients": [
                        "3 cups all-purpose flour",
                        "1 1/2 cups water",
                        "1 tsp salt",
                        "1/2 tsp yeast"
                    ],
                    "instructions": [
                        "Mix flour, salt, and yeast in a bowl. Add water and stir until a shaggy dough forms.",
                        "Cover and let rise for 12-18 hours at room temperature.",
                        "Preheat oven to 450°F (230°C) with a Dutch oven inside.",
                        "Shape dough, place in the hot Dutch oven, and bake covered for 30 minutes, then uncovered for 15 minutes.",
                        "Cool and enjoy the rustic flavor!"
                    ],
                    "prepTime": "20 minutes",
                    "cookTime": "45 minutes",
                    "servings": "1 loaf",
                    "tip": "Add herbs like rosemary for extra aroma!"
                }
            ]
        },
        {
            "id": 3,
            "category": "main-meals",
            "title": "Flavorful Meal Highlights",
            "description": "Elevate your dinner table with our standout main meal recipes, bursting with bold flavors and simple preparation tips to make every bite a delight.",
            "recipes": [
                {
                    "id": 3,
                    "title": "Chicken Stir-Fry Delight",
                    "description": "A quick and colorful main meal packed with tender chicken, crisp vegetables, and a savory sauce—perfect for a weeknight win!",
                    "image": "images/chicken-stir-fry-index-65130392700bf.avif",
                    "ingredients": [
                        "2 boneless chicken breasts, sliced",
                        "1 cup broccoli florets",
                        "1 bell pepper, sliced",
                        "2 tbsp soy sauce",
                        "1 tbsp olive oil",
                        "1 tsp garlic, minced",
                        "Salt and pepper to taste"
                    ],
                    "instructions": [
                        "Heat olive oil in a large skillet over medium heat.",
                        "Add minced garlic and sauté for 1 minute until fragrant.",
                        "Stir in chicken slices, cooking until browned (about 5-7 minutes).",
                        "Add broccoli and bell pepper, stirring for 3-4 minutes until crisp-tender.",
                        "Pour in soy sauce, season with salt and pepper, and cook for another 2 minutes.",
                        "Serve hot and enjoy your flavorful stir-fry!"
                    ],
                    "prepTime": "10 minutes",
                    "cookTime": "15 minutes",
                    "servings": "2-3",
                    "tip": "Add a sprinkle of sesame seeds or chili flakes for extra flavor!"
                }
            ]
        }
    ],
    "cookbook": [
        {
            "id": 1,
            "title": "Curate Your Perfect Cookbook",
            "content": "Curate your perfect cookbook with recipes that reflect your journey, blending my love for crafting meals and baked goods into a personalized treasure trove of daily delights."
        },
        {
            "id": 2,
            "section": "favorite",
            "title": "Cherished Family Favorites",
            "content": "Discover cherished family favorites, a collection of beloved recipes passed down and perfected through my years of cooking and baking for those I love, now shared with you."
        }
    ],
    "shop": [
        {
            "id": 1,
            "title": "Discover Our Kitchen Goodies",
            "description": "Discover our kitchen goodies featuring premium baking essentials, flavorful spices, and fresh ingredients to elevate your daily recipes.",
            "items": [
                {
                    "id": 1,
                    "name": "Premium Almond Flour",
                    "price": 8.99,
                    "description": "High-quality almond flour for gluten-free baking."
                },
                {
                    "id": 2,
                    "name": "Organic Spices Set",
                    "price": 12.5,
                    "description": "A set of organic spices to enhance your dishes."
                },
                {
                    "id": 3,
                    "name": "Fresh Baking Yeast",
                    "price": 3.25,
                    "description": "Perfect for artisan bread and dough recipes."
                }
            ]
        }
    ],
    "favorites": [
        {
            "id": 1,
            "title": "Chocolate Chip Cookie Bliss",
            "category": "cakes-cookies"
        },
        {
            "id": 2,
            "title": "Classic Artisan Bread",
            "category": "bread"
        },
        {
            "id": 3,
            "title": "Chicken Stir-Fry Delight",
            "category": "main-meals"
        }
    ]
}
```
2. Install JSON Server
Open your terminal or command prompt.

Install json-server globally using npm (Node Package Manager). If you don't have Node.js and npm installed, you'll need to do that first.

Bash

npm install -g json-server
3. Start the JSON Server
Navigate to your project's root directory in the terminal (where db.json is located).

Run the following command to start the JSON server on port 3000:

Bash

json-server --watch db.json --port 3000
You should see output indicating that your db.json file is being served, typically at http://localhost:3000/Posts. Your index.js file is configured to fetch data from this exact endpoint.

4. Open the Application
- Simply open the index.html file in your preferred web browser.
- The application will load, and you'll see your blog posts displayed, fetched directly from the running json-server.

## MY CODE STRUCTURE:
1. index.html: The foundational HTML document that structures the entire application. It defines the main layout, including the header, sections for recipe categories, cookbook, shop, and footer.
2. style.css: Contains all the styling rules for the application. It covers general resets, defines the layout for responsiveness, styles various UI elements like buttons and recipe cards, and includes dark mode support.
3. index.js: The core JavaScript file responsible for all dynamic functionalities. It manages:
Data Fetching: Communicates with the json-server to retrieve and update recipe data.
DOM Manipulation: Dynamically creates and updates HTML elements to display recipes and favorites.
Event Handling: Listens for user interactions such as clicking favorite hearts, toggling dark mode, and filtering recipes.
Application Logic: Contains functions (e.g., fetchAndRender, toggleFavorite, renderFavorites) that control the flow and behavior of the recipe manager.
4. db.json: (User-provided, not part of the codebase but essential for running) This file acts as the "database" for json-server, storing recipe data in a JSON format.



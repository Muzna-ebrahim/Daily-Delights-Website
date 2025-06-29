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

## CONTRIBUTIONS:
Feel free to explore the code, suggest improvements, or submit pull requests. Any contributions that enhance functionality or user experience are welcome!

## LICENSE:
This project is open-source and available under the MIT License.

## AUTHOR:
This project was created by Muzna Ebrahim Mohamed.
Email; ebrahimmuznah98@gmail.com



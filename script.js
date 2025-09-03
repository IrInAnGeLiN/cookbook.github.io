const recipes = [
    {
        title: "Bruschetta",
        country: "Italy",
        content: "Bruschetta: \nIngredients: Baguette, tomatoes, garlic, basil, olive oil, salt. \nInstructions: Toast the baguette slices, rub with garlic, top with diced tomatoes, basil, olive oil, and salt."
    },
    {
        title: "Ceviche",
        country: "Peru",
        content: "Ceviche: \nIngredients: Fresh fish, lime juice, onion, cilantro, chili. \nInstructions: Marinate the fish in lime juice, mix with chopped onion, cilantro, and chili."
    },
    {
        title: "Baba Ghanoush",
        country: "Middle East",
        content: "Baba Ghanoush: \nIngredients: Eggplant, tahini, garlic, lemon juice, olive oil. \nInstructions: Roast the eggplant, blend with tahini, garlic, lemon juice, and olive oil."
    },
    {
        title: "Paella",
        country: "Spain",
        content: "Paella: \nIngredients: Rice, saffron, chicken, seafood, bell peppers. \nInstructions: Cook the rice with saffron, add chicken and seafood, and simmer."
    },
    {
        title: "Butter Chicken",
        country: "India",
        content: "Butter Chicken: \nIngredients: Chicken, butter, cream, tomato sauce, spices. \nInstructions: Cook the chicken in spices, add tomato sauce and cream, simmer."
    },
    {
        title: "Bulgogi",
        country: "Korea",
        content: "Bulgogi: \nIngredients: Beef, soy sauce, garlic, sugar, sesame oil. \nInstructions: Marinate the beef in soy sauce, garlic, sugar, and sesame oil, then grill."
    },
    {
        title: "Tiramisu",
        country: "Italy",
        content: "Tiramisu: \nIngredients: Mascarpone, coffee, ladyfingers, cocoa powder. \nInstructions: Layer mascarpone with coffee-soaked ladyfingers, and dust with cocoa powder."
    },
    {
        title: "Mochi",
        country: "Japan",
        content: "Mochi: \nIngredients: Glutinous rice, sugar, cornstarch. \nInstructions: Steam glutinous rice, mash, and shape into balls with sugar and cornstarch."
    },
    {
        title: "Baklava",
        country: "Middle East",
        content: "Baklava: \nIngredients: Phyllo dough, nuts, honey, butter. \nInstructions: Layer phyllo with nuts, butter, and honey, then bake until golden."
    },
    {
        title: "Masala Chai",
        country: "India",
        content: "Masala Chai: \nIngredients: Tea leaves, milk, spices (ginger, cardamom, cloves). \nInstructions: Boil water with spices, add tea leaves, then mix with milk."
    },
    {
        title: "Hot Chocolate",
        country: "Mexico",
        content: "Hot Chocolate: \nIngredients: Cocoa powder, sugar, milk, vanilla. \nInstructions: Mix cocoa powder and sugar with hot milk, add vanilla."
    },
    {
        title: "Glühwein",
        country: "Germany",
        content: "Glühwein: \nIngredients: Red wine, spices (cinnamon, cloves), orange slices. \nInstructions: Heat red wine with spices and orange slices."
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', searchRecipes);
    }
});


function searchRecipes(event) {
    event.preventDefault(); // Prevent form submission
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Find recipes that match the search term
    const matchingRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.content.toLowerCase().includes(searchTerm) ||
        recipe.country.toLowerCase().includes(searchTerm)
    );

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear existing content

    if (matchingRecipes.length === 0) {
        searchResults.innerHTML = '<p>No recipes found matching that search term.</p>';
        return;
    }

    const ul = document.createElement('ul');
    matchingRecipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${recipe.title.toLowerCase().replace(/ /g, '')}.html`;
        a.textContent = recipe.title;
        li.appendChild(a);
        ul.appendChild(li);
    });

    searchResults.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', searchRecipes);
    }
});


// Save recipe to favorites
document.addEventListener('DOMContentLoaded', function() {
    // Handle save-to-favorites button(s)
    const saveButtons = document.querySelectorAll('.save-receipt');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {

            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                // Not logged in: redirect to login page
                alert('Please log in to save recipes.');
                window.location.href = 'login.html';
                return; // Stop further execution
            }

            // User is logged in: proceed to save
            const recipe = {
                title: btn.getAttribute('data-title'),
                image: btn.getAttribute('data-image'),
                url: btn.getAttribute('data-url') || window.location.href
            };

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const exists = favorites.some(fav => fav.title === recipe.title && fav.url === recipe.url);
            if (!exists) {
                favorites.push(recipe);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Recipe saved to favorites!');
            } else {
                alert('This recipe is already in your favorites.');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const myCookbookBtn = document.querySelector('.my-cookbook');
    if (myCookbookBtn) {
        myCookbookBtn.addEventListener('click', () => {
            window.location.href = 'favorites.html'; // Redirects to favorites page
        });
    }
});

// Handle login/logout and profile link
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-button');
    if (!loginButton) return; // If no login button on page, exit early

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // User is logged in, show "My Profile" and a logout button
        loginButton.textContent = 'My Profile';
        loginButton.href = 'myprofile.html';
        loginButton.classList.add('auth-button');

        // Create logout button if not already present
        if (!document.querySelector('.logout-button')) {
            const logoutButton = document.createElement('a');
            logoutButton.textContent = 'Logout';
            logoutButton.href = '#';
            logoutButton.classList.add('nav-link', 'auth-button', 'ms-2', 'logout-button');

            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.reload();
            });

            loginButton.parentNode.appendChild(logoutButton);
        }
    } else {
        // No user logged in: show login button
        loginButton.textContent = 'Login';
        loginButton.href = 'login.html';
        loginButton.classList.add('auth-button');

        // Remove logout button if exists
        const existingLogout = document.querySelector('.logout-button');
        if (existingLogout) existingLogout.remove();
    }
});



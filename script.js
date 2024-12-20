document.addEventListener("DOMContentLoaded", function () {
    // Constants for height management
    const MAX_BURGER_HEIGHT = 360; // Maximum height in pixels
    const INGREDIENT_HEIGHTS = {
        tomato: 15,
        cheese: 10,
        lettuce: 15,
        onion: 10,
        meat: 25
    };

    // Track current burger height
    let currentBurgerHeight = 0;

    // Get DOM elements
    const ingredients = document.querySelectorAll(".ingredient-card");
    const priceDisplay = document.getElementById("price-display");
    const burgerContainer = document.querySelector(".burger");
    const resetButton = document.getElementById("reset-btn");
    const finishButton = document.getElementById("finish-btn");
    const returnButton = document.getElementById("return-btn");
    const finalScreen = document.getElementById("final-screen");

    // Pricing map
    const ingredientPrices = {
        tomato: 0.5,
        cheese: 1.0,
        lettuce: 0.7,
        onion: 0.3,
        meat: 2.0
    };

    let totalPrice = 0;

    // Update price display
    function updatePrice() {
        priceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Check if adding an ingredient would exceed max height
    function canAddIngredient(ingredientName) {
        const newHeight = currentBurgerHeight + INGREDIENT_HEIGHTS[ingredientName];
        return newHeight <= MAX_BURGER_HEIGHT;
    }

    // Update button states based on available height
    function updateButtonStates() {
        ingredients.forEach(ingredient => {
            const plusButton = ingredient.querySelector(".plus1");
            const ingredientName = ingredient.dataset.ingredient;
            
            if (canAddIngredient(ingredientName)) {
                plusButton.disabled = false;
                plusButton.style.opacity = "1";
            } else {
                plusButton.disabled = true;
                plusButton.style.opacity = "0.5";
            }
        });
    }

    // Add ingredient layer
    function addBurgerLayer(ingredientName) {
        const layer = document.createElement("div");
        layer.className = `ingredient ${ingredientName}`;
        layer.dataset.ingredient = ingredientName;
        burgerContainer.insertBefore(layer, burgerContainer.querySelector(".bottom-bun"));
        currentBurgerHeight += INGREDIENT_HEIGHTS[ingredientName];
        updateButtonStates();
    }

    // Remove ingredient layer
    function removeBurgerLayer(ingredientName) {
        const layers = burgerContainer.querySelectorAll(`[data-ingredient='${ingredientName}']`);
        if (layers.length > 0) {
            burgerContainer.removeChild(layers[layers.length - 1]);
            currentBurgerHeight -= INGREDIENT_HEIGHTS[ingredientName];
            updateButtonStates();
        }
    }

    // Initialize event listeners for each ingredient
    ingredients.forEach(ingredient => {
        const plusButton = ingredient.querySelector(".plus1");
        const minusButton = ingredient.querySelector(".miness1");
        const counterDisplay = ingredient.querySelector(".count1");
        const ingredientName = ingredient.dataset.ingredient;

        let count = 0;

        plusButton.addEventListener("click", () => {
            if (canAddIngredient(ingredientName)) {
                count++;
                counterDisplay.textContent = count;
                addBurgerLayer(ingredientName);
                totalPrice += ingredientPrices[ingredientName];
                updatePrice();
            }
        });

        minusButton.addEventListener("click", () => {
            if (count > 0) {
                count--;
                counterDisplay.textContent = count;
                removeBurgerLayer(ingredientName);
                totalPrice -= ingredientPrices[ingredientName];
                updatePrice();
            }
        });
    });

    // Reset functionality
    resetButton.addEventListener("click", () => {
        burgerContainer.querySelectorAll(".ingredient").forEach(layer => layer.remove());
        currentBurgerHeight = 0;
        totalPrice = 0;
        updatePrice();
        ingredients.forEach(ingredient => ingredient.querySelector(".count1").textContent = "0");
        updateButtonStates();
    });

    // Star rating system
    const starsContainer = document.createElement("div");
    starsContainer.className = "stars-container";
    const ratingLabel = document.createElement("p");
    ratingLabel.textContent = "Rate Your Burger:";
    starsContainer.appendChild(ratingLabel);

    const stars = document.createElement("div");
    stars.className = "stars";
    let selectedRating = 0;

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = "★";
        star.addEventListener("click", () => {
            selectedRating = i;
            updateStars();
        });
        star.addEventListener("mouseover", () => {
            previewStars(i);
        });
        star.addEventListener("mouseout", () => {
            updateStars();
        });
        stars.appendChild(star);
    }

    starsContainer.appendChild(stars);
    finalScreen.appendChild(starsContainer);

    function updateStars() {
        const allStars = stars.querySelectorAll(".star");
        allStars.forEach((star, index) => {
            star.style.color = index < selectedRating ? "gold" : "grey";
        });
    }

    function previewStars(rating) {
        const allStars = stars.querySelectorAll(".star");
        allStars.forEach((star, index) => {
            star.style.color = index < rating ? "gold" : "grey";
        });
    }

    // Finish button functionality
    finishButton.addEventListener("click", () => {
        const finalBurger = document.getElementById("final-burger");
        finalBurger.innerHTML = burgerContainer.innerHTML;
        finalScreen.style.display = "flex";
        selectedRating = 0;
        updateStars();
    });

    // Return button functionality
    returnButton.addEventListener("click", () => {
        finalScreen.style.display = "none";
    });

    // Initial button state update
    updateButtonStates();
});
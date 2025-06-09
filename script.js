// Menu data
const menuData = [
    {
        id: 1,
        name: "Nasi Ayam",
        description: "Fresh mixed greens, avocado, cucumber, broccoli, and quinoa with our signature tahini dressing.",
        price: 7.00,
        image: "https://images.unsplash.com/photo-1710256198508-41630f431e35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHJpY2V8ZW58MHx8MHx8fDA%3D",
        category: "main"
    },
    {
        id: 2,
        name: "Teh O",
        description: "Whole grain toast topped with smashed avocado, cherry tomatoes, and microgreens.",
        price: 2.50,
        image: "https://images.unsplash.com/photo-1635217217664-578a7e17218f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVoJTIwYWlzfGVufDB8fDB8fHww",
        category: "drinks"
    },
    {
        id: 3,
        name: "Pancake",
        description: "Plant-based patty with lettuce, tomato, onion, and special sauce on a whole wheat bun.",
        price: 5.00,
        image: "https://plus.unsplash.com/premium_photo-1672846027109-e2c91500afef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "desserts"
    },
    {
        id: 4,
        name: "Jus Buah",
        description: "Blend of seasonal fruits with almond milk and a touch of honey.",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D",
        category: "drinks"
    },
    {
        id: 5,
        name: "Toast",
        description: "Fluffy quinoa with mixed vegetables, feta cheese, and lemon vinaigrette.",
        price: 6.00,
        image: "https://images.unsplash.com/photo-1620921575116-fb8902865f81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvYXN0fGVufDB8fDB8fHww",
        category: "starters"
    },
    {
        id: 6,
        name: "Kentang Goreng",
        description: "Crispy sweet potato fries served with chipotle aioli.",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D",
        category: "starters"
    },
    {
        id: 7,
        name: "Teh Hijau",
        description: "Organic green tea served hot or cold.",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
        category: "drinks"
    },
    {
        id: 8,
        name: "Kek Coklat",
        description: "Rich chocolate cake made with plant-based ingredients.",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "desserts"
    }
];

// Global variables
let cart = [];
let currentCategory = 'all';

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    loadCart();
    updateCartCount();
    
    // Load menu items
    if (document.getElementById('menuItems')) {
        displayMenuItems(currentCategory);
        
        // Add event listeners to category buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                currentCategory = category;
                
                // Update active class
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Display filtered menu items
                displayMenuItems(category);
            });
        });
    }
    
    // Floating cart button
    const floatingCart = document.getElementById('floatingCart');
    if (floatingCart) {
        floatingCart.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
    
    // Checkout page functionality
    if (window.location.pathname.includes('checkout.html')) {
        displayCartItems();
        
        // Toggle delivery address fields
        const deliveryOptions = document.querySelectorAll('input[name="deliveryOption"]');
        deliveryOptions.forEach(option => {
            option.addEventListener('change', function() {
                const addressFields = document.getElementById('addressFields');
                if (this.value === 'delivery') {
                    addressFields.classList.remove('hidden');
                } else {
                    addressFields.classList.add('hidden');
                }
            });
        });
        
        // Toggle reference ID field
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                const referenceField = document.getElementById('referenceField');
                if (this.value === 'online') {
                    referenceField.classList.remove('hidden');
                } else {
                    referenceField.classList.add('hidden');
                }
            });
        });
        
        // Order form submission
        const orderForm = document.getElementById('orderForm');
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateOrderForm()) {
                return;
            }
            
            // Show confirmation modal
            const modal = document.getElementById('orderConfirmModal');
            modal.classList.add('active');
            
            // Display order summary in modal
            displayOrderSummary();
            
            // Add event listener to close button
            const closeBtn = document.querySelector('.close-btn');
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
            });
            
            // Add event listener to "Back to Home" button
            const backToHomeBtn = document.getElementById('backToHomeBtn');
            backToHomeBtn.addEventListener('click', function() {
                // Clear cart and redirect to home page
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            });
        });
    }
    
    // Feedback page functionality
    if (window.location.pathname.includes('feedback.html')) {
        displayFeedback();
        
        // Feedback form submission
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('feedbackName').value;
                const rating = document.querySelector('input[name="rating"]:checked')?.value || '5';
                const comment = document.getElementById('comment').value;
                
                // Create feedback object
                const feedback = {
                    name,
                    rating,
                    comment,
                    date: new Date().toLocaleDateString()
                };
                
                // Save feedback to localStorage
                saveFeedback(feedback);
                
                // Clear form
                feedbackForm.reset();
                
                // Update feedback display
                displayFeedback();
                
                // Show success message
                alert('Thank you for your feedback!');
            });
        }
    }
});

// Display menu items
function displayMenuItems(category) {
    const menuItemsContainer = document.getElementById('menuItems');
    if (!menuItemsContainer) return;
    
    // Filter menu items by category
    let filteredItems = menuData;
    if (category !== 'all') {
        filteredItems = menuData.filter(item => item.category === category);
    }
    
    // Create HTML for menu items
    let html = '';
    filteredItems.forEach(item => {
        html += `
            <div class="menu-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                <div class="menu-item-info">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <p class="menu-item-desc">${item.description}</p>
                    <p class="menu-item-price">RM${item.price.toFixed(2)}</p>
                    <div class="menu-item-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="10">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    menuItemsContainer.innerHTML = html;
    
    // Add event listeners to quantity buttons
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            const value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const value = parseInt(input.value);
            if (value < 10) {
                input.value = value + 1;
            }
        });
    });
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemId = parseInt(menuItem.getAttribute('data-id'));
            const quantity = parseInt(menuItem.querySelector('.quantity-input').value);
            
            addToCart(itemId, quantity);
        });
    });
}

// Add item to cart
function addToCart(itemId, quantity) {
    // Find menu item by ID
    const menuItem = menuData.find(item => item.id === itemId);
    if (!menuItem) return;
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        // Update quantity if item already exists
        existingItem.quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            image: menuItem.image,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    alert(`${menuItem.name} added to cart!`);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Update cart count
function updateCartCount() {
    const cartCountNav = document.getElementById('cartCountNav');
    const cartCountFloat = document.getElementById('cartCountFloat');
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartCountNav) {
        cartCountNav.textContent = itemCount;
    }
    
    if (cartCountFloat) {
        cartCountFloat.textContent = itemCount;
    }
}

// Display cart items on checkout page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = 'RM0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">RM${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn cart-minus">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" readonly>
                    <button class="quantity-btn cart-plus">+</button>
                    <button class="cart-remove-btn">×</button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    cartTotalElement.textContent = `RM${total.toFixed(2)}`;
    
    // Add event listeners to cart quantity buttons
    const minusButtons = cartItemsContainer.querySelectorAll('.cart-minus');
    const plusButtons = cartItemsContainer.querySelectorAll('.cart-plus');
    const removeButtons = cartItemsContainer.querySelectorAll('.cart-remove-btn');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemId = parseInt(cartItem.getAttribute('data-id'));
            updateCartItemQuantity(itemId, -1);
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemId = parseInt(cartItem.getAttribute('data-id'));
            updateCartItemQuantity(itemId, 1);
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemId = parseInt(cartItem.getAttribute('data-id'));
            removeCartItem(itemId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        item.quantity = 1;
    }
    
    if (item.quantity > 10) {
        item.quantity = 10;
    }
    
    saveCart();
    displayCartItems();
    updateCartCount();
}

// Remove item from cart
function removeCartItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    displayCartItems();
    updateCartCount();
}

// Validate order form
function validateOrderForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const reference = document.getElementById('reference').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    if (deliveryOption === 'delivery' && !address) {
        alert('Please enter a delivery address.');
        return false;
    }
    
    if (paymentMethod === 'online' && !reference) {
        alert('Please enter a reference ID for online payment.');
        return false;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before placing an order.');
        return false;
    }
    
    return true;
}

// Display order summary in confirmation modal
function displayOrderSummary() {
    const orderSummaryContainer = document.getElementById('orderSummary');
    if (!orderSummaryContainer) return;
    
    let html = '<h3>Order Details:</h3>';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <p><strong>${item.name}</strong> x ${item.quantity} - RM${itemTotal.toFixed(2)}</p>
        `;
    });
    
    html += `<p class="total"><strong>Total: RM${total.toFixed(2)}</strong></p>`;
    html += `<p>Your order will be ready in 30 minutes.</p>`;
    
    orderSummaryContainer.innerHTML = html;
}

// Save feedback to localStorage
function saveFeedback(feedback) {
    let feedbackList = JSON.parse(localStorage.getItem('feedback')) || [];
    feedbackList.push(feedback);
    localStorage.setItem('feedback', JSON.stringify(feedbackList));
}

// Display feedback on feedback page
function displayFeedback() {
    const feedbackListContainer = document.getElementById('feedbackList');
    if (!feedbackListContainer) return;
    
    const feedbackList = JSON.parse(localStorage.getItem('feedback')) || [];
    
    if (feedbackList.length === 0) {
        feedbackListContainer.innerHTML = '<p>No feedback yet. Be the first to leave a review!</p>';
        return;
    }
    
    let html = '';
    
    // Sort feedback by date (most recent first)
    feedbackList.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    feedbackList.forEach(feedback => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < feedback.rating) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }
        
        html += `
            <div class="feedback-item">
                <div class="feedback-item-header">
                    <span class="feedback-item-name">${feedback.name}</span>
                    <span class="feedback-item-rating">${stars}</span>
                </div>
                <p class="feedback-item-comment">${feedback.comment}</p>
                <small>${feedback.date}</small>
            </div>
        `;
    });
    
    feedbackListContainer.innerHTML = html;
}

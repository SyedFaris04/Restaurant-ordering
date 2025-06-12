// --------------------------------------------------------------------
// IMPORTANT: Paste your Firebase project's configuration object here.
// You can find this in your Firebase project settings.
// --------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyBT4MPaGsjKbd9tJoAPCo6NqyGX-ZkUUfE",
    authDomain: "kcsystem-55ca5.firebaseapp.com",
    projectId: "kcsystem-55ca5",
    storageBucket: "kcsystem-55ca5.firebasestorage.app",
    messagingSenderId: "384255630133",
    appId: "1:384255630133:web:b82198e919db0806484a7c",
    measurementId: "G-6GZGQKXRYT"
};

// If you are using the immersive environment, these will be provided for you.
if (typeof __firebase_config !== 'undefined') {
    Object.assign(firebaseConfig, JSON.parse(__firebase_config));
}


// Initialize Firebase App (conditionally)
let db;
// Only attempt to initialize Firebase if the API key is not the placeholder
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    // Dynamically import Firebase modules
    import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js")
        .then(({ initializeApp }) => {
            const app = initializeApp(firebaseConfig);
            return import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js")
                .then(({ getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs }) => {
                    db = getFirestore(app);
                    // Make firestore functions available globally or pass them where needed
                    window.firestore = { collection, addDoc, serverTimestamp, query, orderBy, getDocs };
                    console.log("Firebase Firestore initialized.");

                    // Re-display feedback after Firestore is ready
                    if (document.getElementById('feedbackForm')) {
                        displayFeedback();
                    }
                });
        })
        .catch(error => console.error("Firebase initialization failed:", error));
} else {
    console.warn("Firebase API key not set. Firebase will not be initialized. Check firebaseConfig.");
}


// Menu data
const menuData = [
    {
        id: 1,
        name: "Nasi Ayam",
        description: "Nasi putih dengan ayam goreng yang rangup, dihidangkan bersama sup panas dan sos cili istimewa.",
        price: 7.00,
        image: "https://images.unsplash.com/photo-1710256198508-41630f431e35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHJpY2V8ZW58MHx8MHx8fDA%3D",
        category: "main"
    },
    {
        id: 2,
        name: "Teh O",
        description: "Teh tarik tanpa susu, disediakan dengan teh asli yang harum dan diadun dengan sempurna.",
        price: 2.50,
        image: "https://images.unsplash.com/photo-1635217217664-578a7e17218f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVoJTIwYWlzfGVufDB8fDB8fHww",
        category: "drinks"
    },
    {
        id: 3,
        name: "Pancake",
        description: "Lempeng gebu disajikan dengan sirap maple, mentega cair dan hirisan pisang segar.",
        price: 5.00,
        image: "https://plus.unsplash.com/premium_photo-1672846027109-e2c91500afef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "desserts"
    },
    {
        id: 4,
        name: "Jus Buah",
        description: "Jus segar campuran buah-buahan tropika termasuk mangga, betik dan tembikai.",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D",
        category: "drinks"
    },
    {
        id: 5,
        name: "Toast",
        description: "Roti bakar rangup dihidangkan dengan kaya dan mentega yang meleleh.",
        price: 6.00,
        image: "https://images.unsplash.com/photo-1620921575116-fb8902865f81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvYXN0fGVufDB8fDB8fHww",
        category: "starters"
    },
    {
        id: 6,
        name: "Kentang Goreng",
        description: "Kentang goreng rangup luar lembut dalam, disajikan dengan sos tomato dan mayonis.",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D",
        category: "starters"
    },
    {
        id: 7,
        name: "Teh Hijau",
        description: "Teh hijau asli yang menyegarkan, boleh dihidangkan panas atau sejuk.",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1627435601361-ec2556d809a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
        category: "drinks"
    },
    {
        id: 8,
        name: "Kek Coklat",
        description: "Kek coklat lembap yang kaya dengan rasa coklat, dihiasi dengan ganache coklat.",
        price: 8.50,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
        category: "desserts"
    }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Run on all pages
    updateCartCount();

    // Run only on pages where these elements exist
    if (document.getElementById('menuList')) {
        renderMenu();
        addMenuFilterListener();
    }

    if (document.getElementById('cartItems')) {
        renderCart();
    }

    if (document.getElementById('floatingCart')) {
        document.getElementById('floatingCart').addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    if (document.getElementById('checkout-form')) {
        document.getElementById('checkout-form').addEventListener('submit', placeOrder);
    }

    if (document.getElementById('backToHomeBtn')) {
        document.getElementById('backToHomeBtn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Only attempt to attach feedback listeners and display if the form exists
    if (document.getElementById('feedbackForm')) {
        document.getElementById('feedbackForm').addEventListener('submit', submitFeedback);
        // Initial display will happen after Firestore is confirmed initialized
    }
});

// Menu functions
function renderMenu(filter = 'all') {
    const menuList = document.getElementById('menuList');
    if (!menuList) return;

    const filteredMenu = menuData.filter(item => filter === 'all' || item.category === filter);

    let html = '';
    filteredMenu.forEach(item => {
        html += `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">RM${item.price.toFixed(2)}</span>
                        <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
    menuList.innerHTML = html;

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

function addMenuFilterListener() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to the clicked button
            btn.classList.add('active');
            // Render the menu with the selected filter
            renderMenu(btn.dataset.filter);
        });
    });
}

// Cart functions
function addToCart(itemId, quantity = 1) {
    const itemInCart = cart.find(item => item.id === itemId);

    if (itemInCart) {
        itemInCart.quantity += quantity;
    } else {
        const itemToAdd = menuData.find(item => item.id === itemId);
        cart.push({ ...itemToAdd, quantity: quantity });
    }

    saveCart();
    updateCartCount();
    showNotification(`${menuData.find(i => i.id === itemId).name} added to cart!`);
}

function updateCart(itemId, quantity) {
    const itemInCart = cart.find(item => item.id === itemId);
    if (itemInCart) {
        if (quantity > 0) {
            itemInCart.quantity = quantity;
        } else {
            cart = cart.filter(item => item.id !== itemId);
        }
    }
    saveCart();
    updateCartCount();
    renderCart(); // Re-render the cart on the checkout page
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    });

    // Also update floating cart visibility
    const floatingCart = document.getElementById('floatingCart');
    if (floatingCart) {
        floatingCart.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const checkoutForm = document.getElementById('checkout-form');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        document.querySelector('.checkout-container').innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty.</p>
                <a href="index.html#menu" class="btn btn-primary">Go to Menu</a>
            </div>
        `;
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>RM${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                </div>
                <div class="cart-item-total">
                    RM${itemTotal.toFixed(2)}
                </div>
                <button class="remove-item-btn" data-id="${item.id}">&times;</button>
            </div>
        `;
    });
    cartItemsContainer.innerHTML = html;
    cartTotalContainer.textContent = `RM${total.toFixed(2)}`;

    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.dataset.id);
            const quantity = parseInt(e.target.value);
            updateCart(id, quantity);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            updateCart(id, 0); // Setting quantity to 0 removes the item
        });
    });
}

// Order function
async function placeOrder(e) {
    e.preventDefault();
    if (!db || !window.firestore) {
        alert("Database is not ready. Please try again in a moment.");
        console.error("Firestore is not initialized.");
        return;
    }

    const { collection, addDoc, serverTimestamp } = window.firestore;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = {
        items: cart,
        total: total,
        status: 'active', // 'active', 'completed'
        timestamp: serverTimestamp() // Use server-side timestamp
    };

    try {
        // Show loading state
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = 'Placing Order...';

        // Add a new document with a generated ID to the 'orders' collection.
        const docRef = await addDoc(collection(db, "orders"), orderDetails);
        console.log("Order placed with ID: ", docRef.id);

        // Clear local cart
        cart = [];
        saveCart();
        updateCartCount();

        // Show success message
        document.querySelector('.checkout-section').style.display = 'none';
        const orderSuccessEl = document.getElementById('orderSuccess');
        orderSuccessEl.style.display = 'block';

        const summaryHtml = `
            <h4>Order #${docRef.id.substring(0, 5).toUpperCase()}</h4>
            <p>Total: RM${total.toFixed(2)}</p>
            <ul>
              ${orderDetails.items.map(i => `<li>${i.name} x ${i.quantity}</li>`).join('')}
            </ul>
        `;
        document.getElementById('orderSummary').innerHTML = summaryHtml;


    } catch (error) {
        console.error("Error adding document: ", error);
        alert("There was an error placing your order. Please try again.");
        // Re-enable button
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Place Order';
    }
}

// Utility functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Feedback functions
async function submitFeedback(e) {
    e.preventDefault();
    const name = document.getElementById('customerName').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    if (!name || !rating || !comment) {
        alert('Please fill out all fields.');
        return;
    }

    if (!db || !window.firestore) {
        alert("Database is not ready. Please try again in a moment.");
        console.error("Firestore is not initialized.");
        return;
    }

    const { collection, addDoc, serverTimestamp } = window.firestore;

    const feedback = {
        name,
        rating: parseInt(rating), // Ensure rating is a number
        comment,
        timestamp: serverTimestamp() // Use server-side timestamp for consistent ordering
    };

    try {
        await addDoc(collection(db, "feedback"), feedback);
        console.log("Feedback submitted successfully!");
        alert('Thank you for your feedback!');
        document.getElementById('feedbackForm').reset();
        displayFeedback(); // Re-display feedback to show the new entry
    } catch (error) {
        console.error("Error adding feedback: ", error);
        alert("There was an error submitting your feedback. Please try again.");
    }
}

// Display feedback on feedback page
async function displayFeedback() {
    const feedbackListContainer = document.getElementById('feedbackList');
    if (!feedbackListContainer) return;

    if (!db || !window.firestore) {
        // Display a message if Firestore isn't ready yet
        feedbackListContainer.innerHTML = '<p>Loading feedback...</p>';
        return;
    }

    const { collection, query, orderBy, getDocs } = window.firestore;

    try {
        const feedbackQuery = query(collection(db, "feedback"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(feedbackQuery);

        if (querySnapshot.empty) {
            feedbackListContainer.innerHTML = '<p>No feedback yet. Be the first to leave a review!</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach(doc => {
            const feedback = doc.data();
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < feedback.rating) {
                    stars += '★';
                } else {
                    stars += '☆';
                }
            }
            // Use feedback.timestamp.toDate() if it's a Firestore Timestamp, otherwise use new Date()
            const feedbackDate = feedback.timestamp ? new Date(feedback.timestamp.toDate()).toLocaleDateString('en-GB') : 'N/A';

            html += `
                <div class="feedback-item">
                    <div class="feedback-item-header">
                        <span class="feedback-item-name">${feedback.name}</span>
                        <span class="feedback-item-rating">${stars}</span>
                    </div>
                    <p class="feedback-item-comment">${feedback.comment}</p>
                    <small>${feedbackDate}</small>
                </div>
            `;
        });

        feedbackListContainer.innerHTML = html;
    } catch (error) {
        console.error("Error fetching feedback: ", error);
        feedbackListContainer.innerHTML = '<p>Error loading feedback. Please try again later.</p>';
    }
}

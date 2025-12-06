// Main JS Logic

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentGender = 'all';
let currentSort = 'featured';
let maxPrice = 100;
let searchQuery = '';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const categoryFilters = document.getElementById('category-filters');
const genderFilters = document.getElementById('gender-filters');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize
function init() {
    if (categoryFilters) renderCategories();
    if (genderFilters) renderGenderFilters();
    if (productGrid) renderProducts();
    updateCartUI();
    setupEventListeners();
    initScrollAnimations();
    initNavbarScroll();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Render Categories
function renderCategories() {
    if (!categoryFilters) return;
    const categories = ['all', ...new Set(products.map(p => p.category))];

    categoryFilters.innerHTML = categories.map(cat => `
        <label>
            <input type="radio" name="category" value="${cat}" ${cat === 'all' ? 'checked' : ''}>
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </label>
    `).join('');

    // Add event listeners to new radio buttons
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            renderProducts();
        });
    });
}

// Render Gender Filters
function renderGenderFilters() {
    if (!genderFilters) return;
    const genders = ['all', 'Men', 'Women', 'Unisex'];

    genderFilters.innerHTML = genders.map(gender => `
        <label>
            <input type="radio" name="gender" value="${gender}" ${gender === 'all' ? 'checked' : ''}>
            ${gender}
        </label>
    `).join('');

    // Add event listeners to new radio buttons
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentGender = e.target.value;
            renderProducts();
        });
    });
}

// Filter and Sort Products
function getFilteredProducts() {
    let filtered = products.filter(product => {
        const matchCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchGender = currentGender === 'all' || product.gender === currentGender;
        const matchPrice = product.price <= maxPrice;
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchGender && matchPrice && matchSearch;
    });

    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        default:
            // Featured - default order
            break;
    }

    return filtered;
}

// Product Modal Elements
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalBrand = document.getElementById('modal-brand');
const modalName = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

const modalAddBtn = document.getElementById('modal-add-btn');

// Open Product Modal
function openProductModal(productId) {
    if (!productModal) return;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalBrand.textContent = product.brand;
    modalName.textContent = product.name;


    // Reset Size Selection to 5ml
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    if (sizeInputs.length > 0) sizeInputs[0].checked = true;

    // Price Logic
    let currentPrice = product.price;
    modalPrice.textContent = `$${currentPrice.toFixed(2)}`;

    // Handle Size Change
    sizeInputs.forEach(input => {
        input.onchange = () => {
            if (input.value === '10ml') {
                currentPrice = product.price * 1.8; // 10ml is 1.8x price
            } else {
                currentPrice = product.price;
            }
            modalPrice.textContent = `$${currentPrice.toFixed(2)}`;
        };
    });

    // Generate dynamic description if not present
    const description = product.description ||
        `Experience the luxurious essence of ${product.name} by ${product.brand}. This exquisite ${product.category.toLowerCase()} fragrance features a harmonious blend of ${product.notes.toLowerCase()}, crafted to leave a lasting impression. Perfect for those who appreciate the finer things in life.`;

    modalDesc.textContent = description;

    // Update Add to Cart button
    modalAddBtn.onclick = () => {
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        addToCart(product.id, selectedSize, currentPrice);
        closeProductModal();
    };

    productModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Filter Products
function getFilteredProducts() {
    return products.filter(product => {
        // Category Filter
        if (currentCategory !== 'all' && product.category !== currentCategory) return false;

        // Gender Filter
        if (currentGender !== 'all' && product.gender !== currentGender) return false;

        // Price Filter
        if (product.price > maxPrice) return false;

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchName = product.name.toLowerCase().includes(query);
            const matchBrand = product.brand.toLowerCase().includes(query);
            const matchNotes = product.notes.toLowerCase().includes(query);
            if (!matchName && !matchBrand && !matchNotes) return false;
        }

        return true;
    }).sort((a, b) => {
        // Sort Logic
        if (currentSort === 'price-low') return a.price - b.price;
        if (currentSort === 'price-high') return b.price - a.price;
        return 0; // Default (featured)
    });
}

// Render Products (Updated to include link to product page)
function renderProducts() {
    if (!productGrid) return;
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        productGrid.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
        return;
    }

    productGrid.innerHTML = filtered.map((product, index) => `
        <div class="product-card fade-in" style="animation-delay: ${index * 0.05}s">
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit; display: block;">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-notes">${product.notes}</div>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn" onclick="event.preventDefault(); addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// Toast Notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    // Add icon and message
    toast.innerHTML = `
        <i data-lucide="check-circle" style="color: var(--accent-color); min-width: 20px;"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Initialize icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Trigger reflow
    toast.offsetHeight;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Cart Functions
function addToCart(productId, size = '5ml', price = null, delivery = 'standard') {
    const product = products.find(p => p.id === productId);
    // Use passed price or default product price if not provided (e.g. from grid view)
    const finalPrice = price || product.price;

    // Create a unique ID based on product ID, size, and delivery
    const cartItemId = `${productId}-${size}-${delivery}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            cartItemId: cartItemId, // Unique identifier for cart
            size: size,
            delivery: delivery,
            price: finalPrice,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    openCart();
    showToast(`Added ${product.name} (${size}) to cart`);
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart();
    updateCartUI();
}

function updateQuantity(cartItemId, change) {
    const item = cart.find(item => item.cartItemId === cartItemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
        cartTotalAmount.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">
                    ${item.size} - $${item.price.toFixed(2)}
                    ${item.delivery === 'express' ? '<br><span style="font-size: 0.8em; color: var(--accent-color);">Express Delivery</span>' : ''}
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.cartItemId}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.cartItemId}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.cartItemId}')">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = '$' + total.toFixed(2);
}

// UI Interaction
function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners
function setupEventListeners() {
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Cart Toggle
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', () => {
        closeCart();
        closeProductModal();
    });

    // Modal Close
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProductModal);

    // Filters
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            maxPrice = parseInt(e.target.value);
            priceValue.textContent = '$' + maxPrice;
            renderProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // Filter Toggle (Mobile)
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const filtersSidebar = document.querySelector('.filters');

    if (filterToggleBtn && filtersSidebar) {
        // Create close button for filters if it doesn't exist
        if (!filtersSidebar.querySelector('.close-filters-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-filters-btn';
            closeBtn.innerHTML = '<i data-lucide="x"></i>';
            closeBtn.onclick = () => filtersSidebar.classList.remove('active');
            filtersSidebar.prepend(closeBtn);
        }

        filterToggleBtn.addEventListener('click', () => {
            filtersSidebar.classList.add('active');
        });
    }

    // Search Toggle
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.querySelector('.search-container');

    if (searchBtn && searchContainer) {
        searchBtn.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Checkout
    // Checkout
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');

    function openCheckoutModal() {
        if (checkoutModal) {
            checkoutModal.classList.add('active');
            overlay.classList.add('active');
            closeCart(); // Close the cart sidebar
        }
    }

    function closeCheckoutModal() {
        if (checkoutModal) {
            checkoutModal.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    }

    // Close on overlay click (already handled by existing overlay listener, but need to ensure it closes checkout too)
    if (overlay) {
        overlay.addEventListener('click', closeCheckoutModal);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Your cart is empty!');
                return;
            }
            openCheckoutModal();
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('checkout-name').value;
            const phone = document.getElementById('checkout-phone').value;
            const city = document.getElementById('checkout-city').value;
            const address = document.getElementById('checkout-address').value;

            // Construct WhatsApp message
            let message = `*New Order from ${name}*\n\n`;
            message += `*Customer Details:*\n`;
            message += `Name: ${name}\n`;
            message += `Phone: ${phone}\n`;
            message += `City: ${city}\n`;
            message += `Address: ${address}\n\n`;

            message += `*Order Details:*\n`;
            cart.forEach(item => {
                const deliveryText = item.delivery === 'express' ? 'Express' : 'Standard';
                message += `- ${item.name} (${item.brand}) - ${item.size} - ${deliveryText} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}\n`;
            });

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `\n*Total: $${total.toFixed(2)}*`;

            // WhatsApp number (Morocco)
            const phoneNumber = "212617515466";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Optional: Clear cart or close modal
            closeCheckoutModal();
        });
    }
}

// Make functions global for inline onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openProductModal = openProductModal;

// Start
document.addEventListener('DOMContentLoaded', init);

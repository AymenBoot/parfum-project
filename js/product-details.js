document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const container = document.getElementById('product-details-container');

    if (!productId) {
        container.innerHTML = '<p>Product not found.</p>';
        return;
    }

    let product;
    const apiBaseUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://127.0.0.1:5000'
        : '';

    try {
        const response = await fetch(`${apiBaseUrl}/api/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        product = await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        container.innerHTML = '<p>Product not found.</p>';
        return;
    }

    // Update Page Title
    document.title = `${product.name} - L'Essence`;

    // Default State
    let currentSize = '5ml';
    let currentDelivery = 'standard';
    let currentPrice = product.price;

    // Generate Description if missing
    const description = product.description ||
        `Experience the luxurious essence of ${product.name} by ${product.brand}. This exquisite ${product.category.toLowerCase()} fragrance features a harmonious blend of ${product.notes.toLowerCase()}, crafted to leave a lasting impression. Perfect for those who appreciate the finer things in life.`;

    // Render
    container.innerHTML = `
        <div class="product-image-large">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info-large">
            <div class="product-brand">${product.brand}</div>
            <h1>${product.name}</h1>
            <div class="product-price-large">
                ${product.price.toFixed(2)} MAD
            </div>
            <div class="stock-info-large ${product.stock <= 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : 'in-stock'}" style="margin-bottom: 30px;">
                ${product.stock <= 0 ? 'Out of Stock' : `In Stock: ${product.stock} items available`}
            </div>

            <div class="product-description" style="margin-bottom: 30px; line-height: 1.8; color: var(--light-text);">
                <h3 style="font-family: var(--font-heading); margin-bottom: 10px; color: var(--text-color);">Description</h3>
                <p>${description}</p>
            </div>



            <!-- Options -->
            <div class="product-options-container">
                
                <!-- Size Selector -->
                <div class="option-group">
                    <div class="option-title">Size</div>
                    <div class="option-selector">
                        <label class="option-btn selected">
                            <input type="radio" name="size" value="5ml" checked>
                            <span>5ml (Travel Spray)</span>
                        </label>
                        <label class="option-btn">
                            <input type="radio" name="size" value="10ml">
                            <span>10ml (Double Size)</span>
                        </label>
                    </div>
                </div>

                <!-- Delivery Selector -->
                <div class="option-group">
                    <div class="option-title">Delivery Speed</div>
                    <div class="option-selector">
                        <label class="option-btn selected">
                            <input type="radio" name="delivery" value="standard" checked>
                            <span>Standard (3-5 Days) - Free</span>
                        </label>
                        <label class="option-btn">
                            <input type="radio" name="delivery" value="express">
                            <span>Express (1-2 Days) - +50.00 MAD</span>
                        </label>
                    </div>
                </div>

                <button id="add-to-cart-page-btn" class="btn btn-primary btn-full add-to-cart-page-btn" ${product.stock <= 0 ? 'disabled style="background: #ccc; cursor: not-allowed;"' : ''}>
                    ${product.stock <= 0 ? 'Sold Out' : `Add to Cart - ${product.price.toFixed(2)} MAD`}
                </button>
            </div>
        </div>
    `;

    // Logic
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const deliveryInputs = document.querySelectorAll('input[name="delivery"]');
    const priceDisplay = document.querySelector('.product-price-large');
    const btn = document.getElementById('add-to-cart-page-btn');

    function updatePrice() {
        let basePrice = product.price;

        // Size Multiplier
        if (currentSize === '10ml') {
            basePrice *= 1.8;
        }

        // Delivery Fee
        let deliveryFee = 0;
        if (currentDelivery === 'express') {
            deliveryFee = 50.00;
        }

        let finalPrice = basePrice + deliveryFee;

        priceDisplay.textContent = `${finalPrice.toFixed(2)} MAD`;
        btn.textContent = `Add to Cart - ${finalPrice.toFixed(2)} MAD`;
        currentPrice = finalPrice;
    }

    function updateSelectedClass(inputs) {
        inputs.forEach(input => {
            const label = input.closest('.option-btn');
            if (input.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    }

    sizeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            currentSize = e.target.value;
            updatePrice();
            updateSelectedClass(sizeInputs);
        });
    });

    deliveryInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            currentDelivery = e.target.value;
            updatePrice();
            updateSelectedClass(deliveryInputs);
        });
    });

    btn.addEventListener('click', () => {
        if (window.addToCart) {
            window.addToCart(product.id, currentSize, currentPrice, currentDelivery);
        }
    });
});

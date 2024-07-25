// JavaScript code to handle the cart functionality

let cart = [];

// Load cart from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const product = event.target.closest('.product');
            const title = product.querySelector('h2').textContent;
            const price = product.querySelector('p').textContent;

            addToCart(title, price);
        });
    });

    if (document.querySelector('.cart')) {
        displayCart();
    }
});

function addToCart(title, price) {
    const product = { title, price };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

function removeFromCart(title) {
    cart = cart.filter(product => product.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartContainer = document.querySelector('.cart');
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    cart = storedCart ? storedCart : [];

    cartContainer.innerHTML = `
        <h1>Shopping Cart</h1>
        ${cart.map(product => `
            <div class="cart-item">
                <img src="https://via.placeholder.com/150" alt="Product Image">
                <div class="item-details">
                    <h2>${product.title}</h2>
                    <p>${product.price}</p>
                    <button class="btn" onclick="removeFromCart('${product.title}')">Remove</button>
                </div>
            </div>
        `).join('')}
        <div class="checkout">
            <h2>Total: ₹${calculateTotal()}</h2>
            <a href="checkout.html" class="btn">Proceed to Checkout</a>
        </div>
    `;
}

function calculateTotal() {
    return cart.reduce((total, product) => {
        return total + parseFloat(product.price.replace('₹', ''));
    }, 0).toFixed(2);
}

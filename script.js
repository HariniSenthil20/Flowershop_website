// Initialize from storage
let cart = JSON.parse(localStorage.getItem('shop_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('shop_wishlist')) || [];

window.onload = updateIcons;

function updateIcons() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('wish-count').innerText = wishlist.length;
}

// Add to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    updateIcons();
    alert(`🛒 ${name} added to cart!`);
}

// Add to Wishlist
function addToWishlist(name, price) {
    if(wishlist.some(item => item.name === name)) {
        alert("Already in wishlist!");
        return;
    }
    wishlist.push({ name, price });
    localStorage.setItem('shop_wishlist', JSON.stringify(wishlist));
    updateIcons();
    alert(`❤️ ${name} saved to wishlist!`);
}

// Side Panel Logic
function showPanel(type) {
    const panel = document.getElementById('side-panel');
    const title = document.getElementById('panel-title');
    const content = document.getElementById('panel-content');
    
    panel.classList.add('active');
    title.innerText = `My ${type}`;
    
    let items = type === 'Cart' ? cart : wishlist;
    
    if(items.length === 0) {
        content.innerHTML = `<p style="font-size:1.6rem; margin-top:2rem;">Your ${type} is empty.</p>`;
    } else {
        content.innerHTML = items.map((item, index) => `
            <div class="panel-item">
                <span>${item.name}</span>
                <strong>₹${item.price}</strong>
            </div>
        `).join('');
    }
}

function closePanel() {
    document.getElementById('side-panel').classList.remove('active');
}

// Login Modal
document.querySelector('#login-btn').onclick = () => {
    document.querySelector('#login-container').classList.add('active');
}
document.querySelector('#close-login').onclick = () => {
    document.querySelector('#login-container').classList.remove('active');
}

// Review Form
document.getElementById('reviewForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your 5-star review!");
    e.target.reset();
};
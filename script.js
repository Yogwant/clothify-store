const products = [
  { id: 1, name: "Men's T-Shirt", price: 499, image: "https://via.placeholder.com/200x250?text=T-Shirt" },
  { id: 2, name: "Women's Dress", price: 899, image: "https://via.placeholder.com/200x250?text=Dress" },
  { id: 3, name: "Unisex Hoodie", price: 1199, image: "https://via.placeholder.com/200x250?text=Hoodie" }
];

let cart = [];

function loadProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";
  products.forEach(product => {
    grid.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCartCount();
    alert(`${product.name} added to cart`);
  }
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.innerText = `Cart (${cart.length})`;
}

function loadCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-amount");
  if (!cartContainer || !totalEl) return;

  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    cartContainer.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });
  totalEl.innerText = total;
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
  loadCartItems();

  const form = document.getElementById("payment-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const txnId = document.getElementById("txn-id").value.trim();
      const status = document.getElementById("payment-status");
      if (txnId.length > 5) {
        status.innerText = "Payment received! Order confirmed.";
        status.style.color = "green";
      } else {
        status.innerText = "Invalid transaction ID.";
        status.style.color = "red";
      }
    });
  }
});
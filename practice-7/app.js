class ShoppingCart {
  constructor() {
    this.cart = [];
    this.cartItemsEl = document.getElementById('cartItems');
    this.totalPriceEl = document.getElementById('totalPrice');
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.renderCart();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.renderCart();
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.cart.find(p => p.id === productId);
    if (item) {
      item.quantity = newQuantity;
    }
    this.renderCart();
  }

  renderCart() {
    this.cartItemsEl.innerHTML = '';
    let totalPrice = 0;

    this.cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="shoppingCart.removeFromCart(${item.id})">Remove</button>
        <input type="number" value="${item.quantity}" min="1"
               onchange="shoppingCart.updateQuantity(${item.id}, this.value)">
      `;
      this.cartItemsEl.appendChild(li);
      totalPrice += item.price * item.quantity;
    });

    this.totalPriceEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
}

class ProductLister {
  constructor(cartInstance) {
    this.cart = cartInstance;
    this.productsEl = document.getElementById('products');
  }

  async loadProducts() {
    try {
      const response = await fetch('https://api.example.com/products');
      const products = await response.json();
      this.renderProducts(products);
    } catch (error) {
      console.error('Failed to load products:', error);
      this.productsEl.innerHTML = 'Failed to load products.';
    }
  }

  renderProducts(products) {
    this.productsEl.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="shoppingCart.addToCart(${JSON.stringify(product).replace(/"/g, "'")})">Add to Cart</button>
      `;
      this.productsEl.appendChild(div);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const shoppingCart = new ShoppingCart();
  window.shoppingCart = shoppingCart; // Global scope'a ekliyoruz

  const productLister = new ProductLister(shoppingCart);
  productLister.loadProducts();
});
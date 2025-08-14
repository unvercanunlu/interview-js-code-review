class ProductLister {
  constructor() {
    this.container = document.querySelector('.product-container');
  }

  async fetchProducts() {
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();
    this.renderProducts(data.products);
  }

  renderProducts(products) {
    let html = '';
    products.forEach(product => {
      html += `
        <div class="product-item">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <button onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      `;
    });
    this.container.innerHTML = html;
  }
}

function addToCart(productId) {
  // Sepete ekleme işlemi burada yapılacak
  console.log('Product added to cart:', productId);
}

document.addEventListener('DOMContentLoaded', () => {
  const productLister = new ProductLister();
  productLister.fetchProducts();
});
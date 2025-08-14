// Global state
let currentPage = 1;
let currentFilters = {};

const productListEl = document.getElementById('productList');
const paginationEl = document.getElementById('pagination');
const filterFormEl = document.getElementById('filterForm');

async function fetchProducts() {
  productListEl.innerHTML = 'Loading products...';

  // Filtreleri ve sayfa numarasını URL parametrelerine ekle
  const params = new URLSearchParams(currentFilters);
  params.set('page', currentPage);

  try {
    const response = await fetch(`https://api.example.com/products?${params.toString()}`);
    const data = await response.json();

    renderProducts(data.products);
    renderPagination(data.meta.totalPages);

  } catch (error) {
    productListEl.innerHTML = 'Failed to load products. Please try again.';
    console.error(error);
  }
}

function renderProducts(products) {
  productListEl.innerHTML = ''; // Önceki ürünleri temizle

  if (products.length === 0) {
    productListEl.innerHTML = 'No products found.';
    return;
  }

  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.className = 'product-card';
    productEl.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
    `;
    productListEl.appendChild(productEl);
  });
}

function renderPagination(totalPages) {
  paginationEl.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.disabled = true;
    }
    pageBtn.onclick = () => {
      currentPage = i;
      fetchProducts();
    };
    paginationEl.appendChild(pageBtn);
  }
}

// Filtre formu gönderildiğinde
filterFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(filterFormEl);
  currentFilters = Object.fromEntries(formData);
  currentPage = 1; // Yeni filtrede ilk sayfaya dön
  fetchProducts();
});

document.addEventListener('DOMContentLoaded', fetchProducts);
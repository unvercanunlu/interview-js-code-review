let favorites = []; // Favori ürünleri saklayan global array

function addFavorite(product) {
  if (!isFavorite(product.id)) {
    favorites.push(product);
    console.log(`Product "${product.name}" added to favorites.`);
  } else {
    console.log(`Product "${product.name}" is already a favorite.`);
  }
}

function removeFavorite(productId) {
  const initialLength = favorites.length;
  favorites = favorites.filter(product => product.id !== productId);
  if (favorites.length < initialLength) {
    console.log(`Product with ID "${productId}" removed from favorites.`);
  } else {
    console.log(`Product with ID "${productId}" not found in favorites.`);
  }
}

function isFavorite(productId) {
  // Array üzerinde arama yapma işlemi
  return favorites.some(product => product.id === productId);
}

// Örnek kullanım
const product1 = { id: 1, name: "Laptop" };
const product2 = { id: 2, name: "Mouse" };
const product3 = { id: 3, name: "Keyboard" };

addFavorite(product1);
addFavorite(product2);

console.log('Is Laptop a favorite?', isFavorite(product1.id));
console.log('Is Keyboard a favorite?', isFavorite(product3.id));

removeFavorite(product1.id);
console.log('Is Laptop a favorite after removal?', isFavorite(product1.id));
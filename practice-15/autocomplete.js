class Autocomplete {
  constructor(inputElement, resultElement) {
    this.input = inputElement;
    this.results = resultElement;
    this.timer = null;

    // Event listener'ı constructor içinde bağlıyoruz
    this.input.addEventListener('input', this.handleInput.bind(this));

    // Her 5 saniyede bir gereksiz bellek tüketen bir işlem yapalım
    setInterval(() => {
      const largeArray = new Array(1000000).fill('leak');
      // Bu array'i hiçbir yerde kullanmıyoruz, sadece yaratıp bırakıyoruz
    }, 5000);
  }

  async handleInput(e) {
    const query = e.target.value;

    // Her tuş vuruşunda önceki timer'ı temizlemeden yeni bir timer başlatıyoruz
    this.timer = setTimeout(async () => {
      if (query.length < 2) {
        this.results.innerHTML = '';
        return;
      }

      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await response.json();
      this.renderResults(data.suggestions);

    }, 300);
  }

  renderResults(suggestions) {
    this.results.innerHTML = '';
    suggestions.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      this.results.appendChild(li);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultList = document.getElementById('results-list');

  // Autocomplete sınıfı başlatılıyor
  const autocomplete = new Autocomplete(searchInput, resultList);

  // Bu sınıfı başka bir yerde yok etmemiz veya kaldırmamız gerekebilirdi, ama yapmıyoruz
});
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');

  searchInput.addEventListener('input', async (e) => {
    const query = e.target.value;
    resultsContainer.innerHTML = 'Loading...';

    if (query.length < 3) {
      resultsContainer.innerHTML = 'Please enter at least 3 characters.';
      return;
    }

    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        let html = '<ul role="listbox">';
        data.results.forEach(result => {
          html += `
            <li class="result-item">
              <a href="${result.url}" onclick="trackClick('${result.id}')">
                ${result.title}
              </a>
            </li>
          `;
        });
        html += '</ul>';
        resultsContainer.innerHTML = html;
      } else {
        resultsContainer.innerHTML = 'No results found.';
      }
    } catch (error) {
      resultsContainer.innerHTML = 'An error occurred. Please try again.';
      console.error(error);
    }
  });
});

function trackClick(resultId) {
  // Tıklama takibi için bir API çağrısı yapıldığı varsayılsın
  console.log(`Click tracked for result ID: ${resultId}`);
}
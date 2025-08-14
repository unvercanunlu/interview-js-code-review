// Global state
let dataInterval = null;
let dataSet = [];

const tableBody = document.getElementById('data-table-body');
const graphContainer = document.getElementById('graph-container');

// Her 100ms'de bir API'den veri çeken ve tabloyu güncelleyen fonksiyon
function startDataStreaming() {
  dataInterval = setInterval(async () => {
    try {
      const response = await fetch('https://api.example.com/live-data');
      const newData = await response.json();
      
      // Veriyi global state'e ekle
      dataSet.push(newData);
      if (dataSet.length > 50) {
        dataSet.shift(); // En eski veriyi sil
      }
      
      // Tabloyu yeniden çiz
      renderTable(dataSet);
    } catch (error) {
      console.error('Failed to fetch live data:', error);
    }
  }, 100);
}

// Tabloyu render eden (çizen) fonksiyon
function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach(item => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.value}</td>
      <td>${new Date(item.timestamp).toLocaleTimeString()}</td>
    `;
  });
}

// Pencere boyutu değiştiğinde grafiği güncelleyen fonksiyon
function updateGraphSize() {
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.4;
  graphContainer.style.width = `${width}px`;
  graphContainer.style.height = `${height}px`;
}

// Pencere boyutlandırma olayına listener ekle
window.addEventListener('resize', updateGraphSize);

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
  startDataStreaming();
  updateGraphSize();
});
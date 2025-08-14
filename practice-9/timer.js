const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const counterElement = document.getElementById('counter');

let counter = 0;
let timerId = null;

function updateCounter() {
  counter++;
  counterElement.textContent = counter;
}

startButton.addEventListener('click', () => {
  if (!timerId) { // Zaten çalışıyorsa tekrar başlatmayı engellemek için
    // Her saniye sayaç güncelleniyor
    timerId = setInterval(updateCounter, 1000);

    // 10 saniye sonra sayacı durdurmak için
    setTimeout(() => {
      clearInterval(timerId);
      timerId = null;
      console.log("Counter stopped after 10 seconds.");
    }, 10000);
  }
});

stopButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    console.log("Counter stopped manually.");
  }
});
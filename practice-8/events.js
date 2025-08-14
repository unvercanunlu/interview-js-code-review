let counter = 0;
const counterElement = document.getElementById('counter');
const buttonContainer = document.getElementById('buttonContainer');
const buttons = document.querySelectorAll('.action-btn');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const action = e.target.dataset.action;

    if (action === 'increment') {
      counter++;
    } else if (action === 'decrement') {
      counter--;
    } else if (action === 'reset') {
      counter = 0;
    }

    counterElement.textContent = counter;
  });
});

// Dinamik olarak buton ekleme fonksiyonu (örnek amaçlı)
function addDynamicButton() {
  const newButton = document.createElement('button');
  newButton.textContent = 'New Button';
  newButton.classList.add('action-btn');
  newButton.dataset.action = 'noop';
  buttonContainer.appendChild(newButton);
}
// Bu fonksiyonu manuel olarak çağırarak inceleme yapabilirsin
// addDynamicButton();
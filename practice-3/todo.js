const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

let todoCount = 0;

addButton.addEventListener('click', () => {
  const newTodoText = todoInput.value.trim();
  if (newTodoText === '') {
    alert('Please enter a task.');
    return;
  }

  const newListItem = document.createElement('li');
  newListItem.innerHTML = `
    <span>${newTodoText}</span>
    <button class="delete-btn">Delete</button>
  `;

  todoList.appendChild(newListItem);
  todoInput.value = '';
  todoCount++;
  console.log(`Total todos: ${todoCount}`);

  // Sadece yeni eklenen butona event listener ekleniyor
  newListItem.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.target.parentElement.remove();
    todoCount--;
    console.log(`Total todos: ${todoCount}`);
  });
});
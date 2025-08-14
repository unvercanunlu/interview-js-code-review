const commentInput = document.getElementById('commentInput');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentsList = document.getElementById('commentsList');

addCommentBtn.addEventListener('click', () => {
  const userComment = commentInput.value;

  if (userComment.trim() === '') {
    alert('Please enter a comment.');
    return;
  }

  // Yorumu DOM'a ekle
  const newComment = document.createElement('li');
  newComment.innerHTML = `<p>${userComment}</p>`;
  commentsList.appendChild(newComment);

  commentInput.value = '';
});
const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  if (emailInput.value.trim() === '') {
    alert('Email cannot be empty.');
    isValid = false;
  } else if (!emailInput.value.includes('@')) {
    alert('Please enter a valid email address.');
    isValid = false;
  }

  if (passwordInput.value.length < 6) {
    alert('Password must be at least 6 characters.');
    isValid = false;
  }

  if (isValid) {
    console.log('Form submitted successfully!');
    // Burada sunucuya veri gönderme işlemi yapılacaktı
    registerForm.reset();
  }
});
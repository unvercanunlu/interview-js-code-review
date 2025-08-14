document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const passwordInput = document.getElementById('passwordInput');
  const password = passwordInput.value;
  const messageDiv = document.getElementById('message');

  messageDiv.textContent = 'Authenticating...';

  try {
    const response = await fetch('https://api.example.com/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: password })
    });

    if (response.ok) {
      const data = await response.json();
      messageDiv.textContent = data.message;
    } else {
      const errorData = await response.json();
      messageDiv.textContent = `Authentication failed: ${errorData.message}`;
    }
  } catch (error) {
    messageDiv.textContent = 'An error occurred. Please check your network connection.';
    console.error('Error:', error);
  }
});
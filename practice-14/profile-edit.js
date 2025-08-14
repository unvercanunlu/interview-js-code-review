const profileForm = document.getElementById('profileForm');
const bioInput = document.getElementById('bioInput');
const profileImageInput = document.getElementById('profileImageInput');
const messageDiv = document.getElementById('message');

// API'den token'ı alıyoruz
const csrfToken = getCookie('csrf_token');

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bio = bioInput.value;
  const profileImage = profileImageInput.files[0];

  const formData = new FormData();
  formData.append('bio', bio);
  if (profileImage) {
    formData.append('profile_image', profileImage);
  }

  // Güvenlik riski: Token'ı her zaman gönderiyoruz, ancak formdan bağımsız
  formData.append('csrf_token', csrfToken);

  messageDiv.textContent = 'Updating profile...';

  try {
    const response = await fetch('https://api.example.com/profile/update', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      messageDiv.innerHTML = `<span style="color: green;">Profile updated successfully!</span>`;
      console.log('Server response:', result);
    } else {
      messageDiv.innerHTML = `<span style="color: red;">Error: ${result.error}</span>`;
    }
  } catch (error) {
    messageDiv.innerHTML = `<span style="color: red;">Network error. Please try again.</span>`;
    console.error('Fetch error:', error);
  }
});
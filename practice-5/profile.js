class UserProfileManager {
  constructor(userId) {
    this.userId = userId;
    this.userProfileContainer = document.getElementById('userProfile');
    this.loadingIndicator = document.getElementById('loading');
    this.errorIndicator = document.getElementById('error');
  }

  async fetchAndRenderProfile() {
    this.loadingIndicator.style.display = 'block';
    this.errorIndicator.textContent = '';
    this.userProfileContainer.innerHTML = '';

    try {
      const response = await fetch(`https://api.example.com/users/${this.userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();

      // Kullanıcı verilerini ekranda gösterme
      const html = `
        <h2>${userData.name}</h2>
        <p>Email: ${userData.email}</p>
        <p>Joined: ${new Date(userData.joinDate).toLocaleDateString()}</p>
      `;
      this.userProfileContainer.innerHTML = html;

    } catch (error) {
      this.errorIndicator.textContent = `Error: ${error.message}`;
      console.error('Failed to fetch and render user profile:', error);
    } finally {
      this.loadingIndicator.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const userId = 123; // Örnek kullanıcı ID
  const userProfile = new UserProfileManager(userId);
  userProfile.fetchAndRenderProfile();
});
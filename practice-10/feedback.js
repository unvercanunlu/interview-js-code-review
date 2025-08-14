const feedbackForm = document.getElementById('feedbackForm');
const messageDiv = document.getElementById('message');

feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(feedbackForm);
  const feedbackText = formData.get('feedback');

  if (feedbackText.trim() === '') {
    alert('Please enter your feedback.');
    return;
  }

  // Kullanıcıya hiçbir geri bildirim vermeden API çağrısı
  try {
    const response = await fetch('https://api.example.com/submit-feedback', {
      method: 'POST',
      body: JSON.stringify({ feedback: feedbackText }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Başarılı olursa sadece formu temizle
      feedbackForm.reset();
    } else {
      // Hata olursa kullanıcıya anlaşılması zor bir hata mesajı göster
      messageDiv.textContent = 'Submission failed.';
      console.error('Server error:', response.status);
    }
  } catch (error) {
    // Ağ hatası olursa kullanıcıya hiçbir şey gösterme
    console.error('Network error:', error);
  }
});
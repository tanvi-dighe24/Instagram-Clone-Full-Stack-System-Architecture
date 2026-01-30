const API_URL = 'http://localhost:5000/api';

// 1. Handle Login and Store JWT
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.token) {
            // Store token for future API calls (MNC Standard)
            localStorage.setItem('token', data.token);
            alert('Login Successful!');
            showFeed();
        } else {
            alert('Login Failed');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// 2. Fetch Posts using the Token
async function showFeed() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('feed-section').style.display = 'block';

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/posts`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const posts = await response.json();

    const container = document.getElementById('posts-container');
    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <h4>@${post.username}</h4>
            <img src="${post.image_url}" width="100%">
            <p>${post.caption}</p>
        </div>
    `).join('');
}
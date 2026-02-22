function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}

async function handleLogin() {
    const username = document.getElementById('login-user').value;
    const password = document.getElementById('login-pass').value;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        window.location.href = 'index.html'; // Redirect to dashboard
    } else {
        alert(data.error);
    }
}

async function handleRegister() {
    const fullname = document.getElementById('reg-name').value;
    const username = document.getElementById('reg-user').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, username, email, password })
    });

    if (response.ok) {
        alert("Account created! Please login.");
        toggleAuth();
    } else {
        const data = await response.json();
        alert(data.error);
    }
}
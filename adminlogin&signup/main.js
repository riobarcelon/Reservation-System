document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('validate.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('May problema sa pag-login. Palihug sulayi pag-usab.');
    });
});
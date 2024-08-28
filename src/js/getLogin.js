document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const spanClose = document.querySelector('#errorModal .close');

    const showError = (message) => {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    };

    const hideError = () => {
        errorModal.style.display = 'none';
    };

    const showSuccess = (message, redirectUrl) => {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';

        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 2000); 
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            if (!response.ok) throw new Error('Error al obtener usuarios.');
            const users = await response.json();
            return users;
        } catch (error) {
            console.error('Error fetching user data:', error);
            showError('Error al obtener datos de usuario. Inténtalo de nuevo más tarde.');
            return [];
        }
    };

    loginButton.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showError('Por favor, ingrese ambos campos.');
            return;
        }

        try {
            const users = await fetchUsers();
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                showSuccess('Login exitoso.', 'javascrip-proyecto3/src/html/consultas.html');
            } else {
                showError('Email o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error al verificar los datos:', error);
            showError('Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.');
        }
    });

    spanClose.addEventListener('click', hideError);

    window.addEventListener('click', (event) => {
        if (event.target === errorModal) {
            hideError();
        }
    });
});



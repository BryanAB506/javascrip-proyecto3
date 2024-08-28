const btn = document.querySelector('#boton');
const formulario = document.querySelector('#formulario');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const spanClose = document.querySelector('.modal .close');

const getData = () => {
  const datos = new FormData(formulario);
  const datosProcesados = Object.fromEntries(datos.entries());
  formulario.reset();
  return datosProcesados;
};

const postData = async () => {
  const newUser = getData();

  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {
      showSuccess('Registro exitoso.');
    } else {
      showError('Error en el registro. Inténtalo de nuevo.');
    }

  } catch (error) {
    console.log(error);
    showError('Error en el registro. Inténtalo de nuevo.');
  }
};

const checkEmailExists = async (email) => {
  try {
    const response = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
    if (response.ok) {
      const users = await response.json();
      return users.length > 0;
    }
    throw new Error('Error al verificar el email');
  } catch (error) {
    console.log(error);
    showError('Error al verificar el email. Inténtalo de nuevo.');
    return false;
  }
};

const showError = (message) => {
  errorMessage.textContent = message;
  errorModal.style.display = 'block';
};

const hideError = () => {
  errorModal.style.display = 'none';
};

const showSuccess = (message) => {
  alert(message);
  setTimeout(() => {
    window.location.href = 'javascrip-proyecto3\index.html'; 
  }, 1000); 
};

const validateForm = async () => {
  const id = document.getElementById('id').value.trim();
  const name = document.getElementById('name').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  if (id === '') {
    showError('Cedula sin llenar');
    isValid = false;
  } else if (!/^\d+$/.test(id)) {
    showError('Cedula solo numeros');
    isValid = false;
  }

  if (name === '') {
    showError('Nombre sin llenar');
    isValid = false;
  }

  if (lastName === '') {
    showError('Apellido sin llenar');
    isValid = false;
  }

  if (email === '') {
    showError('Email sin llenar');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    showError('Email no valido');
    isValid = false;
  } else if (await checkEmailExists(email)) {
    showError('Email ya registrado');
    isValid = false;
  }

  if (password === '') {
    showError('Debes poner algo Contraseña');
    isValid = false;
  } else if (password.length < 6) {
    showError('Debe tener al menos 6 caracteres');
    isValid = false;
  }

  return isValid;
};

btn.addEventListener('click', async (event) => {
  event.preventDefault();
  if (await validateForm()) {
    postData();
  }
});

spanClose.addEventListener('click', hideError);

window.addEventListener('click', (event) => {
  if (event.target === errorModal) {
    hideError();
  }
});

document.getElementById('id').addEventListener('input', (event) => {
  event.target.value = event.target.value.replace(/\D/g, '');
});


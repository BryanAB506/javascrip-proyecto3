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


 

const showError = (message) => {
  errorMessage.textContent = message;
  errorModal.style.display = 'block';
};

const hideError = () => {
  errorModal.style.display = 'none';
};

const validateForm = () => {
  const id = document.getElementById('id').value.trim();
  const name = document.getElementById('name').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  if (id === '') {
    showError('Cedula is required');
    isValid = false;
  } else if (!/^\d+$/.test(id)) {
    showError('Cedula must be numeric');
    isValid = false;
  }

  if (name === '') {
    showError('Nombre is required');
    isValid = false;
  }

  if (lastName === '') {
    showError('Apellido is required');
    isValid = false;
  }

  if (email === '') {
    showError('Email is required');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    showError('Email is invalid');
    isValid = false;
  }

  if (password === '') {
    showError('Debes poner algoContraseña');
    isValid = false;
  } else if (password.length < 6) {
    showError('Contraseña must be at least 6 characters long');
    isValid = false;
  }

  return isValid;
};

btn.addEventListener('click', (event) => {
  event.preventDefault();
  if (validateForm()) {
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

  
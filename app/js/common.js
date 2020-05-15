document.addEventListener('DOMContentLoaded', function(){
  const cartButton = document.querySelector('#cart-button');
  const modal = document.querySelector('.modal');
  const close = document.querySelector('.close');

  cartButton.addEventListener('click', toggleModal);
  close.addEventListener('click', toggleModal);

  function toggleModal() {
    modal.classList.toggle('is-open');
  }
});

// Авторизация
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('Delivey');

// Добавление класса
function toogleModalAuth() {
  modalAuth.classList.toggle('is-open');
};

// Когда пользователь авторизован
function authorized() {
  // Выйти из системы
  function logOut() {
    login = null;
    localStorage.removeItem('Delivey');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  };
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
};

// Когда пользователь не авторизован
function notAuthorized() {
  // Вход, запоминание логина при входе
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('Delivey', login);

    toogleModalAuth();
    // При клике на кнопку войти открывается модальное окно
    buttonAuth.removeEventListener('click', toogleModalAuth);
    // Закрытие модального окна
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  };
  // При клике на кнопку войти открывается модальное окно
  buttonAuth.addEventListener('click', toogleModalAuth);
  // Закрытие модального окна
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn)
};
// Проверка Авторизован или нет пользователь
function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};
checkAuth();

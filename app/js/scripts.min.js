document.addEventListener('DOMContentLoaded', function(){
const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('Delivey');

// Получение данных
const getData = async function(url) {
  const responce = await fetch(url);
  if (!responce.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${responce.status}`)
  }
  return await responce.json();
};

getData('./db/partners.json');

// Авторизация

// Добавление класса
function toggleModal() {
  modal.classList.toggle('is-open');
};

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


// Создание карточки ресторана
function createCardRestaurant({
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery: timeOfDelivery
  }
  ) {
  const card = `
  <a class="card card-restaurant" data-products="${products}">
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  </a>
  `;
  cardsRestaurants.insertAdjacentHTML('beforeend', card);
};

function createCardGood({ description, id, image, name, price }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card)
};

// Открытие карточки магазина
function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if (restaurant) {
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    getData(`./db/${restaurant.dataset.products}`).then(function(data){
      data.forEach(createCardGood);
    });

  } else {
    toogleModalAuth();
  }
};

function init() {
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant)
  });

  cardsRestaurants.addEventListener('click', openGoods);
  // При клике на лого происходит возвращение на главную страницу
  logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });
  cartButton.addEventListener('click', toggleModal);
  close.addEventListener('click', toggleModal);

  checkAuth();
};
init();

});

const cartToggleButton = document.getElementById("cartToggleButton");
const cartContainer = document.getElementById("floatingCart");
const burgerButtonToggle = document.querySelector('.navbar-header__toggle');
const navLinks = document.querySelector('.navbar-header__links');
let cart = [];


function renderAllDishes() {
  const contentRef = document.getElementById('dishesContent');

  const dishesHtml = dishes.map((categoryObj, indexCategory) =>
    createDishesHtml(categoryObj, indexCategory)).join('');

  contentRef.innerHTML = dishesHtml;
}


function findDishById(itemId) {
  const allDishes = dishes.flatMap(categoryObj => categoryObj.items);

  return allDishes.find(dish => dish.id === itemId);
}


function addDishToCart(itemId) {
  const foundItem = findDishById(itemId);

  if (!foundItem) return;

  const existingItem = cart.find(item => item.id === itemId);

  if (existingItem) {
    existingItem.quantity++;

  } else {
    cart.push({ ...foundItem, quantity: 1 });
  }

  renderCart();
  updateCartCount();
  saveToLocalStorage();
}


function registerAddToCartButtons() {
  const dishesContainer = document.getElementById('dishesContent');

  dishesContainer.addEventListener('click', (clickEvent) => {
    const button = clickEvent.target.closest('.dishes-content__card-button');
    if (!button) return;

    const itemId = button.getAttribute('data-item-id');
    addDishToCart(itemId);
  });
}


function renderCart() {
  const cartContainer = document.querySelector(".cart-panel__info");

  if (cart.length === 0) {
    cartContainer.innerHTML = emptyCartTemplate();
    return;
  }

  const itemsHtml = cart.map(item => cartItemTemplate(item)).join("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartContainer.innerHTML = cartSummaryTemplate(itemsHtml, total);
}


function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "flex" : "none";

  void cartCount.offsetWidth;
}


cartToggleButton.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});


cartContainer.addEventListener("click", (clickEvent) => {
  if (window.innerWidth <= 920 && clickEvent.target === cartContainer) {
    cartContainer.classList.remove("active");
  }
});


burgerButtonToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  const icon = burgerButtonToggle.querySelector('i');

  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});


function saveToLocalStorage() {
  localStorage.setItem("urbanEatsData", JSON.stringify(cart));
}

function getFromLocalStorage() {
  let stored = JSON.parse(localStorage.getItem("urbanEatsData"));

  if (stored !== null) {
    cart = stored;

  }
}


document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage(cart);
  renderAllDishes();
  registerAddToCartButtons();
  renderCart();
  updateCartCount();
})



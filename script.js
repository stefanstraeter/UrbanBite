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



function registerCartItemButtons() {
  // 1. Container der Cart Items
  const cartContainer = document.querySelector(".cart-panel__info");

  // 2. Klick-Event auf den Container (Event Delegation)
  cartContainer.addEventListener("click", (e) => {

    // 3. Prüfen, ob wir auf ein Cart Item geklickt haben
    const itemEl = e.target.closest(".cart__item");
    if (!itemEl) return; // Klick außerhalb eines Items → nichts tun

    // 4. ID des Items auslesen
    const id = itemEl.dataset.id;

    // 5. Das Item im Cart Array finden (string vs number beachten)
    const item = cart.find(i => i.id.toString() === id);
    if (!item) return; // Absicherung, falls Item nicht gefunden wird

    // 6. Prüfen, welcher Button geklickt wurde
    if (e.target.closest(".cart__item-plus")) {
      // Plus → Menge erhöhen
      item.quantity++;

    } else if (e.target.closest(".cart__item-minus")) {
      // Minus → Menge verringern
      item.quantity--;

      // Wenn Menge 0 oder kleiner → Item komplett entfernen
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id.toString() !== id);
      }

    } else if (e.target.closest(".cart__item-remove")) {
      // Remove Button → Item löschen
      cart = cart.filter(i => i.id.toString() !== id);
    }

    // 7. Cart neu rendern, Counter aktualisieren und speichern
    renderCart();
    updateCartCount();
    saveToLocalStorage();
  });
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
  const stored = JSON.parse(localStorage.getItem("urbanEatsData"));

  if (stored !== null) {
    cart = stored;

  }
}


document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage(cart);
  renderAllDishes();
  registerAddToCartButtons();
  renderCart();
  registerCartItemButtons()
  updateCartCount();
})



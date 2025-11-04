let cart = [];

const cartToggleButton = document.getElementById("cartToggleButton");
const cartContainer = document.getElementById("floatingCart");
const burgerButtonToggle = document.querySelector('.navbar-header__toggle');
const navLinks = document.querySelector('.navbar-header__links');
const orderToggle = document.getElementById("order-toggle");


function renderAllDishes() {
  const contentRef = document.getElementById('dishesContent');

  let dishesHtml = '';
  dishes.forEach(categoryDishes => {
    dishesHtml += createDishesHtml(categoryDishes);
  });

  contentRef.innerHTML = dishesHtml;
}


function renderCart() {
  const cartPanel = document.querySelector(".cart-panel__info");

  if (cart.length === 0) {
    cartPanel.innerHTML = emptyCartTemplate();
    return;
  }

  let itemsHTML = '';
  cart.forEach(cartItem => {
    itemsHTML += cartItemTemplate(cartItem);
  });

  let subtotal = 0;
  cart.forEach(cartItem => {
    subtotal += cartItem.price * cartItem.quantity;
  });

  const orderToggle = document.getElementById("order-toggle");
  const isDelivery = orderToggle.checked;

  cartPanel.innerHTML = `
    <div class="cart__items">
      ${itemsHTML}
    </div>
    ${cartSummaryTemplate(subtotal, isDelivery)}
  `;
}



function updateCartCountBadge() {
  const cartCount = document.querySelector(".cart-count");

  let totalItems = 0;
  cart.forEach(cartItem => {
    totalItems += cartItem.quantity;
  });

  cartCount.textContent = totalItems;

  if (totalItems > 0) {
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }

  void cartCount.offsetWidth;
}


function findDishById(itemId) {
  let allDishes = [];

  dishes.forEach(categoryDishes => {
    categoryDishes.items.forEach(dishItem => {
      allDishes.push(dishItem);
    });
  });

  const foundDish = allDishes.find(dish => dish.id === itemId);
  return foundDish;
}


function addDishToCart(itemId) {
  const foundDish = findDishById(itemId);
  if (!foundDish) return;

  const existingItem = cart.find(cartItem => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newCartItem = { ...foundDish, quantity: 1 };
    cart.push(newCartItem);
  }

  renderCart();
  updateCartCountBadge();
  saveToLocalStorage();
}


function updateCartItem(cartItem, itemId, action) {
  if (action === "plus") cartItem.quantity++;
  if (action === "minus") cartItem.quantity--;
  if ((action === "minus" && cartItem.quantity <= 0) || action === "remove") {
    cart = cart.filter(item => item.id !== itemId);
  }

  renderCart();
  updateCartCountBadge();
  saveToLocalStorage();
}


function registerAddToCartButtons() {
  const dishesContainer = document.getElementById('dishesContent');

  dishesContainer.addEventListener('click', (clickEvent) => {
    const addButton = clickEvent.target.closest('.dishes-content__card-button');
    if (!addButton) return;

    const itemId = addButton.getAttribute('data-item-id');

    addDishToCart(itemId);
  });
}


function registerCartItemButtons() {
  const cartPanel = document.querySelector(".cart-panel__info");

  cartPanel.addEventListener("click", (clickEvent) => {
    const item = clickEvent.target.closest(".cart__item");
    if (!item) return;

    const itemId = item.dataset.id;
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    const action = clickEvent.target.closest(".cart__item-plus") ? "plus" :
      clickEvent.target.closest(".cart__item-minus") ? "minus" :
        clickEvent.target.closest(".cart__item-remove") ? "remove" :
          null;

    if (!action) return;

    updateCartItem(cartItem, itemId, action);
  });
}


function saveToLocalStorage() {
  localStorage.setItem("urbanEatsData", JSON.stringify(cart));
}


function getFromLocalStorage() {
  const stored = JSON.parse(localStorage.getItem("urbanEatsData"));

  if (stored !== null) {
    cart = stored;

  }
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


orderToggle.addEventListener("change", () => {
  renderCart();
});


document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.classList.contains("cart__summary-order-btn")) {

    cart = [];
    renderCart();
    updateCartCountBadge();
    saveToLocalStorage();

    const overlay = document.createElement("div");
    overlay.classList.add("cart__order-overlay");
    overlay.innerHTML = orderButtonOverlay();
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
    }, 3000);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  getFromLocalStorage(cart);
  renderAllDishes();
  registerAddToCartButtons();
  renderCart();
  registerCartItemButtons()
  updateCartCountBadge();
})



let cart = [];

const cartToggleButton = document.getElementById("cartToggleButton");
const cartContainer = document.getElementById("floatingCart");
const burgerButtonToggle = document.querySelector('.navbar-header__toggle');
const navLinks = document.querySelector('.navbar-header__links');
const orderToggle = document.getElementById("order-toggle");
const cartPanel = document.querySelector(".cart-panel__info");
const contentRef = document.getElementById('dishesContent');
const cartCount = document.querySelector(".cart-count");
const dishesContainer = document.getElementById('dishesContent');


function renderAllDishes() {
  let dishesHtml = '';

  dishes.forEach(category => {
    const id = generateCategoryId(category.category)
    dishesHtml += createDishesHtml(category, id);
  });

  contentRef.innerHTML = dishesHtml;
}


function generateCategoryId(categoryName) {
  return categoryName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, '')
    .replace(/[^\w]/g, '');
}


function renderCart() {
  if (cart.length === 0) {
    cartPanel.innerHTML = emptyCartTemplate();
    return;
  }

  let itemsHTML = '';
  cart.forEach(cartItem => itemsHTML += cartItemTemplate(cartItem));

  let subTotal = 0;
  cart.forEach(subTotalitem => subTotal += subTotalitem.price * subTotalitem.quantity);

  subTotal = subTotal.toFixed(2).replace(".", ",");

  const isDelivery = orderToggle.checked;

  const delivery = (isDelivery ? 4.9 : 0).toFixed(2).replace(".", ",");
  const total = (parseFloat(subTotal.replace(",", ".")) + parseFloat(delivery.replace(",", "."))).toFixed(2).replace(".", ",");

  cartPanel.innerHTML = `
    <div class="cart__items">
      ${itemsHTML}
    </div>
    ${cartSummaryTemplate(subTotal, delivery, total)}
  `;
}


function updateCartCountBadge() {
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
  dishesContainer.addEventListener('click', (clickEvent) => {
    const addButton = clickEvent.target.closest('.dishes-content__card-button');
    if (!addButton) return;

    addButton.classList.add('dishes-content__card-button--clicked');

    setTimeout(() => {
      addButton.classList.remove('dishes-content__card-button--clicked');
    }, 150);

    const itemId = addButton.getAttribute('data-item-id');
    addDishToCart(itemId);
  });
}


function registerCartItemButtons() {
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


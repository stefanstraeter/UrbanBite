
function createDishesHtml(categoryDishes, id) {
  let itemsHTML = '';
  categoryDishes.items.forEach(item => {
    itemsHTML += `
      <div class="dishes-content__card">
        <img class="dishes-content__card-img" src="${item.src}" />
        <button class="dishes-content__card-button" data-item-id="${item.id}" onclick="">
          <i class="fa-solid fa-plus"></i>
          <span class="ml-xs">Add to Cart</span>
        </button>
        <div class="dishes-content__card-info p-md">
          <div class="dishes-content__card-name">${item.name}</div>
          <div class="dishes-content__card-description">${item.description}</div>
          <div class="dishes-content__card-price">
            ${item.price.toFixed(2).toString().replace(".", ",")} €
          </div>
        </div>
      </div>
    `;
  });

  return `
    <section class="dishes-content__category mt-2xl" id="${id}">
      <h2 class="dishes-content__category-title">${categoryDishes.category}</h2>
      ${itemsHTML}
    </section>
  `;
}


function emptyCartTemplate() {
  return `
      <h3>Fill your basket</h3>
      <span>Your basket is empty</span>
    `;
}


function cartItemTemplate(cartItem) {
  return `
    <div class="cart__item" data-id="${cartItem.id}">
      <div class="cart__item-name">
        <span>${cartItem.name}</span>
        <button class="cart__item-remove" aria-label="Remove item">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="cart__item-controls">
        <div>
          <button class="cart__item-minus" aria-label="Reduce quantity">
            <i class="fa-regular fa-square-minus"></i>
          </button>
          <span class="cart__item-quantity">${cartItem.quantity}</span>
          <button class="cart__item-plus" aria-label="Increase quantity">
            <i class="fa-regular fa-square-plus"></i>
          </button>
        </div>
        <div class="cart__item-total">${(cartItem.price * cartItem.quantity).toFixed(2).replace(".", ",")} €</div>
      </div>
    </div>
    `;
}


function cartSummaryTemplate(subTotal, delivery, total) {
  return `
    <div class="cart__summary">
      <div class="cart__summary-items">
        <span>Subtotal:</span>
        <span>${subTotal} €</span>
      </div>
      <div class="cart__summary-items">
        <span>Delivery:</span>
        <span>${delivery} €</span>
      </div>
      <div class="cart__summary-items">
        <span>Total:</span>
        <span>${total} €</span>
      </div>

      <button class="cart__summary-order-btn">Order now</button>
    </div>
  `;
}

function orderButtonOverlay() {
  return `
    <div class="cart__order-overlay__content">
      <img src="assets/gif/wearecooking.gif" alt="Thank you for your order" />
      <p>Yum! We're cooking up your order…</p>
    </div>
    `;
}

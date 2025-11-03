
function createDishesHtml(categoryObj) {
  const id = categoryObj.category

    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, '')
    .replace(/[^\w]/g, '');

  const itemsHTML = categoryObj.items.map(item => `
    <div class="dishes-content__card">
        <img class="dishes-content__card-img" src="${item.src}" />
        <button class="dishes-content__card-button" data-item-id="${item.id}">
           <i class="fa-solid fa-plus"></i>
            <span class="ml-xs">Add to Cart</span>
        </button>
        <div class="dishes-content__card-info p-md">
            <div class="dishes-content__card-name">${item.name}</div>
            <div class="dishes-content__card-description">${item.description}</div>
            <div class="dishes-content__card-price">${item.price.toFixed(2).toString().replace(".", ",")} €</div>
        </div>
     </div> 
    `).join('');

  return `
    <section class="dishes-content__category mt-2xl" id="${id}">
        <h2 class="dishes-content__category-title">${categoryObj.category}</h2>
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


function cartItemTemplate(item) {
  return `
      <div class="cart__item" data-id="${item.id}">
      <div class="cart__item-name">
        <span>${item.name}</span>
        <button class="cart__item-remove" aria-label="Remove item">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="cart__item-controls">
        <div>
          <button class="cart__item-minus" aria-label="Reduce quantity">
            <i class="fa-regular fa-square-minus"></i>
          </button>
          <span class="cart__item-quantity">${item.quantity}</span>
          <button class="cart__item-plus" aria-label="Increase quantity">
           <i class="fa-regular fa-square-plus"></i>
          </button>
        </div>
        <div class="cart__item-total">${(item.price * item.quantity).toFixed(2).replace(".", ",")} €</div>
      </div>
    </div> 
    `;
}


function cartSummaryTemplate(itemsHtml, total) {
  return `
      <div>${itemsHtml}</div>
      <hr>
       <div class="cart__summary">
          <div class="cart__summary-items">
            <span>Subtotal:</span>
            <span>${total.toFixed(2).replace(".", ",")} €</span>
          </div>
          <div class="cart__summary-items">
            <span>Delivery:</span>
            <span>4,90 €</span>
          </div>
          <div class="cart__summary-items">
            <span>Total:</span>
            <span>${total.toFixed(2).replace(".", ",")} €</span>
          </div>
       </div>
      
    `;
}
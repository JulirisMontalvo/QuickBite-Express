// SELECT ELEMENTS FOR SCREEN 1 & 2:
const startBtn = document.getElementById("start-order-btn");
const screen1 = document.getElementById("screen-1");
const screen2 = document.getElementById("screen-2");

// EVENT LISTENER FOR START BUTTON:
startBtn.addEventListener("click", function() {
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");
});

// SELECT SCREEN 3 & MENU ELEMENTS:
const screen3 = document.getElementById("screen-3");
const selectedRestaurantTitle = document.getElementById("selected-restaurant-title");
const menuSubtitle = document.getElementById("menu-subtitle");
const menuContainer = document.getElementById("menu-container");
const menuTotalPriceDisplay = document.getElementById("menu-total-price");
const receiptTotalPriceDisplay = document.getElementById("receipt-total-price");

// SELECT LOCATION CARDS:
const burgerKingCard = document.getElementById("card-burger-king");
const schoolCafeCard = document.getElementById("card-school-cafe");
const sunsPizzaCard = document.getElementById("card-suns-pizza");

// EXACT MENUS, PRICES, AND IMAGES FROM YOUR CANVA DESIGN:
const restaurantMenus = {
  "BURGER KING": [
    { name: "Whopper", price: 6.09, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" },
    { name: "Drink", price: 3.19, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&q=80" },
    { name: "Nuggets", price: 2.30, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&q=80" },
    { name: "Fries", price: 3.00, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80" }
  ],
  "SUNS PIZZA": [
    { name: "Chicken Wings", price: 17.00, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&q=80" },
    { name: "Burger", price: 8.50, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&q=80" },
    { name: "Drink", price: 2.00, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80" },
    { name: "Pizza slice + soda combo", price: 6.00, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&q=80" }
  ],
  "SCHOOL CAFE": [
    { name: "Fried Chicken", price: 0.00, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&q=80" },
    { name: "Sub Sandwich", price: 0.00, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&q=80" },
    { name: "Burger", price: 0.00, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&q=80" },
    { name: "Slice of Pizza", price: 0.00, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80" }
  ]
};

// CART & PRICE TRACKING:
let cart = {};
let currentPrices = {};
let currentRestaurant = "";

// HELPER FUNCTION: Calculate total price across all ordered items
function calculateGrandTotal() {
  let grandTotal = 0;
  for (let name in cart) {
    if (cart[name] > 0) {
      grandTotal += cart[name] * currentPrices[name];
    }
  }
  return grandTotal.toFixed(2);
}

// HELPER FUNCTION: Get total count of all items in cart
function getTotalCartItemCount() {
  let count = 0;
  for (let name in cart) {
    count += cart[name];
  }
  return count;
}

// FUNCTION TO OPEN SPECIFIC RESTAURANT MENU:
function openMenu(restaurantName) {
  currentRestaurant = restaurantName;

  // Hide Screen 2 and show Screen 3
  screen2.classList.add("hidden");
  screen3.classList.remove("hidden");
  
  // Update header text to show chosen restaurant
  selectedRestaurantTitle.textContent = restaurantName;

  // Show helpful hint if School Cafe is chosen
  if (restaurantName === "SCHOOL CAFE") {
    menuSubtitle.textContent = "Select 1 free item for your lunch!";
  } else {
    menuSubtitle.textContent = "Choose your meal of choice";
  }

  // Reset cart data & displays
  cart = {};
  currentPrices = {};
  menuContainer.innerHTML = "";
  menuTotalPriceDisplay.textContent = "0.00";

  // Load unique menu items for selected restaurant
  const itemsList = restaurantMenus[restaurantName];

  itemsList.forEach(item => {
    cart[item.name] = 0;
    currentPrices[item.name] = item.price;

    const priceText = item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`;

    // Create item HTML element with item thumbnail image!
    const itemCard = document.createElement("div");
    itemCard.className = "menu-item";
    itemCard.setAttribute("data-name", item.name);
    itemCard.innerHTML = `
      <div class="item-left">
        <img src="${item.image}" alt="${item.name}" class="menu-item-img">
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="price">${priceText}</span>
        </div>
      </div>
      <div class="quantity-controls">
        <button type="button" class="qty-btn btn-minus">-</button>
        <span class="qty-count">0</span>
        <button type="button" class="qty-btn btn-plus">+</button>
      </div>
    `;

    // Attach quantity event listeners to '+' and '-' buttons
    const minusBtn = itemCard.querySelector(".btn-minus");
    const plusBtn = itemCard.querySelector(".btn-plus");
    const countDisplay = itemCard.querySelector(".qty-count");

    plusBtn.addEventListener("click", function(event) {
      event.stopPropagation();

      // SCHOOL CAFE RESTRICTION: Maximum 1 total item allowed!
      if (currentRestaurant === "SCHOOL CAFE" && getTotalCartItemCount() >= 1) {
        alert("School Cafe rules: You can only select 1 free item per order!");
        return;
      }

      cart[item.name]++;
      countDisplay.textContent = cart[item.name];
      itemCard.classList.add("selected");
      menuTotalPriceDisplay.textContent = calculateGrandTotal();
    });

    minusBtn.addEventListener("click", function(event) {
      event.stopPropagation();
      if (cart[item.name] > 0) {
        cart[item.name]--;
        countDisplay.textContent = cart[item.name];
      }
      if (cart[item.name] === 0) {
        itemCard.classList.remove("selected");
      }
      menuTotalPriceDisplay.textContent = calculateGrandTotal();
    });

    menuContainer.appendChild(itemCard);
  });
}

// EVENT LISTENERS FOR LOCATION CARDS:
burgerKingCard.addEventListener("click", function() { openMenu("BURGER KING"); });
schoolCafeCard.addEventListener("click", function() { openMenu("SCHOOL CAFE"); });
sunsPizzaCard.addEventListener("click", function() { openMenu("SUNS PIZZA"); });

// =========================================================
// SCREEN 4 — CHECKOUT FORM, VALIDATION & RECEIPT
// =========================================================

const screen4 = document.getElementById("screen-4");
const readyOrderBtn = document.getElementById("ready-order-btn");

readyOrderBtn.addEventListener("click", function() {
  screen3.classList.add("hidden");
  screen4.classList.remove("hidden");
});

const checkoutForm = document.getElementById("checkout-form");
const formErrorMsg = document.getElementById("form-error-msg");
const orderConfirmation = document.getElementById("order-confirmation");
const confirmationDetails = document.getElementById("confirmation-details");
const resetAppBtn = document.getElementById("reset-app-btn");

// EVENT LISTENER FOR FORM SUBMISSION:
checkoutForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const customerName = document.getElementById("customer-name").value.trim();
  const pickupTime = document.getElementById("pickup-time").value;
  
  // FEATURE 13: Read special instructions input
  const orderNotes = document.getElementById("order-notes").value.trim();

  let totalItemsCount = 0;
  let orderSummaryText = [];

  for (let name in cart) {
    if (cart[name] > 0) {
      totalItemsCount += cart[name];
      orderSummaryText.push(`${cart[name]}x ${name}`);
    }
  }

  if (totalItemsCount === 0) {
    formErrorMsg.textContent = "Please select at least 1 menu item before checking out!";
    formErrorMsg.classList.remove("hidden");
    return;
  }

  if (customerName === "" || customerName.length < 2) {
    formErrorMsg.textContent = "Please enter your full name (at least 2 letters).";
    formErrorMsg.classList.remove("hidden");
    return;
  }

  if (pickupTime === "") {
    formErrorMsg.textContent = "Please select a valid pickup time.";
    formErrorMsg.classList.remove("hidden");
    return;
  }

  formErrorMsg.classList.add("hidden");

  // Format optional notes for receipt display
  let notesText = orderNotes !== "" ? ` (Notes: "${orderNotes}")` : "";

  confirmationDetails.textContent = `Thank you, ${customerName}! Your order of (${orderSummaryText.join(", ")}) from ${selectedRestaurantTitle.textContent} will be ready at ${pickupTime}.${notesText}`;
  receiptTotalPriceDisplay.textContent = calculateGrandTotal();

  checkoutForm.classList.add("hidden");
  orderConfirmation.classList.remove("hidden");
});

// RESET BUTTON LISTENER (START OVER):
resetAppBtn.addEventListener("click", function() {
  checkoutForm.reset();
  cart = {};
  currentPrices = {};
  menuTotalPriceDisplay.textContent = "0.00";
  receiptTotalPriceDisplay.textContent = "0.00";

  orderConfirmation.classList.add("hidden");
  checkoutForm.classList.remove("hidden");
  screen4.classList.add("hidden");
  screen1.classList.remove("hidden");
});
let selectedItem;

const homePage = document.getElementById('home-page');
const paymentPage = document.getElementById('payment-page');
const selectButtons = document.querySelectorAll('.select-btn');

selectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    checkIfPressed();
    showCheckout();
  })
})

const setSelectedItem = (itemNumber) => {
  selectedItem = itemNumber;
}

const showCheckout = () => {
  const foundCheckout = document.getElementById('checkout');
  const checkOutElement = document.createElement('div');

  if (foundCheckout) return;

  checkOutElement.innerHTML =
    `<div id="checkout">
      <h3>Proceed to Payment</h3>
      <button id="checkOutButton" onclick="checkOut()">Checkout</button>
     </div>`;

  homePage.append(checkOutElement);
}

const checkOut = () => {
  const foundPayment = document.getElementById('payment');
  const paymentElement = document.createElement('div');
  const book = document.getElementById(`choice${selectedItem}`);

  paymentElement.innerHTML =
    `<div id="payment">
      <div id="payment-header">
        <h2>Louie's Startup</h2>
        <img id="banner-logo" src="html-logo.png" />
        <hr />
      </div> 
      <div id="body">
        <div id="book-details"></div>
        ${book.innerHTML}
      </div>
    </div>`

  paymentPage.append(paymentElement);
}

const checkIfPressed = () => {

  for (let i = 1; i <= selectButtons.length; i++) {
    if (i == selectedItem) {
      selectButtons[i - 1].style.backgroundColor = 'green';
      selectButtons[i - 1].style.color = 'white';
    }
    else {
      selectButtons[i - 1].style.backgroundColor = 'white';
      selectButtons[i - 1].style.color = 'black';
    }
  }
}

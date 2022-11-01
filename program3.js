let selectedItem = null;

const homePage = document.getElementById('home-page');
const paymentPage = document.getElementById('payment-page');

// Using a list of objects to store the book details, makes it more dynamic for DOM manipulation
const items = [
  {
    title: `Python Crash Course, 2nd Edition: A Hands-On, Project-Based Introduction to Programming 2nd Edition`,
    price: 14.80,
    source: 'python-crash-course.jpg',
    availability: 'Limited',
    author: 'Eric Matthes',
    ratings: '7, 630',
    genre: 'python'
  },
  {
    title: 'HTML and CSS: Design and Build Websites 1st Edition',
    price: 13.90,
    source: 'html-css.jpg',
    availability: 'In Stock',
    author: 'Jon Duckett',
    ratings: '4, 162',
    genre: 'html, css'
  },
  {
    title: `JavaScript: The Definitive Guide: Master the World's Most-Used
            Programming Language 7th Edition`,
    price: 20.12,
    source: 'javascript.jpg',
    availability: 'In Stock',
    author: 'David Flanagan',
    ratings: '1, 094',
    genre: 'javascript'
  },
  {
    title: 'Let the app decide for me',
    price: '???',
    source: 'red-random.png',
    availability: '???',
    author: '???',
    ratings: '???',
    genre: '???'
  }
]

const choiceContainer = document.getElementById('choice-container');

// When the script loads, the choice container will be filled with elements of 
// the book objects
for (let i = 0; i < items.length; i++) {
  const newItem = document.createElement('div');

  newItem.id = `choice${i + 1}`;
  newItem.className = 'choice';
  newItem.innerHTML =
    `<img class="thmb" src="${items[i].source}" alt="" />
      <div class="item-info">
        <div class="item-info-top">
          <h4>${items[i].title}</h4>
        </div>
        <div class="item-info-bot">
          <h3>$${items[i].price}</h3>
          <button class="select-btn" onclick="setSelectedItem(${i + 1})">
            Select
          </button>
        </div>
      </div>`;

  choiceContainer.append(newItem);
}

const selectButtons = document.querySelectorAll('.select-btn');

// Assigning functions that are triggered when user selects a book
selectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    checkIfPressed();
    showPreview();
    showCheckout();
  })
})

// The app remembers the last item that the user had selected
const setSelectedItem = (itemNumber) => {
  selectedItem = itemNumber;
}

const checkIfPressed = () => {

  for (let i = 1; i <= selectButtons.length; i++) {
    if (i == selectedItem) {
      selectButtons[i - 1].style.backgroundColor = 'green';
    }
    else {
      selectButtons[i - 1].style.backgroundColor = '#457B9D';
    }
  }
}

const showPreview = () => {
  const book = items[selectedItem - 1];
  const title = document.getElementById('book-preview-title');
  const image = document.getElementById('book-preview-img');
  const details = document.getElementById('book-preview-bot');

  title.innerText = book.title;
  title.style.fontSize = '20px'

  image.src = book.source;
  image.style.width = '400px';
  image.style.maxHeight = '500px';

  details.innerHTML =
    `<div class="book-details-half">
      <h4 class="book-details">Price: $${book.price}</h4>
      <h4 class="book-details">Status: ${book.availability}</h4>
    </div>
    <div class="book-details-half">
      <h4 class="book-details">Author: ${book.author}</h4>
      <h4 class="book-details">Genre: ${book.genre}</h4>
      <h4 class="book-details">Ratings: ${book.ratings}</h4>
    </div>`;
}

const showCheckout = () => {
  const foundCheckout = document.getElementById('checkout');
  const checkOutElement = document.createElement('div');

  // Fool proofing for less bugs
  if (foundCheckout) return;
  if (!selectedItem) return;

  checkOutElement.id = 'checkout';
  checkOutElement.innerHTML =
    `<h3>Proceed to Payment</h3>
    <button id="checkout-button" onclick="checkOut()">Checkout</button>`;

  homePage.append(checkOutElement);
}

const checkOut = () => {
  if (selectedItem == 4) selectedItem = Math.round(1 + Math.random() * (3 - 1));

  const foundPayment = document.getElementById('payment');
  const paymentElement = document.createElement('div');
  const book = items[selectedItem - 1];

  if (foundPayment) return;

  paymentElement.id = 'payment';
  paymentElement.innerHTML =
    `<div id="payment-header">
      <img id="banner-logo" src="html-logo.png" />
      <h2 id="banner-text">Louie's Startup</h2>
      <button id="exit-payment-btn" onclick="removePayment()">&#10060;</button>
    </div> 
    <div style="height: 5px; background-color: #A8DADC;"></div>
    <div id="payment-body">
      <div id="book-details">
        <img id="book-to-buy" src="${book.source}" />
        <div id="book-to-buy-details">
          <h1>${book.title}</h1>
          <h2>$${book.price}</h2>
        </div>
      </div>
      <div id="payment-method">
        <div id="money-input">
          <label id="input-label">Input Money: </label>
          <input type="number" id="money-input-field" />
        </div>
        <button id="submit-money-btn" onclick="processPayment()">Buy</button>
      </div>
    </div>`;

  paymentPage.append(paymentElement);
}

const processPayment = () => {
  const moneyPaid = Number(document.getElementById('money-input-field').value);
  const book = items[selectedItem - 1];
  const sufficientBalance = moneyPaid >= Number(book.price);
  const paymentResult = document.createElement('div');
  const paymentBody = document.getElementById('payment-body');
  const paymentMethod = document.getElementById('payment-method');
  const foundPaymentResult = document.getElementById('payment-result');

  // This prevents the receipt from being created more than once
  // This deletes the previous receipt
  if (foundPaymentResult) paymentBody.removeChild(foundPaymentResult);

  paymentResult.id = 'payment-result';

  // Generates a receipt from the result of the payment transaction

  if (sufficientBalance) {
    paymentResult.className = 'success';

    paymentResult.innerHTML =
      `<div id="payment-details">
        <div id="payment-result-header">
          <h1>Payment Received!</h1>
          <img id="payment-result-logo" src="check.png" />
        </div>
        <h2>Amount Due: $${book.price}</h2>
        <h2>Amount Paid: $${moneyPaid}</h2>
        <h2>Change: $${Math.round(100 * (moneyPaid - Number(book.price))) / 100}</h2>
      </div>
      <div id="payment-button-container">
        <button id="receipt-btn" onclick="printReceipt(${moneyPaid})">Print Receipt</button>
      </div>`;

    paymentBody.removeChild(paymentMethod);
  } else {
    paymentResult.innerHTML =
      `<div id="payment-result-header">
        <h1 id="low-balance-warning">You have insufficient balance!</h1>
        <img id="payment-result-logo" src="warning.png" />
      </div>
      <h2>Please Try Again</h2>`;
  }

  paymentBody.append(paymentResult);
}

const printReceipt = (moneyPaid) => {
  const book = items[selectedItem - 1];
  const printWindow = window.open('', '', 'height=700', 'width=600');
  const text =
    `<div id="payment-header">
      <img id="banner-logo" src="html-logo.png" />
      <h2 id="banner-text">Louie's Startup</h2>
    </div> 
    <div id="payment-result">
      <div id="payment-details">
        <div id="payment-result-header">
          <h1>Payment Received!</h1>
          <img id="payment-result-logo" src="check.png" />
        </div>
        <h2>${book.title}</h2>
        <h2>Amount Due: $${book.price}</h2>
        <h2>Amount Paid: $${moneyPaid}</h2>
        <h2>Change: $${Math.round(100 * (moneyPaid - Number(book.price))) / 100}</h2>
      </div>
    </div>
    
    <style>
      #payment-header {
        display: flex;
        flex-direction: row;
        margin-left: 110px;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: start;
      }

      #payment-body {
        padding: 20px;
        overflow-y: scroll;
        max-width: 700px;
      }

      #banner-logo {
        width: 70px;
        border-radius: 50%;
        margin-left: -100px;
      }

      #banner-text {
        margin-left: 20px;
      }

      #payment-result {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        padding: 20px;

        border: 2px;
        border-style: solid;
        border-radius: 5px;
        background-color: aliceblue;
      }

      #payment-result-header {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      #payment-result-logo {
        width: 40px;
        margin-left: 10px;
      }

      .success {
        flex-direction: row;
      }
    </style>`;

  // CSS is included in making a document element for the second 
  // window in printing since a new window instance cannot read the css of 
  // the previous window instance

  printWindow.document.write(text);
  printWindow.document.close();
  printWindow.print();
}

const removePayment = () => {
  const paymentElement = document.getElementById('payment');
  const checkOutElement = document.getElementById('checkout');

  paymentPage.removeChild(paymentElement);
  homePage.removeChild(checkOutElement);

  removeSelectedItem();
}

const removeSelectedItem = () => {
  selectButtons.forEach((button) => {
    button.style.backgroundColor = '#457B9D';
    button.style.color = '#F1FAEE';
  })
  selectedItem = null;
}
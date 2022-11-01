let choice;
let numToGuess;
let lives = 3;
let correctGuess = 0;
let tryIndex = 1;
let activeButton;
let currentGameRow = 1;

const rightBottom = document.getElementById('right-bottom');
const livesDisplay = document.getElementById('lives');
const triesToWinDisplay = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const tbody = document.getElementById('tbody');
const dice = document.getElementById('dice');
const diceResultLabel = document.getElementById('dice-result-label');
const rightContainer = document.getElementById('right-container');

const setChoice = (input) => {
  choice = input
}

const setDieSide = () => {
  numToGuess = Math.round(1 + Math.random() * (6 - 1));
  rollDice();
}

const rollDice = () => {
  dice.classList.add('shake');
  dice.src = 'dice_guess.png';

  setTimeout(() => {
    dice.classList.remove('shake');
  }, 1000)
}

const showDiceFace = () => {
  submitBtn.disabled = true;
  dice.src = `dice-0${numToGuess}.svg`;
  diceResultLabel.innerText = 'You guessed the correct side!';

  const diceResultButton = document.createElement('button');

  diceResultButton.id = 'dice-result-btn';
  diceResultButton.innerText = 'OK';
  diceResultButton.addEventListener('click', () => {
    submitBtn.disabled = false;
    setDieSide();
    diceResultLabel.innerText = 'Guess the dice value';
    rightContainer.removeChild(diceResultButton);
  })
  rightContainer.append(diceResultButton);
}

const checkResult = () => {
  console.log(choice)
  console.log(numToGuess)

  if (!choice) {
    console.log('enter choice')
    return;
  }

  if (numToGuess === choice) {
    showDiceFace();
    correctGuess++;
    tbody.children[currentGameRow - 1].children[tryIndex].innerHTML = '&#10004;';

  } else {
    rollDice();
    lives--;
    tbody.children[currentGameRow - 1].children[tryIndex].innerHTML = '&#10006;';
  }

  livesDisplay.innerText = `Lives left: ${lives}`;
  if (lives <= 0) submitBtn.disabled = true;

  if (lives == 0) {
    triesToWinDisplay.innerText = 'You LOST!';
    tbody.children[currentGameRow - 1].children[0].style.backgroundColor = 'red';
    playAgain();
    return
  }

  if (correctGuess == 3) {
    triesToWinDisplay.innerText = 'You WON!';
    tbody.children[currentGameRow - 1].children[0].style.backgroundColor = 'green';
    playAgain();
    return
  }

  triesToWinDisplay.innerText = `Score ${3 - correctGuess} more to win!`;
  choice = null;
  tryIndex++;
}

const playAgain = () => {
  const addPlayAgain = document.createElement('div');
  const diceResultButton = document.getElementById('dice-result-btn');

  addPlayAgain.id = 'play-again';
  addPlayAgain.innerHTML =
    `<h3>Do you want to play again?</h3>
      <div>
        <button id="play-again-yes" onclick="addGameRow()">Yes</button>
        <button id="play-again-no" onclick="closePlayAgain()">No</button>
      </div>`;

  if (diceResultButton) diceResultButton.disabled = true;
  rightBottom.append(addPlayAgain);
}

const addGameRow = () => {
  currentGameRow++;

  const diceResultButton = document.getElementById('dice-result-btn');
  const newRow = document.createElement('tr');

  newRow.innerHTML =
    `<tr>
      <td id="game-number-${currentGameRow}">${currentGameRow}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>`;

  if (correctGuess == 3) submitBtn.disabled = true;
  if (lives == 0) submitBtn.disabled = false;
  if (diceResultButton) diceResultButton.disabled = false;

  lives = 3;
  correctGuess = 0;
  tryIndex = 1;

  tbody.append(newRow);
  livesDisplay.innerText = 'Lives left: 3';
  triesToWinDisplay.innerText = 'Score 3 more to win!';
  closePlayAgain();
}

const closePlayAgain = () => {
  const playAgainElement = document.getElementById('play-again');
  rightBottom.removeChild(playAgainElement);
}

submitBtn.addEventListener('click', () => {
  checkResult();
  removeHighlight();
})

const numberButtons = document.querySelectorAll('.number-btn');

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', () => {
    activeButton = checkIfPressed();
  })
}

const removeHighlight = () => {
  document.getElementById(`btn${activeButton}`).style.backgroundColor = 'white';
}

const checkIfPressed = () => {
  let selectedBtn;

  for (let k = 0; k < 6; k++) {
    const targetBtn = document.getElementById(`btn${k + 1}`);

    if ((k + 1) == choice) {
      targetBtn.style.backgroundColor = 'red';
      selectedBtn = (k + 1);
    }
    else {
      targetBtn.style.backgroundColor = 'white';
    }
  }
  return selectedBtn;
}

setDieSide();
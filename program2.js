let choice;
let numToGuess;
let lives = 3;
let correctGuess = 0;
let tryIndex = 1;
let activeButton;
let currentGameRow = 1;

const bottom = document.getElementById('bottom');
const livesDisplay = document.getElementById('lives');
const triesToWinDisplay = document.getElementById('status');
const submitBtn = document.getElementById('submit-btn');
const tbody = document.getElementById('tbody');

const setChoice = (input) => {
  choice = input
}

const checkResult = () => {
  console.log(choice)
  console.log(numToGuess)

  if (!choice) {
    console.log('enter choice')
    return;
  }

  if (numToGuess === choice) {
    correctGuess++;
    setDieSide();
    tbody.children[currentGameRow - 1].children[tryIndex].innerHTML = '&#10004;'
  } else {
    lives--;
    tbody.children[currentGameRow - 1].children[tryIndex].innerHTML = '&#10006;'
  }

  livesDisplay.innerText = `Lives left: ${lives}`;
  canPlay();

  if (lives == 0) {
    triesToWinDisplay.innerText = 'You LOST!';
    tbody.children[currentGameRow - 1].children[0].style.backgroundColor = 'red';
    lives = 3;
    correctGuess = 0;
    tryIndex = 1;
    playAgain();
    return
  }

  if (correctGuess == 3) {
    triesToWinDisplay.innerText = 'You WON!';
    tbody.children[currentGameRow - 1].children[0].style.backgroundColor = 'green';
    lives = 3;
    correctGuess = 0;
    tryIndex = 1;
    playAgain();
    return
  }


  triesToWinDisplay.innerText = `Score ${3 - correctGuess} more to win!`;
  choice = null;
  tryIndex++;

}

const playAgain = () => {
  const addPlayAgain = document.createElement('div');

  addPlayAgain.id = 'play-again';
  addPlayAgain.innerHTML =
    `<h3>Do you want to play again?</h3>
      <div>
        <button id="play-again-yes" onclick="addGameRow()">Yes</button>
        <button id="play-again-no" onclick="closePlayAgain()">No</button>
      </div>`;

  bottom.append(addPlayAgain);
}

const addGameRow = () => {
  currentGameRow++;

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

  tbody.append(newRow);
  livesDisplay.innerText = 'Lives left: 3';
  triesToWinDisplay.innerText = 'Score 3 more to win!';
  canPlay();
  closePlayAgain();
}

const closePlayAgain = () => {
  const playAgainElement = document.getElementById('play-again');
  bottom.removeChild(playAgainElement);
}

const setDieSide = () => {
  numToGuess = Math.round(1 + Math.random() * (6 - 1));
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

const canPlay = () => {
  if (lives > 0) submitBtn.disabled = false;
  else submitBtn.disabled = true;
}

setDieSide();
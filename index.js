 
// Element references

const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');


// Game variables

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;


// Returns a random number from min (inclusive) to max (inclusive)

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Check user's guess

function checkGuess() {
  const guess = parseInt(guessInput.value, 10);
  attempts += 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guess${attempts > 1 ? 'es' : ''}.`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;

    resetButton.style.display = '';
    return;
  }

  if (guess < targetNumber) {
    tooLowMessage.style.display = '';
  } else if (guess > targetNumber) {
    tooHighMessage.style.display = '';
  }

  const remainingAttempts = maxNumberOfAttempts - attempts;

  numberOfGuessesMessage.style.display = '';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining.`;

  if (attempts >= maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = '';
    resetButton.style.display = '';
  }

  guessInput.value = '';
}


// Hide all messages

function hideAllMessages() {
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = 'none';
  }
}


// Setup game

function setup() {
  targetNumber = getRandomNumber(1, 99);
  console.log(`Target number: ${targetNumber}`);

  attempts = 0;

  submitButton.disabled = false;
  guessInput.disabled = false;
  guessInput.value = '';

  hideAllMessages();
  resetButton.style.display = 'none';
}


// Event listeners

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Start the game
setup();

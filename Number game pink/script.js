'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Rolling dice button and image
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1. If true, switch to next player
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if score is >= 20. If yes then finish the game
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      }  won the game!`;
    } else {
      //3.Switch to next player --- duplicate code!
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

//Restart the game button
btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  document.querySelector(`#name--0`).textContent = "Player 1";
  document.querySelector(`#name--1`).textContent = "Player 2";

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.remove('player-active');
  player1El.classList.remove('player-active');
});

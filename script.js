'use strict';
let player1Score = document.getElementById('score--0');
let player2Score = document.getElementById('score--1');
let player1CurrentScore = document.getElementById('current--0');
let player2CurrentScore = document.getElementById('current--1');
const player1Name = document.getElementById('name--0').textContent;
const player2Name = document.getElementById('name--1').textContent;
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
let dice = document.querySelector('.dice');
let turn = 0;
let score = 0;
const players = [player1, player2];
const names = [player1Name, player2Name];

//generates a number 1-6
const genNumber = function () {
  const dieFace = Math.trunc(Math.random() * 6) + 1;
  console.log(dieFace);
  return dieFace.toString();
};

const checkResult = function (roll) {
  score += roll;

  if (roll === 1) {
    !turn
      ? ((turn = 1),
        switchPlayers(player1, turn),
        (player1CurrentScore.textContent = 0))
      : ((turn = 0),
        switchPlayers(player2, turn),
        (player2CurrentScore.textContent = 0));
    score = 0;
  } else {
    !turn
      ? (player1CurrentScore.textContent = score)
      : (player2CurrentScore.textContent = score);
  }
  if (player1Score.textContent >= 100 || player2Score.textContent >= 100) {
    winnerMessage(turn ? 0 : 1);
    return;
  }
};

const switchPlayers = function (player, turn) {
  player.classList.remove('player--active');
  players[turn].classList.add('player--active');
};

const winnerMessage = function (turn) {
  document.getElementById(`name--${turn}`).textContent = 'You Win!';
  players[turn].classList.add('player--winner');
};

rollDice.addEventListener('click', function () {
  //roll the die
  const result = genNumber();
  //target the dice element and change to the die face result.
  dice.src = `./dice-${result}.png`;
  checkResult(Number(result));
});

hold.addEventListener('click', function () {
  if (!score) alert(`You have to roll first, Player ${turn + 1}`);
  !turn
    ? (player1Score.textContent = Number(player1Score.textContent) + score)
    : (player2Score.textContent = Number(player2Score.textContent) + score);
  if (player1Score.textContent >= 100 || player2Score.textContent >= 100) {
    winnerMessage(turn);
    return;
  }
  !turn
    ? ((turn = 1),
      switchPlayers(player1, turn),
      (player1CurrentScore.textContent = 0))
    : ((turn = 0),
      switchPlayers(player2, turn),
      (player2CurrentScore.textContent = 0));
  score = 0;
});

newGame.addEventListener('click', function () {
  score = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  players[0].classList.remove('player--winner');
  players[1].classList.remove('player--winner');
  !turn
    ? NaN
    : (player2.classList.remove('player--active'),
      player1.classList.add('player--active'));
  turn = 0;
});

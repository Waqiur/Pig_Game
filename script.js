"use strict";

const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.getElementById("current--0");
const player1 = document.getElementById("current--1");

let currentScore, activePlayer, scores, playing;

const init = function () {
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    dice.classList.add("hidden");
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;

    document.querySelector(`.player--0`).classList.add("player--active");
    document.querySelector(`.player--1`).classList.remove("player--active");
    document.querySelector(`.player--0`).classList.remove("player--winner");
    document.querySelector(`.player--1`).classList.remove("player--winner");
};

init();

const switchPlayer = function () {
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    activePlayer = activePlayer == 0 ? 1 : 0;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
};

btnRoll.addEventListener("click", function () {
    if (playing) {
        const diceValue = Math.trunc(Math.random() * 6) + 1;
        dice.classList.remove("hidden");
        dice.src = `dice-${diceValue}.png`;
        if (diceValue !== 1) {
            currentScore += diceValue;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            scores[activePlayer] = 0;
            document.getElementById(`score--${activePlayer}`).textContent =
                scores[activePlayer];
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            dice.classList.add("hidden");
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", function () {
    init();
});

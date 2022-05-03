import { generateMatrix } from "./matrix.js";
import { addEventToGrid } from "./selectOne.js";
import { popUp, disablePopUp } from "./userWon.js";

const elements = {
  gridContainer: document.querySelector(".grid-container"),
  newGameBtn: document.querySelector(".new-game-btn"),
  newGameBtnPopUp: document.querySelector(".new-game-btn-popup"),
  timer: document.querySelector(".stopwatch"),
  wrongsCounter: document.querySelector(".counter"),
};

const state = {
  cardsTable: null,
  selectedOne: null,
  selectedTwo: null,
  hour: 0,
  min: 0,
  sec: 0,
  timerId: null,
  wrongGuessesCounter: 0,
  correctGuessesCounter: 0,
  numOfCards: 0,
  timer: "",
  highest: {
    score: 0,
    time: 0,
    player: "",
  },
};

function updateCounter(res) {
  if (!res) {
    //return from handleSelect func - if user wrong we will increment the wrong counter
    state.wrongGuessesCounter += 1;
    elements.wrongsCounter.innerHTML = state.wrongGuessesCounter;
  } else state.correctGuessesCounter += 1; // else we will increment the correct counter

  if (state.correctGuessesCounter === state.numOfCards) {
    popUp(state.wrongGuessesCounter, state.timer);
    clearTimeout(state.timerId);
  }
  console.log("state", state);
}

function drawCards(matrix, elementToAppend) {
  for (let row of matrix) {
    for (let num of row) {
      const card = document.createElement("div");
      card.setAttribute("data-num", `${num}`);
      card.classList.add(`match${num}`, "card", "unselected");
      elementToAppend.append(card);
      state.numOfCards += 1;
    }
  }
  state.numOfCards /= 2;
}

function addEventToButton(button, selectedOne, selectedTwo) {
  button.addEventListener("click", () => {
    resetGame(selectedOne, selectedTwo);
  });
}

function clearCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
}

function resetGame(selectedOne, selectedTwo) {
  selectedOne = null;
  selectedTwo = null;
  clearCards();
  resetTimer();
  resetCounters();
  startGame(state);
}

function initializeGame(state) {
  addEventToGrid(
    elements.gridContainer,
    state.selectedOne,
    state.selectedTwo,
    updateCounter
  );
  addEventToButton(elements.newGameBtn, state.selectedOne, state.selectedTwo);
  addEventToButton(
    elements.newGameBtnPopUp,
    state.selectedOne,
    state.selectedTwo
  );
  startGame(state);
}

function startGame(state) {
  state.cardsTable = generateMatrix();
  drawCards(state.cardsTable, elements.gridContainer);
  timerCycle();
}
function timerCycle() {
  let sec = state.sec;
  let min = state.min;
  let hr = state.hour;

  state.sec = sec + 1;

  if (sec == 60) {
    state.min = min + 1;
    state.sec = 0;
  }
  if (min == 60) {
    state.hour = hr + 1;
    state.min = 0;
    state.sec = 0;
  }

  if (sec < 10 || sec == 0) {
    sec = "0" + sec;
  }
  if (min < 10 || min == 0) {
    min = "0" + min;
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  elements.timer.innerHTML = `${hr}:${min}:${sec}`;
  state.timer = `${hr}:${min}:${sec}`;

  state.timerId = setTimeout(timerCycle, 1000);
}

function resetTimer() {
  clearTimeout(state.timerId);
  state.sec = 0;
  state.min = 0;
  state.hour = 0;
  elements.timer.innerHTML = "00:00:00";
}
function resetCounters() {
  state.correctGuessesCounter = 0;
  state.wrongGuessesCounter = 0;
  state.numOfCards = 0;
  elements.wrongsCounter.innerHTML = state.wrongGuessesCounter;
  disablePopUp();
}

initializeGame(state);

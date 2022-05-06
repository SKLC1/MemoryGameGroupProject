import { generateMatrix } from "./matrix.js";
import { addEventToGrid } from "./selectOne.js";
import { popUp, disablePopUp } from "./userWon.js";
import { isHighest } from "./isHighest.js";
import { getChosenAmount } from './matrix.js'
const elements = {
  gridContainer: document.querySelector(".grid-container"),
  newGameBtn: document.querySelector(".new-game-btn"),
  newGameBtnPopUp: document.querySelector(".new-game-btn-popup"),
  closePopUpBtn: document.querySelector(".close-button"),
  timer: document.querySelector(".stopwatch"),
  wrongsCounter: document.querySelector(".counter"),
  highest: document.getElementById("highest"),
  cardsAmountInput: document.querySelector(".choose-amount"),
  amountCount: document.querySelector('.cards-amount-container')
};


const state = {
  chosenAmount: null, 
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
  highestScore: {
    score: 0,
    time: 0,
    player: "",
    sec: 0,
  },
  highestTime: {
    score: 0,
    time: 0,
    player: "",
    sec: 0,
  },
  isMsg: false,
};

function updateCounter(res) {
  if (!res) {
    //return from handleSelect func - if user wrong we will increment the wrong counter
    state.wrongGuessesCounter += 1;
    elements.wrongsCounter.innerHTML = state.wrongGuessesCounter;
  } else state.correctGuessesCounter += 1; // else we will increment the correct counter

  if (state.correctGuessesCounter === state.numOfCards) {
    console.log(state);
    const isHighestOrNot = isHighest(state);
    popUp(state.wrongGuessesCounter, state.timer, isHighestOrNot);
    clearTimeout(state.timerId);
    elements.highest.children[0].innerHTML = `Highest Score: ${state.highestScore.score}`;
    elements.highest.children[1].innerHTML = `Best Time: ${state.highestTime.time}`;
  }
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
  console.dir(button.className);
  if (button.className === "close-button")
    button.addEventListener("click", disablePopUp);
  else
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
  addEventToButton(elements.closePopUpBtn);
  startGame(state);
}

function startGame(state) {
  state.chosenAmount = getChosenAmount(elements.cardsAmountInput,elements.amountCount)
  state.cardsTable = generateMatrix(state.chosenAmount);
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

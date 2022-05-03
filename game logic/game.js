// game functions imports
import { generateMatrix } from "./matrix.js";
import { addEventToGrid } from "./selectOne.js";
import { popUp } from "./userWon.js";

const elements = {
  gridContainer: document.querySelector(".grid-container"),
  wrongsCounter: document.querySelector(".counter"),
};

const state = {
  cardsTable: generateMatrix(),
  selectedOne: null,
  selectedTwo: null,
  wrongGuessesCounter: 0,
  correctGuessesCounter: 0,
  numOfCards: 0,
};

function updateCounter(res) {
  if (!res) {
    //return from handleSelect func - if user wrong we will increment the wrong counter
    state.wrongGuessesCounter += 1;
    elements.wrongsCounter.innerHTML = state.wrongGuessesCounter;
  } else state.correctGuessesCounter += 1; // else we will increment the correct counter

  if (state.correctGuessesCounter === state.numOfCards)
    popUp(state.wrongGuessesCounter);
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

console.log(state);
drawCards(state.cardsTable, elements.gridContainer);
addEventToGrid(
  elements.gridContainer,
  state.selectedOne,
  state.selectedTwo,
  updateCounter
);

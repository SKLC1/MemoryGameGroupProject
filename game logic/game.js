// game functions imports
import {generateMatrix} from "./matrix.js";
import {addEventToGrid} from "./selectOne.js";

const elements = {
    gridContainer : document.querySelector(".grid-container"),
    newGameBtn : document.querySelector(".new-game-btn"),
    timer : document.querySelector('.stopwatch')
}

const state = {
    cardsTable : null,
    selectedOne : null,
    selectedTwo : null,
    hour: 0,
    min: 0,
    sec: 0,
    timerId: null,
}

function drawCards(matrix, elementToAppend) {
    for(let row of matrix) {
        for(let num of row) {
            const card = document.createElement("div");
            card.setAttribute("data-num", `${num}`);
            card.classList.add(`match${num}`, "card", 'unselected');
            elementToAppend.append(card);
        }
    }
}

function addEventToButton(button, selectedOne, selectedTwo) {
    button.addEventListener("click", () => {resetGame(selectedOne, selectedTwo)})
}

function clearCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.remove());
}

function resetGame(selectedOne, selectedTwo) {
    selectedOne = null;
    selectedTwo = null;
    clearCards();
    resetTimer();
    startGame(state);
}

function startGame(state) {
    state.cardsTable = generateMatrix();
    drawCards(state.cardsTable, elements.gridContainer);
    addEventToGrid(elements.gridContainer,state.selectedOne,state.selectedTwo);
    addEventToButton(elements.newGameBtn, state.selectedOne,state.selectedTwo);
    timerCycle();
}

function timerCycle() {
    let sec = state.sec;
    let min = state.min;
    let hr = state.hour;

    state.sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if(hr < 10) {
        hr = '0' + hr;
    }

    elements.timer.innerHTML = `${hr}:${min}:${sec}`

    state.timerId = setTimeout(timerCycle, 1000);
}

function resetTimer() {
    clearTimeout(state.timerId);
    state.sec = 0;
    state.min = 0;
    state.hour = 0;
    elements.timer.innerHTML = '00:00:00';
}

startGame(state);


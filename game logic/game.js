// game functions imports
import {generateMatrix} from "./matrix.js";
import {addEventToGrid} from "./selectOne.js";


const elements = {
    gridContainer : document.querySelector(".grid-container"),
    newGameBtn : document.querySelector(".new-game-btn"),
}

const state = {
    cardsTable : null,
    selectedOne : null,
    selectedTwo : null,
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
    startGame(state);
}

function startGame(state) {
    state.cardsTable = generateMatrix();
    drawCards(state.cardsTable, elements.gridContainer);
    addEventToGrid(elements.gridContainer,state.selectedOne,state.selectedTwo);
    addEventToButton(elements.newGameBtn, state.selectedOne,state.selectedTwo);
}

startGame(state);


// game functions imports
import {generateMatrix} from "./matrix.js";
import {addEventToGrid} from "./selectOne.js";


const elements = {
    gridContainer : document.querySelector(".grid-container")
}

const state = {
    cardsTable : generateMatrix(),
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

console.log(state);
drawCards(state.cardsTable, elements.gridContainer)
addEventToGrid(elements.gridContainer,state.selectedOne,state.selectedTwo)
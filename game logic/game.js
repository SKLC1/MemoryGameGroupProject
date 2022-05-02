import {generateMatrix} from "./matrix.js";

const elements = {
    gridContainer : document.querySelector(".grid-container")
}

const state = {
    cardsTable : generateMatrix()
}

function drawCards(matrix, elementToAppend) {
    for(let row of matrix) {
        for(let num of row) {
            const card = document.createElement("div");
            card.setAttribute("data-num", `${num}`);
            card.classList.add(`${num}`, "card");
            elementToAppend.append(card);
        }
    }
}

console.log(state);
drawCards(state.cardsTable, elements.gridContainer)
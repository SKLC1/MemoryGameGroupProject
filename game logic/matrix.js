
export function getChosenAmount(cardsAmountInput,amountCount) {
  if ((cardsAmountInput.value > 12 || cardsAmountInput.value < 2)) {
    let notInRangeMsg = document.createElement('div');
    notInRangeMsg.innerText = '* Card Amount is not in range ,must be min(2), max(12).';
    notInRangeMsg.classList.add('not-in-range-msg');
    amountCount.appendChild(notInRangeMsg);
    return cardsAmountInput.value = 12;
  } else {
    let errorMsgs = document.querySelectorAll('.not-in-range-msg')
    errorMsgs.forEach(msg => {msg.remove()});
    return parseInt(cardsAmountInput.value);
  }
}
// generate random matrix
export function generateMatrix(chosenAmount) {
  let matrix = [];
  let randomArr = Array.from(Array(Math.floor(chosenAmount/2)).keys()).concat(
    Array.from(Array(Math.floor(chosenAmount/2)).keys())
  );
  let shuffled = randomArr.sort(() => Math.random() - 0.5);
  // slice into 3 and push into matrix
  for (let j = 0; j < shuffled.length; j += 3) {
    matrix.push(shuffled.slice(j, j + 3));
  }
  return matrix;
}

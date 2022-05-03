const popUpElement = document.getElementById("pop-up");
const overlay = document.getElementById("overlay");

export function popUp(wrongGuessesCounter, timer, isHighestOrNot) {
  const innerTextEle = popUpElement.children[1];
  popUpElement.classList.add("active");
  overlay.classList.add("active");
  innerTextEle.innerHTML = isHighestOrNot;
  console.log(isHighestOrNot);
  // isHighestOrNot
  //   ? (innerTextEle.innerHTML = `New Record ! ! ! ${wrongGuessesCounter} wrong guesses in ${timer}`)
  //   : (innerTextEle.innerHTML = `Congratulations you won with ${wrongGuessesCounter} wrong guesses in ${timer}`);
}

export function disablePopUp() {
  popUpElement.classList.remove("active");
  overlay.classList.remove("active");
  popUpElement.children[1].innerHTML = "";
}

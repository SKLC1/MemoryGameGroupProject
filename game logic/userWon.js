const popUpElement = document.getElementById("pop-up");
const overlay = document.getElementById("overlay");

export function popUp(wrongGuessesCounter, timer) {
  popUpElement.classList.add("active");
  overlay.classList.add("active");
  popUpElement.children[1].innerHTML = `Congratulations you won with ${wrongGuessesCounter} wrong guesses in ${timer}`;
}

export function disablePopUp() {
  popUpElement.classList.remove("active");
  overlay.classList.remove("active");
  popUpElement.children[1].innerHTML = "";
}

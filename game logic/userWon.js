const popUpElement = document.getElementById("pop-up");
const overlay = document.getElementById("overlay");

export function popUp(wrongGuessesCounter) {
  console.log("sdsdsas");
  popUpElement.classList.add("active");
  overlay.classList.add("active");
  popUpElement.children[1].innerHTML = `Congratulations you won with ${wrongGuessesCounter} wrong guesses`;
}

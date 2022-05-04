export function addEventToGrid(grid, selectedOne, selectedTwo, updateCounter) {
  function handleSelect(e) {
    if (
      !e.target.className.includes("grid-container") &&
      !e.target.className.includes("flipped")
    ) {
      if (e.target.className.includes("card")) {
        e.target.classList.remove("unselected");
      }
      e.target.classList.add("flip");
      e.target.classList.remove("backFlip");
      if (!selectedOne || selectedOne === e.target) {
        // if user press the same card twice selectedTwo wont update
        selectedOne = e.target;
      } else {
        selectedTwo = e.target;
      }
      if (selectedOne && selectedTwo) {
        if (selectedOne.dataset.num === selectedTwo.dataset.num) {
          selectedOne.classList.remove("unselected");
          selectedTwo.classList.remove("unselected");
          selectedOne.classList.add("flipped");
          selectedTwo.classList.add("flipped");

          selectedOne = null;
          selectedTwo = null;
          updateCounter(true);
        } else {
          removeListener(grid, handleSelect);
          setTimeout(() => {
            selectedOne.classList.add("unselected");
            selectedTwo.classList.add("unselected");
            selectedOne.classList.remove("flip");
            selectedTwo.classList.remove("flip");
            selectedOne.classList.add("backFlip");
            selectedTwo.classList.add("backFlip");
            selectedOne = null;
            selectedTwo = null;
          }, 1000);
          updateCounter(false);
        }
      }
    }
  }
  grid.addEventListener("click", handleSelect);
}

function removeListener(grid, handleSelect) {
  grid.removeEventListener("click", handleSelect);
  setTimeout(() => {
    grid.addEventListener("click", handleSelect);
  }, 1000);
}

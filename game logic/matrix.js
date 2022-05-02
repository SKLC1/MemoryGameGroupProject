// ? feel free to edit this grid  selector into state object
// const grid = document.querySelector('grid-container')

// generate random matrix
export function generateMatrix() {
  let matrix = [];
  let randomArr = [];
  let num = 0; 
  let cards = 0;
  for (let i = 0; i < 16; i++) { // random array of pairs
      num = Math.floor(Math.random()*12);
      if(!randomArr.includes(num) && randomArr.length < 12){
        randomArr.push(num);
        randomArr.push(num);
      }
    }
  let shuffled = randomArr.sort(()=> Math.random()-0.5);
  // slice into 3 and push into matrix
  for (let j = 0; j < shuffled.length; j+=3) {
    matrix.push(shuffled.slice(j,j+3));
  }
  return matrix
}
// console.log(generateMatrix());
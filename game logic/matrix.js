
// generate random matrix
export function generateMatrix() {
  let matrix = [];
  let randomArr = Array.from(Array(6).keys()).concat(Array.from(Array(6).keys()))
  let shuffled = randomArr.sort(()=> Math.random()-0.5);
  // slice into 3 and push into matrix
  for (let j = 0; j < shuffled.length; j+=3) {
    matrix.push(shuffled.slice(j,j+3));
  }
  return matrix
}

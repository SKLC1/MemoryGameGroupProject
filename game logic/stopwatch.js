
// const timer = document.querySelector('.stopwatch')

// let hr = 0;
// let min = 0;
// let sec = 0;

// function timerCycle() {
//     sec = parseInt(sec);
//     min = parseInt(min);
//     hr = parseInt(hr);

//     sec = sec + 1;

//     if (sec == 60) {
//       min = min + 1;
//       sec = 0;
//     }
//     if (min == 60) {
//       min = 0;
//       sec = 0;
//     }

//     if (sec < 10 || sec == 0) {
//       sec = '0' + sec;
//     }
//     if (min < 10 || min == 0) {
//       min = '0' + min;
//     }

//     timer.innerHTML = `${min}:${sec}`

//     setTimeout("timerCycle()", 1000);
// }
// timerCycle()

// function resetTimer() {
//     timer.innerHTML = '00:00:00';
// }
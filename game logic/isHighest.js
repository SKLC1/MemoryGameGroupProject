export function isHighest({
  timer,
  highestScore,
  sec,
  wrongGuessesCounter,
  highestTime,
}) {
  let result = "";
  if (highestScore.score === 0 && highestTime.time === 0) {
    //only for first round
    (highestScore.sec = sec),
      (highestScore.time = timer),
      (highestScore.score = wrongGuessesCounter);
    (highestTime.sec = sec),
      (highestTime.time = timer),
      (highestTime.score = wrongGuessesCounter);
    result = `Congratulations you won with ${wrongGuessesCounter} wrong guesses ${timer}`;
  } else if (highestScore.score > wrongGuessesCounter) {
    (highestScore.score = wrongGuessesCounter),
      (highestScore.time = timer),
      (highestScore.sec = sec);
    result += `New Guesses Record  only ${wrongGuessesCounter} guesses
    `;
  }
  if (highestTime.sec > sec) {
    (highestTime.sec = sec),
      (highestTime.time = timer),
      (highestTime.score = wrongGuessesCounter);
    if (result.length > 1) result += `And Also New Time Record !  ${timer}`;
    else result += `New Time Record ${timer} `;
  }
  if (result.length < 1)
    result = `Congratulations you won with ${wrongGuessesCounter} wrong guesses ${timer}`;
  return result;
}

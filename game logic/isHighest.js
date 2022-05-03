export function isHighest({ timer, highest, sec, wrongGuessesCounter }) {
  if (highest.sec === 0) {
    (highest.sec = sec),
      (highest.time = timer),
      (highest.score = wrongGuessesCounter);
    return false;
  } else if (highest.sec > sec) {
    (highest.sec = sec),
      (highest.time = timer),
      (highest.score = wrongGuessesCounter);
    return true;
  }
  return false;
}

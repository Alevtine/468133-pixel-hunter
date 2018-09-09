export const ANSWERS_QTTY = 10;
export const LIVES_QTTY = 3;
export const TIMER_SEC = 30;
export const TIME_PARAMETRES = {
  fast: 10,
  correct: 20,
  slow: 30,
  wrong: -1
};

export const Point = {
  correct: 100,
  slow: -50,
  fast: 50,
  bonus: 50
};

export const Answer = {
  slow: `slow`,
  fast: `fast`,
  correct: `correct`,
  wrong: `wrong`,
  unknown: `unknown`
};

const levels = {
  min: 1,
  max: 10
};


export const turnLevel = (level) => {
  level = Math.min(levels.max, Math.max(levels.min, level));
  return level;
};

export const calculateLives = (current, answer) => {
  return current - !answer;
};


export const getScore = (answersArr, lives) => {
  if (answersArr.length < ANSWERS_QTTY || lives > LIVES_QTTY || lives <= 0) {
    return -1;
  } else {
    let scores = lives * Point.bonus;
    answersArr.forEach((answer) => {
      switch (answer) {
        case Answer.slow:
          scores += Point.correct + Point.slow;
          break;
        case Answer.fast:
          scores += Point.correct + Point.fast;
          break;
        case Answer.correct:
          scores += Point.correct;
          break;
        default:
          break;
      }
    });
    return scores;
  }
};

export const startTimer = (value) => {
  if (value > 0 && value <= TIMER_SEC) {
    value--;
  } else if (value <= 0) {
    return `Time is out`;
  }
  return value;
};


const ANSWERS_QTTY = 10;
const LIVES_QTTY = 3;
const TIMER_SEC = 30;

const Point = {
  correct: 100, // Правильный ответ: === 100 очков;
  slow: -50, // Медленный ответ: снимается 50 очков; === 50
  fast: 50, // Быстрый ответ: добавляется 50 очков; === 150
  bonus: 50 // За жизнь
};

const Answer = {
  slow: `slow`,
  fast: `fast`,
  default: `default`
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
    answersArr.forEach((it) => {
      switch (it) {
        case Answer.slow:
          scores += Point.correct + Point.slow;
          break;
        case Answer.fast:
          scores += Point.correct + Point.fast;
          break;
        case Answer.default:
          scores += Point.correct;
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
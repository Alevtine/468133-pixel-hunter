const APP_ID = 468133;
export const SUCCESS_STATUS = 200;
export const ANSWERS_QUANTITY = 10;
export const LIVES_QUANTITY = 3;
export const BLINK_TIME = 5;

export const Title = {
  WIN: `Победа!`,
  FAIL: `Проигрыш`
};

export const ServerURL = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  STATS: `https://es.dump.academy/pixel-hunter/stats/${APP_ID}`
};

export const TimerSec = {
  LIMIT: 30,
  TICK: 1000
};

const TimeStep = {
  FAST: 10,
  SLOW: 20
};

export const Point = {
  CORRECT: 100,
  SLOW: -50,
  FAST: 50,
  BONUS: 50
};

export const Answer = {
  SLOW: `slow`,
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`
};

const Level = {
  MIN: 1,
  MAX: 10
};

export const answerType = (timeLeft) => {
  if (timeLeft > TimeStep.SLOW) {
    return Answer.FAST;
  }
  if (timeLeft > TimeStep.FAST) {
    return Answer.CORRECT;
  }
  return Answer.SLOW;
};

export const turnLevel = (level) => {
  level = Math.min(Level.MAX, Math.max(Level.MIN, level));
  return level;
};

export const calculateLives = (current, answer) => {
  return current - !answer;
};

export const getScore = (answersArr, lives) => {
  if (answersArr.length < ANSWERS_QUANTITY || lives > LIVES_QUANTITY || lives <= 0) {
    return -1;
  } else {
    let scores = lives * Point.BONUS;
    answersArr.forEach((answer) => {
      switch (answer) {
        case Answer.SLOW:
          scores += Point.CORRECT + Point.SLOW;
          break;
        case Answer.FAST:
          scores += Point.CORRECT + Point.FAST;
          break;
        case Answer.CORRECT:
          scores += Point.CORRECT;
          break;
        default:
          break;
      }
    });
    return scores;
  }
};

export const startTimer = (value) => {
  if (value > 0 && value <= TimerSec.LIMIT) {
    value--;
  } else if (value <= 0) {
    return `Time is out`;
  }
  return value;
};

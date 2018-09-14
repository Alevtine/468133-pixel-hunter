export const SERVER_QUESTIONS = `https://es.dump.academy/pixel-hunter/questions`;
export const SERVER_STATS = `https://es.dump.academy/pixel-hunter/stats/468133`;
export const UNKNOWN_PLAYER = `unknown`;
export const SUCCESS_STATUS = 200;
export const ANSWERS_QTTY = 10;
export const LIVES_QTTY = 3;
export const TIMER_SEC = {
  limit: 30,
  tick: 1000
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

export const answerType = (timeLeft) => {
  if (timeLeft > 20) {
    return Answer.fast;
  }
  if (timeLeft > 10) {
    return Answer.correct;
  }
  return Answer.slow;
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
  if (value > 0 && value <= TIMER_SEC.limit) {
    value--;
  } else if (value <= 0) {
    return `Time is out`;
  }
  return value;
};

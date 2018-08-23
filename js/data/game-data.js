const levels = {
  min: 1,
  max: 10
};


export const turnLevel = (level) => {
  if (level <= levels.min) {
    return levels.min;
  }
  if (level >= levels.max) {
    return levels.max;
  }

  return level;
};

export const calculateLives = (current, answer) => {
  let result = current - !answer;
  return result;
};

// Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
// Если игрок ответил на все вопросы и не быстро, и не медленно, и у него остались все жизни, то функция должна вернуть 1150 очков;

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

export const getScore = (answersArr, lives) => {
  if (answersArr.length < 10) {
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

// const defineAnswerType = (time, correctness) => {
//   let answersArr = [];
//     if (time === Timer.slow & correctness === Answer.correctness[1]) {
//       answersArr.push('slow')
//     }
// }

// let answersArr = ['slow', 'fast', 'slow', 'fast', 'slow', 'fast', 'slow', 'fast', 'slow', 'fast']

// const Timer = {
//   fast: 5,
//   slow: 15,
//   begin: 30
// };
//
// const initialState = {
//   lives: 3,
//   level: 1,
//   time: 30,
//   score: 0,
// };

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

// const POINTS_QTTY = 50;
// const answer = {
//   correct: 2, // Правильный ответ: === 100 очков;
//   wrong: 0, // ничего === 0
//   slow: 1, // Медленный ответ: снимается 50 очков; === 50
//   fast: 3 // Быстрый ответ: добавляется 50 очков; === 150
// }


// export const getScore = (answersArr, lives) => {
// Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
// Если игрок ответил на все вопросы и не быстро, и не медленно, и у него остались все жизни, то функция должна вернуть 1150 очков;
// }

// let lives = 3;
export const calculateLives = (current, answer) => {
  let result = current - !answer;
  return result;
};

export const beginState = {
  level: 1,
  lives: 3,
  time: 30,
  answers: [],
  // scores:
};

// Если пользователь отвечает на вопрос быстрее, чем за 10 секунд, ответ считается быстрым
// Если ответ на вопрос занял дольше 20 секунд, такой ответ считается медленным

export const Answer = {
  right: [`slow`, `fast`],
  wrong: `wrong`
};

export const QuestionScreen = [
  {
    kind: `guessForEach`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        pictureURL: ``,
        type: `paint`
      },
      {
        pictureURL: ``,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        pictureURL: ``,
        type: `paint`
      }
    ]
  },
  {
    kind: `findImgOrPhoto`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        pictureURL: ``,
        type: `piant`
      },
      {
        pictureURL: ``,
        type: `photo`
      },
      {
        pictureURL: ``,
        type: `photo`
      }
    ]
  }
];

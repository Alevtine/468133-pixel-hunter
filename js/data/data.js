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

export const stat = new Map([[1, `wrong`], [2, `fast`], [3, `slow`],
  [4, `unknown`], [5, `wrong`], [6, `fast`], [7, `slow`], [8, `unknown`],
  [9, `wrong`], [10, `fast`]]);

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

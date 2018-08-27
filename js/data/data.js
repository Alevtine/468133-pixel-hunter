
export const beginState = Object.freeze({
  level: 1,
  lives: 3,
  time: 30,
  answers: [],
});


export const Answer = {
  right: [`slow`, `fast`],
  wrong: `wrong`
};

export const stat = new Map([[1, `wrong`], [2, `fast`], [3, `slow`],
  [4, `unknown`], [5, `wrong`], [6, `fast`], [7, `slow`], [8, `unknown`],
  [9, `correct`], [10, `correct`]]);

export const QuestionScreen = [
  {
    kind: `guessForEach`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        pictureURL: `http://placehold.it/468x458`,
        type: `paint`
      },
      {
        pictureURL: `http://placehold.it/468x458`,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        pictureURL: `http://placehold.it/705x455`,
        type: `paint`
      }
    ]
  },
  {
    kind: `findImgOrPhoto`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        pictureURL: `http://placehold.it/304x455`,
        type: `paint`
      },
      {
        pictureURL: `http://placehold.it/304x455`,
        type: `photo`
      },
      {
        pictureURL: `http://placehold.it/304x455`,
        type: `photo`
      }
    ]
  }
];

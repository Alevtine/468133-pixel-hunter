
export const beginState = Object.freeze({
  level: 1,
  lives: 3,
  time: 30,
  answers: Array(10).fill(`unknown`),
  isWin: false
});


export const stat = new Map([[1, `wrong`], [2, `fast`], [3, `slow`],
  [4, `unknown`], [5, `wrong`], [6, `fast`], [7, `slow`], [8, `unknown`],
  [9, `correct`], [10, `correct`]]);

export const QuestionScreens = [
  {
    "type": `tinder-like`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `https://k32.kn3.net/42C83EF0A.jpg`,
          "width": 705,
          "height": 455
        },
        "type": `painting`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите рисунок среди изображений`,
    "answers": [
      {
        "image": {
          "url": `http://i.imgur.com/jBLSxQ9.png`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      },
      {
        "image": {
          "url": `https://i.redd.it/bj70zjl196kx.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      },
      {
        "image": {
          "url": `https://k37.kn3.net/47F2604E3.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите фото среди изображений`,
    "answers": [
      {
        "image": {
          "url": `https://k38.kn3.net/20B8A2B58.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `https://k31.kn3.net/4BF6BBF0E.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://i.imgur.com/UIHVp0P.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `http://i.imgur.com/mz0MSsy.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      },
      {
        "image": {
          "url": `https://i.redd.it/l08jq66vul2y.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `https://k34.kn3.net/4244FE50B.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://i.imgur.com/rY9u55S.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `tinder-like`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `https://k43.kn3.net/27AC45B8B.jpg`,
          "width": 705,
          "height": 455
        },
        "type": `painting`
      }
    ]
  },
  {
    "type": `tinder-like`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `https://i.redd.it/cfw21jscl03y.jpg`,
          "width": 705,
          "height": 455
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите фото среди изображений`,
    "answers": [
      {
        "image": {
          "url": `https://k41.kn3.net/CF684A85A.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `https://k42.kn3.net/D2F0370D6.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `https://i.imgur.com/DiHM5Zb.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `tinder-like`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `https://k42.kn3.net/D660F0768.jpg`,
          "width": 705,
          "height": 455
        },
        "type": `painting`
      }
    ]
  },
  {
    "type": `one-of-three`,
    "question": `Найдите фото среди изображений`,
    "answers": [
      {
        "image": {
          "url": `https://k35.kn3.net/9ACD0AC56.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `https://k39.kn3.net/B27A12A74.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://i.imgur.com/zHRZW1C.jpg`,
          "width": 304,
          "height": 455
        },
        "type": `photo`
      }
    ]
  }
];

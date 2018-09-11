
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
    kind: `guessForEach`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        pictureURL: `https://cdn.shopify.com/s/files/1/1212/2956/articles/cover_pangolin_2048x.jpg?v=1513960003`,
        type: `paint`
      },
      {
        pictureURL: `https://img.allw.mn/content/2013/11/16174049_0023.jpg`,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        pictureURL: `http://animals-lover.com/wp-content/uploads/2014/07/Rockhopper-Penguins.jpg`,
        type: `paint`
      }
    ]
  },
  {
    kind: `findImgOrPhoto`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        pictureURL: `http://photo-lol.com/uploads/posts/2012-09/1347184090_detenysh-belogo-medvedya-tancuet-5.jpg`,
        type: `paint`
      },
      {
        pictureURL: `https://cs8.pikabu.ru/post_img/2016/03/05/10/145719428818827724.jpg`,
        type: `photo`
      },
      {
        pictureURL: `http://animalworld.com.ua/images/2016/April/Akva/A/Tulka.jpg`,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForEach`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        pictureURL: `https://cdn.shopify.com/s/files/1/1212/2956/articles/cover_pangolin_2048x.jpg?v=1513960003`,
        type: `paint`
      },
      {
        pictureURL: `https://img.allw.mn/content/2013/11/16174049_0023.jpg`,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        pictureURL: `http://animals-lover.com/wp-content/uploads/2014/07/Rockhopper-Penguins.jpg`,
        type: `paint`
      }
    ]
  },
  {
    kind: `findImgOrPhoto`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        pictureURL: `http://photo-lol.com/uploads/posts/2012-09/1347184090_detenysh-belogo-medvedya-tancuet-5.jpg`,
        type: `paint`
      },
      {
        pictureURL: `https://cs8.pikabu.ru/post_img/2016/03/05/10/145719428818827724.jpg`,
        type: `photo`
      },
      {
        pictureURL: `http://animalworld.com.ua/images/2016/April/Akva/A/Tulka.jpg`,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForEach`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        pictureURL: `https://cdn.shopify.com/s/files/1/1212/2956/articles/cover_pangolin_2048x.jpg?v=1513960003`,
        type: `paint`
      },
      {
        pictureURL: `https://img.allw.mn/content/2013/11/16174049_0023.jpg`,
        type: `photo`
      }
    ]
  },
  {
    kind: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        pictureURL: `http://animals-lover.com/wp-content/uploads/2014/07/Rockhopper-Penguins.jpg`,
        type: `paint`
      }
    ]
  },
  {
    kind: `findImgOrPhoto`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        pictureURL: `http://photo-lol.com/uploads/posts/2012-09/1347184090_detenysh-belogo-medvedya-tancuet-5.jpg`,
        type: `paint`
      },
      {
        pictureURL: `https://cs8.pikabu.ru/post_img/2016/03/05/10/145719428818827724.jpg`,
        type: `photo`
      },
      {
        pictureURL: `http://animalworld.com.ua/images/2016/April/Akva/A/Tulka.jpg`,
        type: `photo`
      }
    ]
  },
  {
    kind: `findImgOrPhoto`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        pictureURL: `http://photo-lol.com/uploads/posts/2012-09/1347184090_detenysh-belogo-medvedya-tancuet-5.jpg`,
        type: `paint`
      },
      {
        pictureURL: `https://cs8.pikabu.ru/post_img/2016/03/05/10/145719428818827724.jpg`,
        type: `photo`
      },
      {
        pictureURL: `http://animalworld.com.ua/images/2016/April/Akva/A/Tulka.jpg`,
        type: `photo`
      }
    ]
  }
];

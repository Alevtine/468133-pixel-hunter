import * as data from '../data/data.js';
import {makeScreenActive} from '../util.js';
import insertGreeting from './greeting.js';
import insertStats from './stats.js';
import insertGuessForOne from './guessForOne.js';


import GuessForEach from '../view/guess-for-each-view.js';
import GuessForOne from '../view/guess-for-one-view.js';
import FindImgOrPhoto from '../view/find-img-or-photo-view.js';

export default class Question {

  constructor() {
    this.question = data.QuestionScreen;
    this.level = data.beginState.level;
    this.state = Object.assign({}, data.beginState);
  }

  begin() {
    this.nextLevel(this.question, this.level);
  }

  nextLevel() {

    this.view.onClickBack = () => {
      makeScreenActive(insertGreeting());
    };

    this.view.onAnswer = (rightAnswer) => {
      if (rightAnswer) {
        makeScreenActive(insertGuessForOne());
      }
      makeScreenActive(insertStats());
    };

    return makeScreenActive(this.view);
  }
}

const getQuestionView = (kind) => {
  switch (kind) {
    case data.QuestionScreen[0][`kind`]:
      return GuessForEach;
    case data.QuestionScreen[1][`kind`]:
      return GuessForOne;
    case data.QuestionScreen[2][`kind`]:
      return FindImgOrPhoto;
  }
};

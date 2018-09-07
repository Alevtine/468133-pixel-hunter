import GuessForEach from '../view/guess-for-each-view.js';
import GuessForOne from '../view/guess-for-one-view.js';
import FindImgOrPhoto from '../view/find-img-or-photo-view.js';
import {beginState} from '../data/data.js';
import {makeScreenActive} from '../util.js';
import greeting from './greeting.js';
import stats from './stats.js';

import {TIME_PARAMETRES, Answer} from '../data/game-data.js';

const questionKindMap = {
  'guessForEach': GuessForEach,
  'guessForOne': GuessForOne,
  'findImgOrPhoto': FindImgOrPhoto
};

export default class QuestionManager {
  constructor(questionsData) {
    this._questionsData = questionsData;
  }

  start() {
    const questionData = this._questionsData[0];
    this.currentState = Object.assign({}, beginState);
    this.showQuestion(questionData, 1);
  }

  showQuestion(questionData, nextQuestionNumber) {
    const questionView = new questionKindMap[questionData.kind](questionData, this.currentState);

    questionView.onAnswer = (answer) => {
      this.isAnswerCorrect(answer);
      this.nextQuestion(nextQuestionNumber);
    };

    questionView.onClickBack = () => {
      makeScreenActive(greeting());
    };

    makeScreenActive(questionView.element);
  }

  nextQuestion(questionNumber) {
    if (questionNumber <= 0) {
      throw new Error(`question number should be positive`);
    }
    if (questionNumber >= this._questionsData.length) {
      makeScreenActive(stats());
    } else {
      this.showQuestion(this._questionsData[questionNumber], questionNumber + 1);
    }
  }

  isAnswerCorrect(isCorrect) {
    if (isCorrect) {
      this.checkTypeAnswer(this.currentState.time);
    } else {
      Object.assign({}, this.currentState,
          {lives: this.currentState.lives - 1},
          {answers: this.currentState.answers.push(`wrong`)});
    }
  }

  checkTypeAnswer(time) {
    this.time = time;
    let answerType;
    if (this.time <= TIME_PARAMETRES.slow && this.time >= TIME_PARAMETRES.correct) {
      answerType = Answer.fast;
    } else if (this.time < TIME_PARAMETRES.correct && this.time >= TIME_PARAMETRES.fast) {
      answerType = Answer.correct;
    } else if (this.time < TIME_PARAMETRES.fast) {
      answerType = Answer.slow;
    }
    return this.currentState.answers.push(answerType);
  }

}

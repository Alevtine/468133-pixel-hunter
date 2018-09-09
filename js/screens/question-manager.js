import GuessForEach from '../view/guess-for-each-view.js';
import GuessForOne from '../view/guess-for-one-view.js';
import FindImgOrPhoto from '../view/find-img-or-photo-view.js';
import {beginState} from '../data/data.js';
import {makeScreenActive} from '../util.js';
import greeting from './greeting.js';
import Stats from './stats.js';

import {TIME_PARAMETRES, Answer, calculateLives} from '../data/game-data.js';
import HeaderView from '../view/header-view.js';

const questionKindMap = {
  'guessForEach': {
    View: GuessForEach,
    validator: (questionData, userAnswers) => questionData.answers
        .map((answer, i) => answer.type === userAnswers[i])
        .reduce((acc, handleAnswer) => acc && handleAnswer)
  },
  'guessForOne': {
    View: GuessForOne,
    validator: (questionData, userAnswer) => questionData.answers[0].type === userAnswer
  },
  'findImgOrPhoto': {
    View: FindImgOrPhoto,
    validator: (questionData, userAnswerIndex) => questionData.answers
        .reduce((result, answer, i) => answer.type === `paint` ? i : result, -1) === userAnswerIndex
  }
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
    const {View, validator} = questionKindMap[questionData.kind];
    const questionView = new View(questionData, this.currentState);
    const header = new HeaderView(this.currentState);
    const node = document.createElement(`div`);
    node.appendChild(header.element);
    node.appendChild(questionView.element);

    questionView.onAnswer = (answer) => {
      this.handleAnswer(validator(questionData, answer));
      this.nextQuestion(nextQuestionNumber);
    };

    header.onClickBack = () => {
      makeScreenActive(greeting());
    };

    makeScreenActive(node);
  }

  nextQuestion(questionNumber) {
    if (questionNumber <= 0) {
      throw new Error(`question number should be positive`);
    }
    if (questionNumber >= this._questionsData.length) {
      makeScreenActive(new Stats(this.currentState));
    } else if (this.currentState.lives <= 0) {
      this.currentState.isWin = false;
      makeScreenActive(new Stats(this.currentState));
    } else {
      this.showQuestion(this._questionsData[questionNumber], questionNumber + 1);
    }
    this.currentState.level += 1;
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.checkTypeAnswer(this.currentState.time);
    } else {
      this.currentState.lives = calculateLives(this.currentState.lives, isCorrect);
      this.currentState.answers.push(Answer.wrong);

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

import TwoOfTwoView from '../view/two-of-two-view.js';
import TinderLikeView from '../view/tinder-like-view.js';
import OneOfThreeView from '../view/one-of-three-view.js';
import ExitWindowView from '../view/exit-confirm-view.js';
import {makeScreenActive} from '../util.js';

import {TimerSec, Answer, answerType} from '../data/game-data.js';
import HeaderView from '../view/header-view.js';
import Application from '../app.js';

const questionKindMap = {
  'two-of-two': {
    View: TwoOfTwoView,
    validator: (questionData, userAnswers) => questionData.answers
        .map((answer, i) => answer.type === userAnswers[i])
        .reduce((acc, handleAnswer) => acc && handleAnswer)
  },
  'tinder-like': {
    View: TinderLikeView,
    validator: (questionData, userAnswer) => questionData.answers[0].type === userAnswer
  },
  'one-of-three': {
    View: OneOfThreeView,
    validator: (questionData, userAnswer) => questionData.answers
        .reduce((acc, answer) => acc + (answer.type === userAnswer), 0) === 1
  }
};

export default class QuestionManager {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this._timer = null;
  }

  start() {
    this.gameModel.nextLevel();
    this.showQuestion();
  }

  showQuestion() {
    const {View, validator} = questionKindMap[this.gameModel.questionData().type];
    const questionView = new View(this.gameModel);
    const header = new HeaderView(this.gameModel);
    this.node = document.createElement(`div`);
    this.node.appendChild(header.element);
    this.node.appendChild(questionView.element);
    this.startTimer();

    questionView.onAnswer = (answer) => {

      if (validator(this.gameModel.questionData(), answer)) {
        this.gameModel.setAnswerType(answerType(this.gameModel.timeLeft));
      } else {
        this.gameModel.takeLife();
        this.gameModel.setAnswerType(Answer.WRONG);
      }
      this.nextQuestion();
    };

    header.onClickBack = () => this.showExitWindow();
    makeScreenActive(this.node);
  }

  nextQuestion() {
    this.stopTimer();
    if (!this.gameModel.isAlive() || this.gameModel.isLast()) {
      Application.showStats(this.gameModel);
    } else {
      this.gameModel.resetTime();
      this.gameModel.nextLevel();
      this.showQuestion();
    }
  }

  startTimer() {
    this.stopTimer();
    this._timer = setInterval(() => {
      this.gameModel.tick();
      if (this.gameModel.isTimeOut()) {
        this.stopTimer();
        this.gameModel.setAnswerType(Answer.WRONG);
        this.gameModel.takeLife();
        this.nextQuestion();
      }
      const header = new HeaderView(this.gameModel);
      this.node.replaceChild(header.element, this.node.children[0]);
      header.onClickBack = () => this.showExitWindow();
    }, TimerSec.TICK);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  showExitWindow() {
    this.stopTimer();
    const exitWindow = new ExitWindowView();
    this.node.appendChild(exitWindow.element);
    exitWindow.onClickOK = () => Application.showGreeting();
    exitWindow.onClickCancel = () => {
      this.node.removeChild(this.node.children[2]);
      this.startTimer();
    };
  }

}

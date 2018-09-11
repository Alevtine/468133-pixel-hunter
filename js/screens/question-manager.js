import GuessForEach from '../view/guess-for-each-view.js';
import GuessForOne from '../view/guess-for-one-view.js';
import FindImgOrPhoto from '../view/find-img-or-photo-view.js';
import {makeScreenActive} from '../util.js';

import {TIME_PARAMETRES, TIMER_SEC, Answer, calculateLives} from '../data/game-data.js';
import HeaderView from '../view/header-view.js';
import Application from '../app.js';

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
  constructor(model) {

    this.model = model;
    this._questionsData = this.model.data;
    this.snip = 0;
  }

  start() {
    const questionData = this._questionsData[0];
    this.showQuestion(questionData, 1);
  }

  showQuestion(questionData, nextQuestionNumber) {
    const {View, validator} = questionKindMap[questionData.kind];
    const questionView = new View(questionData, this.model.game);
    const header = new HeaderView(this.model.game);
    this.node = document.createElement(`div`);
    this.node.appendChild(header.element);
    this.node.appendChild(questionView.element);
    this.startTimer();

    questionView.onAnswer = (answer) => {
      this.handleAnswer(validator(questionData, answer));
      this.nextQuestion(nextQuestionNumber);
    };

    header.onClickBack = () => Application.showGreeting();
    makeScreenActive(this.node);
  }

  nextQuestion(questionNumber) {
    this.checkIfDead();
    if (questionNumber <= 0) {
      throw new Error(`question number should be positive`);
    }
    if (questionNumber >= this._questionsData.length) {
      Application.showStats(this.model.game);
    } else if (this.model.game.lives <= 0) {
      this.model.game.time = TIMER_SEC.limit;
      Application.showStats(this.model.game);
    } else {
      this.stopTimer();
      this.model.game.time = TIMER_SEC.limit;
      this.showQuestion(this._questionsData[questionNumber], questionNumber + 1);
    }
    this.model.game.level += 1;
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.checkTypeAnswer(this.model.game.time);
    } else {
      this.model.game.lives = calculateLives(this.model.game.lives, isCorrect);
      this.model.game.answers.splice(this.model.game.level - 1, 1, Answer.wrong);
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
    this.model.game.answers.splice(this.model.game.level - 1, 1, answerType);
  }

  startTimer() {
    this.snip = setInterval(() => {
      this.model.game.time--;
      if (this.model.game.time <= 0) {
        this.stopTimer();
        this.model.game.answers.splice(this.model.game.level - 1, 1, Answer.wrong);
        this.model.game.lives = calculateLives(this.model.game.lives, false);
      }
      const header = new HeaderView(this.model.game);
      this.node.replaceChild(header.element, this.node.children[0]);
    }, TIMER_SEC.tick);
  }

  stopTimer() {
    clearInterval(this.snip);
  }

  checkIfDead() {
    if (this.model.game.lives > 0) {
      this.model.game.isWin = true;
    } else {
      this.model.game.isWin = false;
    }
  }

}

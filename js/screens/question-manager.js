import GuessForEach from '../view/guess-for-each-view.js';
import GuessForOne from '../view/guess-for-one-view.js';
import FindImgOrPhoto from '../view/find-img-or-photo-view.js';
import {beginState} from '../data/data.js';
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
  constructor(questionsData) {
    this._questionsData = questionsData;
    this.snip = 0;
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
      Application.showStats(this.currentState);
    } else if (this.currentState.lives <= 0) {
      Application.showStats(this.currentState);
    } else {
      this.stopTimer();
      this.currentState.time = TIMER_SEC.limit;
      this.showQuestion(this._questionsData[questionNumber], questionNumber + 1);
    }
    this.currentState.level += 1;
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.checkTypeAnswer(this.currentState.time);
    } else {
      this.currentState.lives = calculateLives(this.currentState.lives, isCorrect);
      this.currentState.answers.splice(this.currentState.level - 1, 1, Answer.wrong);
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
    this.currentState.answers.splice(this.currentState.level - 1, 1, answerType);
  }

  startTimer() {
    this.snip = setInterval(() => {
      this.currentState.time--;
      if (this.currentState.time <= 0) {
        this.stopTimer();
        this.currentState.answers.splice(this.currentState.level - 1, 1, Answer.wrong);
        this.currentState.lives = calculateLives(this.currentState.lives, false);
      }
      const header = new HeaderView(this.currentState);
      this.node.replaceChild(header.element, this.node.children[0]);
    }, TIMER_SEC.tick);
  }

  stopTimer() {
    clearInterval(this.snip);
  }

  checkIfDead() {
    if (this.currentState.lives > 0) {
      this.currentState.isWin = true;
    } else {
      this.currentState.isWin = false;
    }
  }

}

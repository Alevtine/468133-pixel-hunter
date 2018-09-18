import {TimerSec, LIVES_QUANTITY} from './data/game-data.js';


export default class GameModel {
  constructor(data, player) {
    this.data = data;
    this.game = 0;
    this.player = player;
  }

  newGame() {
    this.game++;
    this.level = 0;
    this.lives = LIVES_QUANTITY;
    this.timeLeft = TimerSec.LIMIT;
    this.answers = Array(this.data.length).fill(`unknown`);
  }

  checkStarted() {
    if (this.level === 0) {
      throw new Error(`game has not started yet`);
    }
  }

  checkAlive() {
    if (!this.isAlive()) {
      throw new Error(`player is not alive`);
    }
  }

  questionData() {
    this.checkStarted();
    return this.data[this.level - 1];
  }

  setAnswerType(answerType) {
    this.checkStarted();
    this.answers[this.level - 1] = answerType;
  }

  nextLevel() {
    if (this.level === this.data.length) {
      throw new Error(`there is no next level`);
    }
    this.level++;
  }

  takeLife() {
    this.checkStarted();
    this.checkAlive();
    this.lives--;
  }

  tick() {
    if (this.isTimeOut()) {
      throw new Error(`time is out`);
    }
    this.timeLeft--;
  }

  resetTime() {
    this.timeLeft = TimerSec.LIMIT;
  }

  isAlive() {
    return this.lives > 0;
  }

  isLast() {
    return this.level === this.data.length;
  }

  isTimeOut() {
    return this.timeLeft === 0;
  }

  isStarted() {
    return this.level > 0;
  }

}

// import константы

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.resetPlay();
  }

  get currentState() {
    return this.currentState;
  }

  resetPlay() {
    this.currentState = {
      level: 1,
      lives: 3,
      time: 30,
      answers: [],
      isWin: false
    };
  }

  tick() {
    this.currentState.time--;
  }

  resetTime() {
    this.currentState.time = 30;
  }

}

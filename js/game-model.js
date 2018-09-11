import {beginState} from './data/data.js';
import {TIMER_SEC} from './data/game-data.js';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.game = Object.assign({}, beginState);
  }

  tick() {
    this.game.time--;
  }

  resetTime() {
    this.game.time = TIMER_SEC.limit;
  }

  isWin() {
    this.game.win = true;
  }


}

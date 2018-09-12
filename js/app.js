import GameModel from './game-model.js';

import Intro from './screens/intro.js';
import Greeting from './screens/greeting.js';
import Rules from './screens/rules.js';
import QuestionManager from './screens/question-manager.js';
import Stats from './screens/stats.js';


import {makeScreenActive} from './util.js';
import {QuestionScreens} from './data/data.js';

let data = QuestionScreens;

export default class Application {

  static start() {
    this.gameModel = new GameModel(data);
    this.showIntro();
  }

  static showIntro() {
    const intro = new Intro();
    makeScreenActive(intro);
  }

  static showGreeting() {
    const greeting = new Greeting();
    makeScreenActive(greeting);
  }

  static showRules() {
    const rules = new Rules(this.gameModel);
    makeScreenActive(rules);
  }

  static showGame() {
    this.gameModel.newGame();
    new QuestionManager(this.gameModel).start();
  }

  static showStats(gameModel) {
    const stats = new Stats(gameModel);
    makeScreenActive(stats);
  }

}

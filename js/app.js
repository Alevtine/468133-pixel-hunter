import GameModel from './game-model.js';

import Intro from './screens/intro.js';
import Greeting from './screens/greeting.js';
import Rules from './screens/rules.js';
import QuestionManager from './screens/question-manager.js';
import Stats from './screens/stats.js';
import Error from './view/err-view.js';

import {makeScreenActive} from './util.js';

import Loader from './data/loader.js';

let gameData;

export default class Application {
  static async start() {
    try {
      gameData = await Loader.loadData();
      await Loader.preloadImages(gameData);
      this.gameModel = new GameModel(gameData);
      this.showIntro();
    } catch (err) {
      this.showError(err);
    }
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

  static showError(err) {
    const error = new Error(err);
    makeScreenActive(error.element);
  }

}

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

  static async showStats(gameModel) {

    const playerName = gameModel.player;
    const dataToPOST = {
      'answers': gameModel.answers,
      'lives': gameModel.lives,
      'player': playerName
    };
    try {
      await Loader.saveResult(dataToPOST, playerName);
      const results = await Loader.loadResults(playerName);
      const stats = new Stats(gameModel, results);
      makeScreenActive(stats);
    } catch (err) {
      this.showError(err);
    }
  }

  static showError(err) {
    const error = new Error(err);
    makeScreenActive(error.element);
  }

}

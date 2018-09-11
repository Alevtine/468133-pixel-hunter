import GameModel from './game-model.js';

import Intro from './screens/intro.js';
import Greeting from './screens/greeting.js';
import Rules from './screens/rules.js';
import QuestionManager from './screens/question-manager.js';
import Stats from './screens/stats.js';

import {QuestionScreens} from './data/data.js';
import {makeScreenActive} from './util.js';


export default class Application {

  static start() {
    this.game = new GameModel();
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
    const rules = new Rules();
    makeScreenActive(rules);
  }

  static showGame() {
    const newGame = new QuestionManager(QuestionScreens);
    newGame.start();
  }

  static showStats(currentState) {
    const stats = new Stats(currentState);
    makeScreenActive(stats);
  }

}

import GameModel from './game-model.js';

import Intro from './screens/intro.js';
import Greeting from './screens/greeting.js';
import Rules from './screens/rules.js';
import QuestionManager from './screens/question-manager.js';
import Stats from './screens/stats.js';

import {QuestionScreens} from './data/data.js';
import {makeScreenActive} from './util.js';


export default class Application {

  start() {
    this.game = new GameModel();
  }

  showIntro() {
    const intro = new Intro();
    makeScreenActive(intro);
    //    this.start()
  }

  showGreeting() {
    const greeting = new Greeting();
    makeScreenActive(greeting);
  }

  showRules() {
    const rules = new Rules();
    makeScreenActive(rules);
  }

  showGame() {
    const newGame = new QuestionManager(QuestionScreens);
    newGame.start();
  }

  showStats(currentState) {
    const stats = new Stats(currentState);
    makeScreenActive(stats);
  }


}

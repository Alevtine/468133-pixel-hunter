import {makeScreenActive} from '../util.js';
import {QuestionScreens, beginState} from '../data/data.js';
import QuestionManager from './question-manager.js';
import greeting from './greeting.js';
import RulesView from '../view/rules-view.js';
import HeaderView from '../view/header-view.js';

export default class Rules {
  constructor() {
    const header = new HeaderView(beginState);
    const rules = new RulesView();
    const node = document.createElement(`div`);
    node.appendChild(header.element);
    node.appendChild(rules.element);

    rules.onClickNext = () => {
      const questionManager = new QuestionManager(QuestionScreens);
      questionManager.start();
    };

    header.onClickBack = () => {
      makeScreenActive(greeting());
    };

    return node;
  }
}

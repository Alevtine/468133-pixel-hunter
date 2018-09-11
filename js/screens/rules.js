import {beginState} from '../data/data.js';
import RulesView from '../view/rules-view.js';
import HeaderView from '../view/header-view.js';
import Application from '../app.js';

export default class Rules {
  constructor() {
    this.header = new HeaderView(beginState);
    this.rules = new RulesView();
    const node = document.createElement(`div`);
    node.appendChild(this.header.element);
    node.appendChild(this.rules.element);

    this.rules.onClickNext = () => Application.showGame();
    this.header.onClickBack = () => Application.showGreeting();

    return node;
  }
}

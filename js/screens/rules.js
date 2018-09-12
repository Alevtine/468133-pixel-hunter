import RulesView from '../view/rules-view.js';
import HeaderView from '../view/header-view.js';
import Application from '../app.js';

export default class Rules {
  constructor(gameModel) {
    this.header = new HeaderView();
    this.rules = new RulesView(gameModel);
    const node = document.createElement(`div`);
    node.appendChild(this.header.element);
    node.appendChild(this.rules.element);

    this.rules.onClickNext = () => Application.showGame();
    this.header.onClickBack = () => Application.showGreeting();

    return node;
  }
}

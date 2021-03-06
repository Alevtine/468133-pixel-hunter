import StatsView from '../view/stats-view.js';
import HeaderView from '../view/header-view.js';
import Application from '../app.js';

export default class Stats {
  constructor(gameModel, results) {

    const header = new HeaderView(gameModel);
    const stats = new StatsView(gameModel, results);
    const node = document.createElement(`div`);
    node.appendChild(header.element);
    node.appendChild(stats.element);

    header.onClickBack = () => Application.showGreeting();

    return node;
  }
}

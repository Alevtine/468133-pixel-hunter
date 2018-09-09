import {makeScreenActive} from '../util.js';
import greeting from './greeting.js';
import StatsView from '../view/stats-view.js';
import HeaderView from '../view/header-view.js';

export default class Stats {
  constructor(finalState) {

    const header = new HeaderView(finalState);
    const stats = new StatsView(finalState);
    const node = document.createElement(`div`);
    node.appendChild(header.element);
    node.appendChild(stats.element);

    header.onClickBack = () => {
      makeScreenActive(greeting());
    };

    return node;
  }
}

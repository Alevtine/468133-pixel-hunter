import {makeScreenActive} from '../util.js';
import greeting from './greeting.js';
import StatsView from '../view/stats-view.js';

export default () => {
  const stats = new StatsView();

  stats.onClickBack = () => {
    makeScreenActive(greeting());
  };

  return stats.element;
};

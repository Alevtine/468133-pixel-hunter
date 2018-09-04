import {makeScreenActive} from '../util.js';
import insertRules from './rules.js';
import GreetingView from '../view/greeting-view.js';

export default () => {
  const greeting = new GreetingView();
  greeting.onClickNext = () => {
    makeScreenActive(insertRules());
  };

  return greeting.element;
};

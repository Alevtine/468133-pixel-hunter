import {makeScreenActive} from '../util.js';
import rules from './rules.js';
import GreetingView from '../view/greeting-view.js';

export default () => {
  const greeting = new GreetingView();
  greeting.onClickNext = () => {
    makeScreenActive(rules());
  };

  return greeting.element;
};

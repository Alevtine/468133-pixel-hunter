import {makeScreenActive} from '../util.js';
import Rules from './rules.js';
import GreetingView from '../view/greeting-view.js';

export default () => {
  const greeting = new GreetingView();
  greeting.onClickNext = () => {
    makeScreenActive(new Rules());
  };

  return greeting.element;
};

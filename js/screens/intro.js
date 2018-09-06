import {makeScreenActive} from '../util.js';
import greeting from './greeting.js';
import IntroView from '../view/intro-view.js';

export default () => {
  const intro = new IntroView();
  intro.onClickNext = () => {
    makeScreenActive(greeting());
  };

  return intro.element;
};

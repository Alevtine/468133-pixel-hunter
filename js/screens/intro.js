import {makeScreenActive} from '../util.js';
import insertGreeting from './greeting.js';
import IntroView from '../view/intro-view.js'

export default () => {
  const intro = new IntroView();
  intro.onClickNext = () => {
    makeScreenActive(insertGreeting())
  }

  return intro.element;
}

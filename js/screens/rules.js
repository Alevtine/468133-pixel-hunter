import {makeScreenActive} from '../util.js';
import insertGuessForEach from './guessForEach.js';
import insertGreeting from './greeting.js';
import RulesView from '../view/rules-view.js'

export default () => {
  const rules = new RulesView();

  rules.onClickNext = () => {
    makeScreenActive(insertGuessForEach())
  }

  rules.onClickBack = () => {
    makeScreenActive(insertGreeting())
  }

  return rules.element;
}

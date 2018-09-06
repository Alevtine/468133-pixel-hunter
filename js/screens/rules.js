import {makeScreenActive} from '../util.js';
import {QuestionScreens} from '../data/data.js';
import QuestionManager from './question-manager.js';
import greeting from './greeting.js';
import RulesView from '../view/rules-view.js';

export default () => {
  const rules = new RulesView();
  rules.onClickNext = () => {
    const questionManager = new QuestionManager(QuestionScreens);
    questionManager.start();
  };

  rules.onClickBack = () => {
    makeScreenActive(greeting());
  };

  return rules.element;
};

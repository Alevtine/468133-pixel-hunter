import GreetingView from '../view/greeting-view.js';
import Application from '../app.js';

export default class Greeting {
  constructor() {
    this.greeting = new GreetingView();
    this.greeting.onClickNext = () => Application.prototype.showRules();
    return this.greeting.element;
  }

}

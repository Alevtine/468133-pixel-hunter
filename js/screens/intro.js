import IntroView from '../view/intro-view.js';
import Application from '../app.js';

export default class Intro {
  constructor() {
    this.intro = new IntroView();
    this.intro.onClickNext = () => Application.showGreeting();
    return this.intro.element;
  }
}

import {resize} from '../util.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import AbstractView from '../abstract-view.js';

export default class GuessForOne extends AbstractView {

  constructor(questionData, currentState) {
    super();
    if (questionData.kind !== `guessForOne`) {
      throw new Error(`incorrect screen kind`);
    }
    this.questionData = questionData;
    this.currentState = currentState;
  }

  get template() {
    return `
      ${header(this.currentState)}
      <section class="game">
        <p class="game__task">${this.questionData.title}</p>
        <form class="game__content  game__content--wide">
  ${this.questionData.answers.map((answer) =>
    `<div class="game__option">
      <img src="${answer.pictureURL}" alt="Option 1">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`)}
        </form>
        <ul class="stats">
  ${statsResult(this.currentState.stat)}
        </ul>
      </section>`;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const backButton = this.element.querySelector(`button.back`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    gameForm.addEventListener(`change`, () => {
      const answers = gameForm.querySelectorAll(`input[type="radio"]:checked`);
      answers.forEach((item) => {
        if (item) {
          this.currentState.answers.push(`fast`);
          this.onAnswer();
        }
      });
    });

    backButton.addEventListener(`click`, () => {
      this.onClickBack();
    });

    pics.forEach((it) => {
      it.addEventListener(`load`, () => {
        resize(it);
      });
    });
  }

  onAnswer() {}
  onClickBack() {}

}

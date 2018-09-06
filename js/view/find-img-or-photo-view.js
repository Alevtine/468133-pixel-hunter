import {resize} from '../util.js';
import header from '../header.js';
import statsResult from '../stats-result.js';

import AbstractView from '../abstract-view.js';

export default class FindImgOrPhoto extends AbstractView {

  constructor(questionData, currentState) {
    super();
    if (questionData.kind !== `findImgOrPhoto`) {
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
      <form class="game__content  game__content--triple">
  ${this.questionData.answers.map((answer, i) =>
    `<div class="game__option">
    <img src="${answer.pictureURL}" alt="Option ${i + 1}">
  </div>`).join(``)}
      </form>
      <ul class="stats">
  ${statsResult(this.currentState.stat)}
      </ul>
    </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const answers = gameForm.querySelectorAll(`.game__option`);
    const backButton = this.element.querySelector(`button.back`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    answers.forEach((item) => {
      item.addEventListener(`click`, () => {
        this.currentState.answers.push(`wrong`);
        this.onAnswer();
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

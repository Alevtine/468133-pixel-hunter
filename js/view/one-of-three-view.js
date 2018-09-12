import {resize} from '../util.js';
import statsResult from './stats-result-view.js';

import AbstractView from '../abstract-view.js';

export default class OneOfThreeView extends AbstractView {

  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.questionData = gameModel.questionData();
    if (this.questionData.type !== `one-of-three`) {
      throw new Error(`incorrect screen kind`);
    }
  }

  get template() {
    return `
    <section class="game">
      <p class="game__task">${this.questionData.question}</p>
      <form class="game__content  game__content--triple">
  ${this.questionData.answers.map((answer, i) =>
    `<div class="game__option">
    <img src="${answer.image.url}" alt="Option ${i + 1}">
  </div>`).join(``)}
      </form>
      <ul class="stats">
  ${statsResult(this.gameModel.game, this.gameModel.player, this.gameModel.answers)}
      </ul>
    </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const answers = gameForm.querySelectorAll(`.game__option`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    answers.forEach((item) => {
      item.addEventListener(`click`, () => {
        const userAnswerIndex = Array.prototype.indexOf.call(
            item.parentNode.children, item
        );
        this.onAnswer(this.questionData.answers[userAnswerIndex].type);
      });
    });

    pics.forEach((it) => {
      it.addEventListener(`load`, () => {
        resize(it);
      });
    });
  }

  onAnswer() {}

}

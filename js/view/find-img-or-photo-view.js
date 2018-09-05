import {resize} from '../util.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as gameData from '../data/game-data.js';
import * as data from '../data/data.js';

import AbstractView from '../abstract-view.js';

export default class FindImgOrPhoto extends AbstractView {

  get template() {
    return `
      ${header(data.beginState)}
    <section class="game">
      <p class="game__task">${data.QuestionScreen[2][`title`]}</p>
      <form class="game__content  game__content--triple">
  ${data.QuestionScreen[2][`answers`].map((it, i) =>
    `<div class="game__option">
    <img src="${it.pictureURL}" alt="Option ${i + 1}">
  </div>`).join(``)}
      </form>
      <ul class="stats">
  ${statsResult(data.stat)}
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
        data.beginState.answers.push(`wrong`);
        if (data.beginState.answers.length === gameData.ANSWERS_QTTY || data.beginState.lives === 0) {
          this.onAnswer(!rightAnswer);
        } else {
          this.onAnswer(rightAnswer);
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

import {resize} from '../util.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as gameData from '../data/game-data.js';
import * as data from '../data/data.js';

import AbstractView from '../abstract-view.js';

export default class GuessForOne extends AbstractView {

  get template() {
    return `
      ${header(data.beginState)}
      <section class="game">
        <p class="game__task">${data.QuestionScreen[1][`title`]}</p>
        <form class="game__content  game__content--wide">
  ${data.QuestionScreen[1][`answers`].map((it) =>
    `<div class="game__option">
      <img src="${it.pictureURL}" alt="Option 1">
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
  ${statsResult(data.stat)}
        </ul>
      </section>`;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const answers = gameForm.querySelectorAll(`.game__answer`);
    const backButton = this.element.querySelector(`button.back`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    gameForm.addEventListener(`change`, () => {
      data.beginState.answers.push(`fast`);
      answers.forEach((item) => {
        if (item.querySelector(`input:checked`)) {
          if (data.beginState.answers.length === gameData.ANSWERS_QTTY || data.beginState.lives === 0) {
            this.onAnswer(!rightAnswer);
          } else {
            this.onAnswer(rightAnswer);
          }
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

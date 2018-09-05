import {resize} from '../util.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as gameData from '../data/game-data.js';
import * as data from '../data/data.js';


import AbstractView from '../abstract-view.js';

export default class GuessForEach extends AbstractView {

  get template() {
    return `
      ${header(data.beginState)}
      <section class="game">
        <p class="game__task">${data.QuestionScreen[0][`title`]}</p>
    <form class="game__content">
  ${data.QuestionScreen[0][`answers`].map((it, i) =>
    `<div class="game__option">
        <img src="${it.pictureURL}" alt="Option ${i + 1}">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
    </form>
        <ul class="stats">
  ${statsResult(data.stat)}
        </ul>
      </section>`;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const backButton = this.element.querySelector(`button.back`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    gameForm.addEventListener(`change`, () => {
      if (gameForm.querySelector(`input[name="question1"]:checked`) && gameForm.querySelector(`input[name="question2"]:checked`)) {
        data.beginState.answers.push(`correct`);
        if (data.beginState.answers.length === gameData.ANSWERS_QTTY || data.beginState.lives === 0) {
          this.onAnswer();
        }
      }
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

import {resize} from '../util.js';
import statsResult from './stats-result-view.js';
import AbstractView from '../abstract-view.js';

export default class TinderLikeView extends AbstractView {

  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.questionData = gameModel.questionData();
    if (this.questionData.type !== `tinder-like`) {
      throw new Error(`incorrect screen kind`);
    }
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.questionData.question}</p>
        <form class="game__content  game__content--wide">
  ${this.questionData.answers.map((answer) =>
    `<div class="game__option">
      <img src="${answer.image.url}" alt="Option 1">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>`)}
        </form>
        <ul class="stats">
  ${statsResult(this.gameModel.game, this.gameModel.player, this.gameModel.answers)}
        </ul>
      </section>`;
  }

  bind() {
    const answers = this.element.querySelectorAll(`input`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    for (const answer of answers) {
      answer.addEventListener(`change`, (evt) => {
        this.onAnswer(evt.target.value);
      });
    }

    pics.forEach((it) => {
      it.addEventListener(`load`, () => {
        resize(it);
      });
    });
  }

  onAnswer() {}

}

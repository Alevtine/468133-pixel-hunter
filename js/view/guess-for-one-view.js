import {resize} from '../util.js';
import statsResult from './stats-result-view.js';
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
  ${statsResult(this.currentState.answers)}
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

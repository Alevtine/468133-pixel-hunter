import {resize} from '../util.js';
import statsResult from '../stats-result.js';
import AbstractView from '../abstract-view.js';

export default class GuessForEach extends AbstractView {

  constructor(questionData, currentState) {
    super();
    if (questionData.kind !== `guessForEach`) {
      throw new Error(`incorrect screen kind`);
    }
    this.questionData = questionData;
    this.currentState = currentState;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.questionData.title}</p>
    <form class="game__content">
  ${this.questionData.answers.map((answer, i) =>
    `<div class="game__option">
        <img src="${answer.pictureURL}" alt="Option ${i + 1}">
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
  ${statsResult(this.currentState.answers)}
        </ul>
      </section>`;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const pics = this.element.querySelectorAll(`.game__option > img`);

    gameForm.addEventListener(`change`, () => {
      const userAnswers = Array.from(gameForm.querySelectorAll(`input[type="radio"]:checked`))
        .map((element) => element.value);
      if (userAnswers.length === this.questionData.answers.length) {
        this.onAnswer(userAnswers);
      }
    });

    pics.forEach((it) => {
      it.addEventListener(`load`, () => {
        resize(it);
      });
    });

  }
  onAnswer() {}
}

import AbstractView from '../abstract-view.js';

export default class HeaderView extends AbstractView {
  constructor(gameModel = null) {
    super();
    this.gameModel = gameModel;
  }

  get template() {
    if (this.gameModel && this.gameModel.isStarted()) {
      return `
      <header class="header">
      ${this.templateBackButton()}
      <div class="game__timer">${this.gameModel.timeLeft}</div>
      <div class="game__lives">
        ${new Array(3 - this.gameModel.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
        ${new Array(this.gameModel.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
      </div>
      </header>`;
    }
    return `<header class="header">${this.templateBackButton()}</header>`;
  }

  templateBackButton() {
    return `
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>`;
  }

  bind() {
    const backButton = this.element.querySelector(`button.back`);
    const timer = this.element.querySelector(`.game__timer`);
    backButton.addEventListener(`click`, () => {
      this.onClickBack();
    });
    if (this.gameModel && this.gameModel.timeLeft <= 5 && this.gameModel.isAlive()) {
      timer.classList.add(`blink`);
    }
  }

  onClickBack() {}

}

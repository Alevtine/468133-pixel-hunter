import lives from '../lives.js';
import AbstractView from '../abstract-view.js';


export default class HeaderView extends AbstractView {
  constructor(currentState) {
    super();
    this.currentState = currentState;
  }

  get template() {
    if (this.currentState) {
      return `
      <header class="header">
      ${this.templateBackButton()}
      <div class="game__timer">${this.currentState.time}</div>
      ${lives(this.currentState)}
      </header>`;
    }
    return `<header class="header">${this.templateBackButton()}</header>`;
  }

  templateBackButton() {
    return `
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>`;
  }

  bind() {
    const backButton = this.element.querySelector(`button.back`);
    backButton.addEventListener(`click`, () => {
      this.onClickBack();
    });
  }

  onClickBack() {}

}

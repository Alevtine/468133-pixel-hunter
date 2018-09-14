import AbstractView from '../abstract-view.js';

export default class ExitWindowView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<section class="modal">
  <form class="modal__inner">
    <button class="modal__close" type="button">
      <span class="visually-hidden">Закрыть</span>
    </button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__button-wrapper">
      <button class="modal__btn">Ок</button>
      <button class="modal__btn">Отмена</button>
    </div>
  </form>
</section>`;
  }

  bind() {
    const buttonOK = this.element.querySelector(`.modal__button-wrapper`).children[0];
    buttonOK.addEventListener(`click`, () => this.onClickOK());

    const buttonCancel = this.element.querySelector(`.modal__button-wrapper`).children[1];
    const buttonClose = this.element.querySelector(`.modal__close`);
    buttonCancel.addEventListener(`click`, () => this.onClickCancel());
    buttonClose.addEventListener(`click`, () => this.onClickCancel());
  }

  onClickOK() {}
  onClickCancel() {}

}

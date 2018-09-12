import AbstractView from '../abstract-view.js';

export default class RulesView extends AbstractView {

  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
  }

  get template() {
    let value = ``;
    if (this.gameModel.player !== ``) {
      value = ` value="${this.gameModel.player}"`;
    }
    return `
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>Угадай 10 раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится 30 секунд.</li>
          <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя"${value}>
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>
      `;
  }

  bind() {
    const formInput = this.element.querySelector(`.rules__input`);
    const continueButton = this.element.querySelector(`.rules__button`);

    continueButton.disabled = formInput.value.trim().length === 0;
    formInput.addEventListener(`input`, () => {
      continueButton.disabled = formInput.value.trim().length === 0;
    });

    continueButton.addEventListener(`click`, () => {
      this.gameModel.player = formInput.value.trim();
      this.onClickNext();
    });
  }

  onClickNext() {}

}

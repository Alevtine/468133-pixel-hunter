import {getFromTemplate, makeScreenActive} from '../util.js';
import insertGuessForEach from './guessForEach.js';
import insertGreeting from './greeting.js';
import header from '../header.js';

export default function insertRules() {
  const node = getFromTemplate(`
    ${header()}
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
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>
    `);

  const continueButton = node.querySelector(`.rules__button`);
  const formInput = node.querySelector(`.rules__input`);

  formInput.oninput = () => {
    if (formInput.value.length === 0 || formInput.value.trim().length <= 0) {
      continueButton.disabled = true;
    } else {
      continueButton.disabled = false;
    }
  };

  continueButton.addEventListener(`click`, () => {
    makeScreenActive(insertGuessForEach());
  });

  const backButton = node.querySelector(`button.back`);
  backButton.addEventListener(`click`, () => {
    makeScreenActive(insertGreeting());
  });

  return node;
}

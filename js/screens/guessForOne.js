import {getFromTemplate, makeScreenActive} from '../util.js';
import insertFindImgOrPhoto from './findImgOrPhoto';
import insertGreeting from './greeting.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as data from '../data/data.js';

export default function insertGuessForOne() {
  const node = getFromTemplate(`
    ${header(data.beginState)}
    <section class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <ul class="stats">
${statsResult(data.stat)}
      </ul>
    </section>`);

  const gameForm = node.querySelector(`.game__content`);
  const answers = gameForm.querySelectorAll(`.game__answer`);
  gameForm.addEventListener(`change`, () => {
    answers.forEach((item) => {
      if (item.querySelector(`input:checked`)) {
        makeScreenActive(insertFindImgOrPhoto());
      }
    });
  });

  const backButton = node.querySelector(`button.back`);
  backButton.addEventListener(`click`, () => {
    makeScreenActive(insertGreeting());
  });

  return node;
}

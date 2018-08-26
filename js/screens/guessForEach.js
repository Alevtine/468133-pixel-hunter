import {getFromTemplate, makeScreenActive} from '../util.js';
import insertGuessForOne from './guessForOne.js';
import insertGreeting from './greeting.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as data from '../data/data.js';


export default function insertGuessForEach() {

  const node = getFromTemplate(`
    ${header(data.beginState)}
    <section class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>

      <form class="game__content">
        <div class="game__option">
          <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>

      <ul class="stats">
${statsResult(data.stat)}
      </ul>
    </section>`);

  const gameForm = node.querySelector(`.game__content`);
  gameForm.addEventListener(`change`, () => {
    if (gameForm.querySelector(`input[name="question1"]:checked`) && gameForm.querySelector(`input[name="question2"]:checked`)) {
      makeScreenActive(insertGuessForOne());
    }
  });

  const backButton = node.querySelector(`button.back`);
  backButton.addEventListener(`click`, () => {
    makeScreenActive(insertGreeting());
  });

  return node;
}

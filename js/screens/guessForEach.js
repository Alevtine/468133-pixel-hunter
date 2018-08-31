import {getFromTemplate, makeScreenActive} from '../util.js';
import insertGuessForOne from './guessForOne.js';
import insertGreeting from './greeting.js';
import insertStats from './stats.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as gameData from '../data/game-data.js';
import * as data from '../data/data.js';

const answerFill = `
${data.QuestionScreen[0][`answers`].map((it, i) =>
    `<div class="game__option">
      <img src="${it.pictureURL}" alt="Option ${i + 1}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`).join(``)
}`;


export default function insertGuessForEach() {
  const node = getFromTemplate(`
    ${header(data.beginState)}
    <section class="game">
      <p class="game__task">${data.QuestionScreen[0][`title`]}</p>
  <form class="game__content">
${answerFill}
  </form>
      <ul class="stats">
${statsResult(data.stat)}
      </ul>
    </section>`);

  const gameForm = node.querySelector(`.game__content`);

  gameForm.addEventListener(`change`, () => {
    if (gameForm.querySelector(`input[name="question1"]:checked`) && gameForm.querySelector(`input[name="question2"]:checked`)) {
      data.beginState.answers.push(`correct`);
      if (data.beginState.answers.length === gameData.ANSWERS_QTTY || data.beginState.lives === 0) {
        makeScreenActive(insertStats());
      } else {
        makeScreenActive(insertGuessForOne());
      }
    }
  });

  const backButton = node.querySelector(`button.back`);
  backButton.addEventListener(`click`, () => {
    makeScreenActive(insertGreeting());
  });

  return node;
}

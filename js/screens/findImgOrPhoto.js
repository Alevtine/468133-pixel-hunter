import {getFromTemplate, makeScreenActive} from '../util.js';
import insertStats from './stats.js';
import insertGreeting from './greeting.js';
import header from '../header.js';
import statsResult from '../stats-result.js';
import * as data from '../data/data.js';

const answerFill = `
${data.QuestionScreen[2][`answers`].map((it, i) =>
    `<div class="game__option">
  <img src="${it.pictureURL}" alt="Option ${i + 1}" width="304" height="455">
</div>`).join(``)}
`;


export default function insertFindImgOrPhoto() {
  const node = getFromTemplate(`
    ${header(data.beginState)}
  <section class="game">
    <p class="game__task">${data.QuestionScreen[2][`title`]}</p>
    <form class="game__content  game__content--triple">
${answerFill}
    </form>
    <ul class="stats">
${statsResult(data.stat)}
    </ul>
  </section>`);

  const gameForm = node.querySelector(`.game__content`);
  const answers = gameForm.querySelectorAll(`.game__option`);
  answers.forEach((item) => {
    item.addEventListener(`click`, () => {
      makeScreenActive(insertStats());
    });
  });

  const backButton = node.querySelector(`button.back`);
  backButton.addEventListener(`click`, () => {
    makeScreenActive(insertGreeting());
  });

  return node;
}

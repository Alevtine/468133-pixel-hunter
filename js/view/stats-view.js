import AbstractView from '../abstract-view.js';
import header from '../header.js';
import * as data from '../data/data.js';
import * as gameData from '../data/game-data.js';
import statsResult from '../stats-result.js';


export default class StatsView extends AbstractView {

  constructor(questionData, currentState) {
    super();
    this.questionData = questionData;
    this.currentState = currentState;
  }

  get template() {
    const fastAnswers = data.beginState.answers.filter((it) => it === `fast`).length;
    const slowAnswers = data.beginState.answers.filter((it) => it === `slow`).length;
    const interimResult = data.beginState.answers.filter((it) => it === `unknown` || it === `wrong`).length;
    const livesLeft = data.beginState.lives;
    const totalResult = gameData.getScore(data.beginState.answers, data.beginState.lives);

    return `
      ${header()}
    <section class="result">
      <h2 class="result__title">Победа!</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            <ul class="stats">
  ${statsResult(data.beginState.answers)}
            </ul>
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${totalResult - interimResult * gameData.Point.bonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fastAnswers} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${fastAnswers * gameData.Point.fast}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${livesLeft} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${livesLeft * gameData.Point.bonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slowAnswers} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${slowAnswers * gameData.Point.slow}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${totalResult}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--wrong"></li>
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
    </section>`;
  }

  bind() {
    const backButton = this.element.querySelector(`button.back`);
    backButton.addEventListener(`click`, () => {
      this.onClickBack();
    });
  }

  onClickBack() {}

}

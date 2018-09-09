import AbstractView from '../abstract-view.js';
import {getScore, Point} from '../data/game-data.js';
import statsResult from '../stats-result.js';


export default class StatsView extends AbstractView {
  constructor(finalState) {
    super();
    this.finalState = finalState;
    this.title = this.finalState.isWin ? `Победа!` : `Проигрыш`;
  }

  get template() {
    return `
  <section class="result">
    <h2 class="result__title">${this.title}</h2>
  ${this.finalState.isWin ? this.templateWin() : this.templateFail()}
  </section>
  `;
  }

  templateWin() {
    const interimResult = this.finalState.answers.filter((answer) => answer !== `unknown` && answer !== `wrong`).length;
    const interimPoints = interimResult * Point.correct;
    const totalPoints = getScore(this.finalState.answers, this.finalState.lives);
    return `
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
${statsResult(this.finalState.answers)}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${interimPoints}</td>
      ${this.templateLivesPoints()}
      ${this.templateFastPoints()}
      ${this.templateSlowPoints()}
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
    </tr>
    </table>`;
  }

  templateFail() {
    return `
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
${statsResult(this.finalState.answers)}
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
  }


  templateLivesPoints() {
    const livesLeft = Math.max(0, this.finalState.lives);
    const points = livesLeft * Point.bonus;
    if (this.finalState.isWin && livesLeft) {
      return `
<tr>
  <td></td>
  <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${livesLeft}<span class="stats__result stats__result--alive"></span>
  </td>
  <td class="result__points">× 50</td>
  <td class="result__total">${points}</td>
</tr>`;
    } else {
      return ``;
    }
  }

  templateFastPoints() {
    const fastAnswers = this.finalState.answers.filter((it) => it === `fast`).length;
    const points = fastAnswers * Point.fast;
    if (this.finalState.isWin && fastAnswers) {
      return `
<tr>
  <td></td>
  <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${fastAnswers}<span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${points}</td>
</tr>`;
    } else {
      return ``;
    }
  }

  templateSlowPoints() {
    const slowAnswers = this.finalState.answers.filter((it) => it === `slow`).length;
    const points = slowAnswers * Point.slow;
    if (this.finalState.isWin && slowAnswers) {
      return `
<tr>
  <td></td>
  <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${slowAnswers}<span class="stats__result stats__result--slow"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${points}</td>
</tr>`;
    } else {
      return ``;
    }
  }


}

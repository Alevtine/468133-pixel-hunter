import AbstractView from '../abstract-view.js';
import {getScore, Point, Title} from '../data/game-data.js';
import statsResult from './stats-result-view.js';


export default class StatsView extends AbstractView {
  constructor(gameModel, results) {
    super();
    this.gameModel = gameModel;
    this.results = results;
    this.title = this.gameModel.isAlive() ? Title.WIN : Title.FAIL;
  }

  get template() {
    let node = [];
    this.results.forEach((result, i) => {
      node.unshift(result.lives > 0 ? this.templateWin(result, i + 1)
        : this.templateFail(result, i + 1));
    });

    return `
  <section class="result">
    <h2 class="result__title">${this.title}</h2>
    ${node.join(``)}
  </section>
  `;
  }

  templateWin(result, game) {
    const interimResult = result.answers.filter((answer) => answer !== `unknown` && answer !== `wrong`).length;
    const interimPoints = interimResult * Point.CORRECT;
    const totalPoints = getScore(result.answers, result.lives);
    return `
  <table class="result__table">
    <tr>
      ${statsResult(game, result.player, result.answers)}
      <td class="result__points">× 100</td>
      <td class="result__total">${interimPoints}</td>
      ${this.templateLivesPoints(result.lives)}
      ${this.templateFastPoints(result.answers)}
      ${this.templateSlowPoints(result.answers)}
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
    </tr>
    </table>`;
  }

  templateFail(result, game) {
    return `
      <table class="result__table">
        <tr>
          ${statsResult(game, result.player, result.answers)}
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
  }


  templateLivesPoints(lives) {
    const livesLeft = lives;
    const points = livesLeft * Point.BONUS;
    return `
<tr>
  <td></td>
  <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${livesLeft}<span class="stats__result stats__result--alive"></span>
  </td>
  <td class="result__points">× 50</td>
  <td class="result__total">${points}</td>
</tr>`;
  }

  templateFastPoints(answers) {
    const fastAnswers = answers.filter((it) => it === `fast`).length;
    const points = fastAnswers * Point.FAST;
    if (!fastAnswers) {
      return ``;
    }
    return `
<tr>
  <td></td>
  <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${fastAnswers}<span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${points}</td>
</tr>`;
  }

  templateSlowPoints(answers) {
    const slowAnswers = answers.filter((it) => it === `slow`).length;
    const points = slowAnswers * Point.SLOW;
    if (!slowAnswers) {
      return ``;
    }
    return `
<tr>
  <td></td>
  <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${slowAnswers}<span class="stats__result stats__result--slow"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${points}</td>
</tr>`;
  }
}

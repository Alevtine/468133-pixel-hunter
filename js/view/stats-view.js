import AbstractView from '../abstract-view.js';
import {getScore, Point} from '../data/game-data.js';
import statsResult from './stats-result-view.js';


export default class StatsView extends AbstractView {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.title = this.gameModel.isAlive() ? `Победа!` : `Проигрыш`;
  }

  get template() {
    let node = [];
    for (let i = 0; i < this.gameModel.allAnswers.length; i++) {
      let answers = this.gameModel.allAnswers[i];
      let lives = this.gameModel.allLives[i];
      let player = this.gameModel.allPlayers[i];
      node.push(lives > 0 ? this.templateWin(i + 1, player, answers, lives) : this.templateFail(i + 1, player, answers));
    }
    return `
  <section class="result">
    <h2 class="result__title">${this.title}</h2>
    ${node.join(``)}
  </section>
  `;
  }

  templateWin(game, player, answers, lives) {
    const interimResult = answers.filter((answer) => answer !== `unknown` && answer !== `wrong`).length;
    const interimPoints = interimResult * Point.correct;
    const totalPoints = getScore(answers, lives);
    return `
  <table class="result__table">
    <tr>
      ${statsResult(game, player, answers)}
      <td class="result__points">× 100</td>
      <td class="result__total">${interimPoints}</td>
      ${this.templateLivesPoints(lives)}
      ${this.templateFastPoints(answers)}
      ${this.templateSlowPoints(answers)}
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${totalPoints}</td>
    </tr>
    </table>`;
  }

  templateFail(game, player, answers) {
    return `
      <table class="result__table">
        <tr>
          ${statsResult(game, player, answers)}
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
  }


  templateLivesPoints(lives) {
    const livesLeft = lives;
    const points = livesLeft * Point.bonus;
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
    const points = fastAnswers * Point.fast;
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
    const points = slowAnswers * Point.slow;
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

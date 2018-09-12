export default (game, player, answers) => {

  const arr = Array.from(answers.values());
  const node = [];
  arr.map((it) => {
    it = `<li class="stats__result stats__result--${it}"></li>`;
    node.push(it);
  });

  return `
  <td class="result__number">${game}. ${player}</td>
  <td colspan="2">
    <ul class="stats">
      ${node.join(``)}
    </ul>
  </td>
  `;
};

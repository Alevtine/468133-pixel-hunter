export default function lives(data) {
  const node = `
  <div class="game__lives">
    ${new Array(data.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
  </div>`;

  return node;
}

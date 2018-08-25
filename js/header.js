import lives from './lives.js';

export default (data) => {
  if (data) {
    // что с var
    var indics = `
      <div class="game__timer">${data.time}</div>
      ${lives(data)}`;
  } else {
    indics = ``;
  }

  const header = `
  <header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
${indics}
</header>`;

  return header;
};

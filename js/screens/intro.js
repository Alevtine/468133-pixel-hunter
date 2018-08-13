import {getFromTemplate, makeScreenActive} from '../util.js';
import insertGreeting from './greeting.js';

export default function insertIntro() {
  const node = getFromTemplate(`
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `);

  const starButton = node.querySelector(`.intro__asterisk`);

  starButton.addEventListener(`click`, () => {
    makeScreenActive(insertGreeting());
  });

  return node;
}

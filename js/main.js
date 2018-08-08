'use strict';

const RIGHT = 39;
const LEFT = 37;

const main = document.querySelector(`#main`);
const screens = document.querySelectorAll(`template`);

const selectSlide = (index) => {
  main.innerHTML = ``;
  main.appendChild(screens[index].content.cloneNode(true));
};

let current = 0;
selectSlide(current);

const nextScreen = () => {
  if (current < screens.length - 1) {
    selectSlide(++current);
  }
};

const prevScreen = () => {
  if (current > 0) {
    selectSlide(--current);
  }
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT:
      nextScreen();
      break;
    case LEFT:
      prevScreen();
      break;
  }
});

document.querySelector(`body`).insertAdjacentHTML(`beforeend`,
    `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`);

const arrowElement = document.querySelectorAll(`.arrows__btn`);

document.addEventListener(`click`, (evt) => {
  switch (evt.target) {
    case arrowElement[0]:
      prevScreen();
      break;
    case arrowElement[1]:
      nextScreen();
      break;
  }
});

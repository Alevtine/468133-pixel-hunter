export function getFromTemplate(string) {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
}

export function makeScreenActive(screen) {
  const mainScreen = document.querySelector(`#main`);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(screen);
}

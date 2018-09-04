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

export function resize(pic) {

  if (pic.height > pic.parentNode.clientHeight) {
    pic.height = pic.parentNode.clientHeight;
    pic.width = pic.parentNode.clientHeight * pic.naturalWidth / pic.naturalHeight;
  }

  if (pic.width > pic.parentNode.clientWidth) {
    pic.width = pic.parentNode.clientWidth;
    pic.height = pic.parentNode.clientWidth * pic.naturalHeight / pic.naturalWidth;
  }

  return pic;

}

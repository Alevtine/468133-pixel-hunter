import {SERVER_URL_GET, SUCCESS_STATUS} from './game-data.js';


const checkPromiseStatus = (response) => {
  if (response.status === SUCCESS_STATUS) {
    return response;
  }
  throw new Error(`${response.status}`);
};

const getURLs = (data) => {
  const answers = data.map((item) => item.answers);
  const urls = [];
  answers.forEach((answer) => answer.forEach((item) => urls.push(item.image.url)));
  return urls;
};

const convertJSON = function (response) {
  return response.json();
};

export default class Loader {
  static async loadData() {
    const response = await fetch(SERVER_URL_GET);
    checkPromiseStatus(response);
    return await convertJSON(response);
  }

  static loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(`failed to load a picture: ${url}`);
      image.src = url;
    });
  }

  static preloadImages(data) {
    const urls = getURLs(data);
    const promises = urls.map((url) => this.loadImage(url));
    return Promise.all(promises);
  }
}

import {ServerURL, SUCCESS_STATUS} from './game-data.js';

const checkStatus = (response) => {
  if (response.status === SUCCESS_STATUS) {
    return response;
  }
  throw new Error(`${response.status}`);
};

const getURLs = (data) => {
  const answers = data.map((item) => item.answers);
  let urls = [];
  answers.forEach((answer) => answer.forEach((item) => urls.push(item.image.url)));
  const uniqueUrls = new Set(urls);
  return [...uniqueUrls];
};

export default class Loader {
  static async loadData() {
    const response = await fetch(ServerURL.QUESTIONS);
    checkStatus(response);
    return response.json();
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

  static async saveResult(data, name) {
    const convertRequest = {
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`,
      body: JSON.stringify(data)
    };
    const response = await fetch(`${ServerURL.STATS}-${name}`, convertRequest);
    return checkStatus(response);
  }

  static async loadResults(name) {
    const response = await fetch(`${ServerURL.STATS}-${name}`);
    checkStatus(response);
    return response.json();
  }
}

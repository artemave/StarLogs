import performCrawl from "./performCrawl.js";
import audio from "./audio.js";

/**
 * @param {string} repo
 */
export default function playErrorMessage(repo) {
  audio.src = '/assets/imperial_march.mp3';

  new Promise((resolve) => {
    audio.oncanplaythrough = resolve;
  }).then(() => {
      audio.play();
      performCrawl([
        '404',
        `${repo} doesn't seem to be a github repository`,
        "E.g. 'artemave/starlogs'",
      ]);
    });
}


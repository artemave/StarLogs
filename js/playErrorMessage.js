import performCrawl from "./performCrawl.js";
import sounds from "./sounds.js";

/**
 * @param {string} repo
 */
export default function playErrorMessage(repo) {
  sounds.queueNext('/assets/imperial_march.mp3').then(() => {
    sounds.play()
    performCrawl([
      '404',
      `${repo} doesn't seem to be a github repository`,
      "E.g. 'artemave/starlogs'",
    ]);
  })
}

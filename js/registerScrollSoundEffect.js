import { mainTheme, crawlContainer } from './domRefs.js'

export default function registerScrollSoundEffect() {
  let scrollEndTimeout

  function performScrollSoundEffect() {
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout)
    }
    mainTheme.playbackRate = 4

    scrollEndTimeout = setTimeout(() => {
      mainTheme.playbackRate = 1
    }, 50)
  }

  crawlContainer.ontouchmove = performScrollSoundEffect
  if (crawlContainer.onwheel !== undefined) {
    crawlContainer.onwheel = performScrollSoundEffect
  } else { // Safari
    // @ts-ignore
    crawlContainer.onmousewheel = performScrollSoundEffect
  }
}

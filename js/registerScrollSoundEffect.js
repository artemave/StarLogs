import { crawlContainer } from './domRefs.js'
import sounds from './sounds.js'

export default function registerScrollSoundEffect() {
  let scrollEndTimeout

  function performScrollSoundEffect() {
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout)
    }
    sounds.playbackRate = 4

    scrollEndTimeout = setTimeout(() => {
      sounds.playbackRate = 1
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

import { crawlContainer } from './domRefs.js'

export default function registerScrollSoundEffect(audio) {
  let scrollEndTimeout

  function performScrollSoundEffect() {
    if (scrollEndTimeout) {
      clearTimeout(scrollEndTimeout)
    }
    audio.playbackRate = 4

    scrollEndTimeout = setTimeout(() => {
      audio.playbackRate = 1
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

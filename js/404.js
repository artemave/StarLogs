import audio from "./audio.js"
import { play } from "./domRefs.js"
import fetchCommitMessages from "./fetchCommitMessages.js"
import performCrawl from "./performCrawl.js"
import playErrorMessage from "./playErrorMessage.js"
import registerScrollSoundEffect from "./registerScrollSoundEffect.js"

const repo = window.location.pathname.split('/').slice(-2).join('/')

document.title = `Star Logs - ${repo}`

let fetchCommitMessagesPromise
let loadThemePromise

const loadFalconFlyPromise = new Promise((resolve) => {
  audio.oncanplaythrough = resolve
})

play.onclick = function() {
  loadFalconFlyPromise.then(() => {
    audio.play()
    play.classList.add('zoomed')

    audio.onended = function() {
      audio.src = '/assets/theme.mp3'
    }
    loadThemePromise = new Promise((resolve) => {
      audio.oncanplaythrough = resolve
    })

    fetchCommitMessagesPromise = fetchCommitMessages(repo)
  })
  play.onclick = () => {}
}


play.ontransitionend = function() {
  Promise.all([fetchCommitMessagesPromise, loadThemePromise]).then(([messages]) => {
    if (messages) {
      audio.play()
      performCrawl(messages)
    } else {
      playErrorMessage(repo)
    }
  })
}

registerScrollSoundEffect(audio)

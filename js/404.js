import sounds from "./sounds.js"
import { play } from "./domRefs.js"
import fetchCommitMessages from "./fetchCommitMessages.js"
import performCrawl from "./performCrawl.js"
import playErrorMessage from "./playErrorMessage.js"
import registerScrollSoundEffect from "./registerScrollSoundEffect.js"

const repo = window.location.pathname.split('/').slice(-2).join('/')

document.title = `Star Logs - ${repo}`

let fetchCommitMessagesPromise

play.onclick = function() {
  sounds.canPlayNext.then(() => {
    sounds.play()
    sounds.queueNext('/assets/theme.mp3')

    play.classList.add('zoomed')

    fetchCommitMessagesPromise = fetchCommitMessages(repo)
  })
  play.onclick = null
}


play.ontransitionend = function() {
  Promise.all([fetchCommitMessagesPromise, sounds.canPlayNext]).then(([messages]) => {
    if (messages) {
      sounds.play()
      performCrawl(messages)
    } else {
      playErrorMessage(repo)
    }
  })
}

registerScrollSoundEffect()

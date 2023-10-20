import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer, mainTheme, falconFly, imperialMarch } from './domRefs.js'
import performCrawl from './performCrawl.js'
import registerScrollSoundEffect from './registerScrollSoundEffect.js'

let fetchCommitMessagesPromise

inputContainer.onkeydown = function (e) {
  if (e.keyCode === 13) {
    inputContainer.classList.add('zoomed')
    falconFly.play()

    const repo = inputContainer.querySelector('input').value
    fetchCommitMessagesPromise = fetchCommitMessages(repo)
  }
}

inputContainer.ontransitionend = () => {
  fetchCommitMessagesPromise.then((messages) => {
    performCrawl(messages)
    mainTheme.play()

  }).catch(() => {
    performCrawl([
      "Tun dun dun, da da dun, 404",
      "404, da da dun, 404",
      "..."
    ])
    imperialMarch.play()
  })
}

registerScrollSoundEffect()

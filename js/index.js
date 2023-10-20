import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer, mainTheme, falconFly, imperialMarch, link } from './domRefs.js'
import performCrawl from './performCrawl.js'
import registerScrollSoundEffect from './registerScrollSoundEffect.js'

let fetchCommitMessagesPromise
let repo

inputContainer.onkeydown = function (e) {
  if (e.keyCode === 13) {
    inputContainer.classList.add('zoomed')
    falconFly.play()

    repo = inputContainer.querySelector('input').value
    if (repo.startsWith('https://github.com')) {
      repo = repo.split('/').slice(-2).join('/')
    }
    fetchCommitMessagesPromise = fetchCommitMessages(repo)
  }
}

inputContainer.ontransitionend = () => {
  fetchCommitMessagesPromise.then((messages) => {
    performCrawl(messages)
    mainTheme.play()
    link.style.display = 'initial'
    navigator.clipboard.writeText(window.location.href + repo)

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

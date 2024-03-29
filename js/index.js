import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer } from './domRefs.js'
import performCrawl from './performCrawl.js'
import registerScrollSoundEffect from './registerScrollSoundEffect.js'
import playErrorMessage from './playErrorMessage.js'
import sounds from './sounds.js'
import './greeting.js'

let fetchCommitMessagesPromise
let repo

inputContainer.onkeydown = function (e) {
  if (e.key === 'Enter') {
    repo = inputContainer.querySelector('input').value

    sounds.canPlayNextTrack.then(() => {
      sounds.startPlayingCurrentTrack()
      sounds.queueNextTrack('/assets/theme.mp3')

      inputContainer.classList.add('zoomed')

      if (repo.startsWith('https://github.com')) {
        repo = repo.split('/').slice(-2).join('/')
      }

      fetchCommitMessagesPromise = fetchCommitMessages(repo)
    })
    // hide keyboard on mobile
    // @ts-ignore
    document.activeElement.blur()
  }
}

window.onpopstate = function () {
  window.location.reload()
  document.title = 'Star Logs'
}

inputContainer.ontransitionend = function() {
  Promise.all([fetchCommitMessagesPromise, sounds.canPlayNextTrack]).then(([messages]) => {
    if (messages) {
      window.history.pushState({}, '', `/${repo}`)
      document.title = `Star Logs - ${repo}`

      performCrawl(messages)
      sounds.startPlayingCurrentTrack()
    } else {
      playErrorMessage(repo)
    }
  })
}

registerScrollSoundEffect()

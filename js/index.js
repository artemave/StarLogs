import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer } from './domRefs.js'
import performCrawl from './performCrawl.js'
import registerScrollSoundEffect from './registerScrollSoundEffect.js'
import playErrorMessage from './playErrorMessage.js'
import sounds from './sounds.js'

let fetchCommitMessagesPromise
let repo

inputContainer.onkeydown = function (e) {
  if (e.key === 'Enter') {
    repo = inputContainer.querySelector('input').value

    sounds.canPlayNext.then(() => {
      sounds.play()
      sounds.queueNext('/assets/theme.mp3')

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
  Promise.all([fetchCommitMessagesPromise, sounds.canPlayNext]).then(([messages]) => {
    if (messages) {
      window.history.pushState({}, '', `/${repo}`)
      document.title = `Star Logs - ${repo}`

      performCrawl(messages)
      sounds.play()
    } else {
      playErrorMessage(repo)
    }
  })
}

registerScrollSoundEffect()

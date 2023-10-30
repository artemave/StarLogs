import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer } from './domRefs.js'
import performCrawl from './performCrawl.js'
import registerScrollSoundEffect from './registerScrollSoundEffect.js'
import playErrorMessage from './playErrorMessage.js'
import audio from './audio.js'

let fetchCommitMessagesPromise
let loadThemePromise
let repo

inputContainer.onkeydown = function (e) {
  if (e.key === 'Enter') {
    audio.play()
    inputContainer.classList.add('zoomed')

    audio.onended = () => {
      audio.src = '/assets/theme.mp3'
    }
    loadThemePromise = new Promise((resolve) => {
      audio.oncanplaythrough = resolve
    })

    repo = inputContainer.querySelector('input').value
    if (repo.startsWith('https://github.com')) {
      repo = repo.split('/').slice(-2).join('/')
    }

    fetchCommitMessagesPromise = fetchCommitMessages(repo)

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
  Promise.all([fetchCommitMessagesPromise, loadThemePromise]).then(([messages]) => {
    if (messages) {
      window.history.pushState({}, '', `/${repo}`)
      document.title = `Star Logs - ${repo}`

      performCrawl(messages)
      audio.play()
    } else {
      playErrorMessage(repo)
    }
  })
}

registerScrollSoundEffect(audio)

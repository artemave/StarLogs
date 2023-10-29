import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer, crawlContainer } from './domRefs.js'
import performCrawl from './performCrawl.js'
import registerScrollSoundEffect from './registerScrollSoundEffect.js'

let fetchCommitMessagesPromise
let loadThemePromise
let repo

// On ios, only one audio element is allowed to play (perhaps because there's only one user interation?)
// So we reuse a single audio element to play multiple sounds.
// https://stackoverflow.com/a/57547943/51209
const audio = new Audio('assets/falcon_fly.mp3')
if (navigator.userAgent.match(/(iPhone|iPad)/)) {
  audio.autoplay = true
}

inputContainer.onkeydown = function (e) {
  if (e.keyCode === 13) {
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
    window.history.pushState({}, '', `/${repo}`)
    document.title = `Star Logs - ${repo}`

    performCrawl(messages)
    audio.play()

  }).catch(() => {
    audio.src = '/assets/imperial_march.mp3'

    new Promise((resolve) => {
      audio.oncanplaythrough = resolve
    }).then(() => {
      audio.play()
      performCrawl([
        "Tun dun dun, da da dun, 404",
        "404, da da dun, 404",
        "..."
      ])
    })
  })
}

registerScrollSoundEffect(audio)

import { play } from "./domRefs.js"
import fetchCommitMessages from "./fetchCommitMessages.js"
import performCrawl from "./performCrawl.js"
import registerScrollSoundEffect from "./registerScrollSoundEffect.js"

const [userOrg, repo] = window.location.pathname.split('/').slice(-2)

document.title = `Star Logs - ${userOrg}/${repo}`

let fetchCommitMessagesPromise
let loadThemePromise

// On ios, only one audio element is allowed to play (perhaps because there's only one user interation?)
// So we reuse a single audio element to play multiple sounds.
// https://stackoverflow.com/a/57547943/51209
const audio = new Audio('/assets/falcon_fly.mp3')
if (navigator.userAgent.match(/(iPhone|iPad)/)) {
  audio.autoplay = true
}

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

    fetchCommitMessagesPromise = fetchCommitMessages(`${userOrg}/${repo}`)
  })
  play.onclick = () => {}
}


play.ontransitionend = function() {
  Promise.all([fetchCommitMessagesPromise, loadThemePromise]).then(([messages]) => {
    audio.play()
    performCrawl(messages)

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

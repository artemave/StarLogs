import { imperialMarch, mainTheme } from "./domRefs.js"
import fetchCommitMessages from "./fetchCommitMessages.js"
import performCrawl from "./performCrawl.js"
import registerScrollSoundEffect from "./registerScrollSoundEffect.js"

const [userOrg, repo] = window.location.pathname.split('/').slice(-2)

document.title = `Star Logs - ${userOrg}/${repo}`

fetchCommitMessages(`${userOrg}/${repo}`).then(messages => {
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

registerScrollSoundEffect()

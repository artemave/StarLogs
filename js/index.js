import fetchCommitMessages from './fetchCommitMessages.js'
import { inputContainer, mainTheme, falconFly, imperialMarch, link, crawlContainer } from './domRefs.js'
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

  }).catch(() => {
    performCrawl([
      "Tun dun dun, da da dun, 404",
      "404, da da dun, 404",
      "..."
    ])
    imperialMarch.play()
  })
}

link.onclick = () => {
  navigator.clipboard.writeText(window.location.href + repo)

  const block = document.createElement('div')
  block.classList.add('copied')
  block.style.bottom = `-${crawlContainer.scrollTop - 70}px`
  block.innerText = 'Copied!'
  block.onanimationend = () => {
    block.remove()
  }

  crawlContainer.appendChild(block);
}

registerScrollSoundEffect()

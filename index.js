async function fetchCommitMessages(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=100`)
  const commits = await response.json()
  return commits.map(commit => commit.commit.message)
}

function performCrawl(messages) {
  messages.forEach((message, index) => {
    const block = document.createElement('div')
    block.classList.add('block')
    block.innerText = message

    if (index === 0) {
      block.style.paddingTop = `${plane.clientHeight}px`
    }
    if (index === messages.length - 1) {
      block.style.paddingBottom = '10000px'
    }

    plane.appendChild(block)
  })

  const scroll = () => {
    plane.scrollBy({top: 1})
    requestAnimationFrame(scroll)
  }
  requestAnimationFrame(scroll)
}

const inputContainer = document.getElementById('inputContainer')
const plane = document.getElementById('plane')
let fetchCommitMessagesPromise

inputContainer.onkeydown = function (e) {
  if (e.keyCode === 13) {
    inputContainer.classList.add('zoomed')
    const falconFly = document.getElementById('falconFly')
    falconFly.play()

    const repo = inputContainer.querySelector('input').value
    fetchCommitMessagesPromise = fetchCommitMessages(repo)
  }
}

const mainTheme = document.getElementById('mainTheme')

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
    const imperialMarch = document.getElementById('imperialMarch')
    imperialMarch.play()
  })
}

let scrollEndTimeout

function performScrollSoundEffect() {
  if (scrollEndTimeout) {
    clearTimeout(scrollEndTimeout)
  }
  mainTheme.playbackRate = 4.0

  scrollEndTimeout = setTimeout(() => {
    mainTheme.playbackRate = 1.0
  }, 50)
}

plane.ontouchmove = performScrollSoundEffect
if (plane.onwheel !== undefined) {
  plane.onwheel = performScrollSoundEffect
} else { // Safari
  plane.onmousewheel = performScrollSoundEffect
}

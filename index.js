const inputContainer = document.getElementById('inputContainer')
const plane = document.getElementById('plane')

let fetchCommitMessagesPromise

async function fetchCommitMessages(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=100`)
  const commits = await response.json()
  return commits.map(commit => commit.commit.message)
}

function performCrawl(messages) {
  const planeHeight = plane.clientHeight

  messages.forEach((message, index) => {
    const block = document.createElement('div')
    block.classList.add('block')
    if (index === 0) {
      block.style.paddingTop = `${planeHeight}px`
    }
    if (index === messages.length - 1) {
      block.style.paddingBottom = '10000px'
    }
    block.innerText = message
    plane.appendChild(block)
  })

  const scroll = () => {
    plane.scrollBy({top: 1})
    requestAnimationFrame(scroll)
  }
  requestAnimationFrame(scroll)
}

inputContainer.onkeydown = function (e) {
  if (e.keyCode === 13) {
    inputContainer.classList.add('zoomed')
    const falconFly = document.getElementById('falconFly')
    falconFly.play()

    const repo = inputContainer.querySelector('input').value
    fetchCommitMessagesPromise = fetchCommitMessages(repo)
  }
}

inputContainer.ontransitionend = () => {
  fetchCommitMessagesPromise.then((messages) => {
    performCrawl(messages)
    const mainTheme = document.getElementById('mainTheme')
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

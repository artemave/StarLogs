import { crawlContainer } from './domRefs.js'
import sounds from './sounds.js'

/**
 * @param {any[string]} messages
 */
export default function performCrawl(messages) {
  messages.forEach((/** @type {string} */ message, /** @type {number} */ index) => {
    const block = document.createElement('div')
    block.classList.add('block')
    block.innerText = message

    if (index === 0) {
      block.style.paddingTop = `${crawlContainer.clientHeight}px`
    }
    if (index === messages.length - 1) {
      block.style.paddingBottom = '10000px'
    }

    crawlContainer.appendChild(block)
  })

  startAutoScroll()

  crawlContainer.onclick = toggleAutoScroll
}

let reqId

function toggleAutoScroll() {
  if (reqId) {
    stopAutoScroll()
  } else {
    startAutoScroll()
  }
}

function stopAutoScroll() {
  sounds.pause()
  cancelAnimationFrame(reqId)
  reqId = null
}

function startAutoScroll() {
  sounds.startPlayingCurrentTrack()
  const scroll = () => {
    crawlContainer.scrollBy({ top: window.innerHeight > 1000 ? 2 : 1 })
    reqId = requestAnimationFrame(scroll)
  }
  reqId = requestAnimationFrame(scroll)
}


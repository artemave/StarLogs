// On ios, only one audio element is allowed to play (perhaps because there's only one user interation?)
// So we reuse a single audio element to play multiple sounds.
// https://stackoverflow.com/a/57547943/51209

class Sounds {
  #audio

  /**
     * @param {string} path
     */
  constructor(path) {
    this.#audio = new Audio(path)

    if (navigator.userAgent.match(/(iPhone|iPad)/)) {
      this.#audio.autoplay = true
    }

    this.canPlayNext = new Promise((resolve) => {
      this.#audio.oncanplaythrough = resolve
    })
  }

  /**
     * @param {number} rate
     */
  set playbackRate(rate) {
    this.#audio.playbackRate = rate
  }

  pause() {
    this.#audio.pause()
  }

  /**
     * @param {string} path
     */
  async queueNext(path) {
    if (this.#audio.paused || this.#audio.ended) {
      this.#audio.src = path
    } else {
      this.#audio.onended = () => {
        this.#audio.src = path
      }
    }

    this.canPlayNext = new Promise((resolve) => {
      this.#audio.oncanplaythrough = resolve
    })

    return this.canPlayNext
  }

  play() {
    this.#audio.play()
  }
}

export default new Sounds('/assets/falcon_fly.mp3')

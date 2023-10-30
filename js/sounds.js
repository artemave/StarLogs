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

    this.canPlayNextTrack = new Promise((resolve) => {
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
  async queueNextTrack(path) {
    this.#audio.onended = () => {
      this.#audio.src = path
    }

    return this.canPlayNextTrack = new Promise((resolve) => {
      this.#audio.oncanplaythrough = resolve
    })
  }

  /**
     * @param {string} path
     */
  async startPlayingTrackNow(path) {
    this.#audio.src = path

    return this.canPlayNextTrack = new Promise((resolve) => {
      this.#audio.oncanplaythrough = resolve
    })
  }

  startPlayingCurrentTrack() {
    this.#audio.play()
  }
}

export default new Sounds('/assets/falcon_fly.mp3')

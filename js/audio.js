// On ios, only one audio element is allowed to play (perhaps because there's only one user interation?)
// So we reuse a single audio element to play multiple sounds.
// https://stackoverflow.com/a/57547943/51209
const audio = new Audio('/assets/falcon_fly.mp3')
if (navigator.userAgent.match(/(iPhone|iPad)/)) {
  audio.autoplay = true
}

export default audio

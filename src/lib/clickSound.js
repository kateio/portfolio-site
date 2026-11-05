const SOUND_URL = '/sounds/click-soft.mp3'
const VOLUME = 0.4

let audioContext = null
let soundBuffer = null

function prepare() {
  if (audioContext) return
  audioContext = new AudioContext()
  soundBuffer = fetch(SOUND_URL)
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data))
}

function play() {
  prepare()
  audioContext.resume()
  soundBuffer
    .then((buffer) => {
      const source = audioContext.createBufferSource()
      source.buffer = buffer
      const gain = audioContext.createGain()
      gain.gain.value = VOLUME
      source.connect(gain).connect(audioContext.destination)
      source.start()
    })
    .catch(() => {
      // The click still works without its sound.
    })
}

export function enableClickSound() {
  if (typeof AudioContext === 'undefined') return

  // Browsers allow audio only after a user gesture, so loading waits for the first press.
  document.addEventListener('pointerdown', prepare, { once: true })
  document.addEventListener('click', (event) => {
    if (event.target.closest('button, [data-click-sound]')) play()
  })
}

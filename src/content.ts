import { getRandomValues } from 'uncrypto';

import yippee from './assets/yippee.gif'
import dogGif from './assets/dog.gif'
import salad from './assets/salad.jpg'
import yippeeSound from './assets/yippee.mp3'
import dogSound from './assets/dog.mp3'

interface Coords {
  x: number
  y: number
}

function getRandomIntInclusive(min: number, max: number) {
  const randomBuffer = new Uint32Array(1);

  getRandomValues(randomBuffer);

  let randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}


function getRandomCoords(): Coords {
  return {
    x: getRandomIntInclusive(0, 100),
    y: getRandomIntInclusive(0, 100),
  }
}

document.addEventListener('click', () => {
  if (getRandomIntInclusive(0, 100) < 20) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  }


  const cat = document.createElement('img')
  const dog = document.createElement('img')
  const { x, y } = getRandomCoords()

  cat.src = chrome.runtime.getURL(yippee)
  cat.setAttribute('style', `position: fixed; top: ${x}%; left: ${y}%; z-index: 9999;`)

  dog.src = chrome.runtime.getURL(dogGif)
  dog.setAttribute('style', `position: fixed; top: ${x}%; left: ${y}%; z-index: 9999; width: 100px;`)

  const randomValue = Math.random();

  if (randomValue < 0.5) {
    document.body.append(cat)
    const sound = document.createElement('audio')
    sound.autoplay = true
    const soundSrc = document.createElement('source')
    soundSrc.src = chrome.runtime.getURL(yippeeSound)
    soundSrc.type = 'audio/mpeg'
    sound.appendChild(soundSrc)
    document.body.append(sound)
  } else {
    document.body.append(dog)
    const sound = document.createElement('audio')
    sound.autoplay = true
    const soundSrc = document.createElement('source')
    soundSrc.src = chrome.runtime.getURL(dogSound)
    soundSrc.type = 'audio/mpeg'
    sound.appendChild(soundSrc)
    document.body.append(sound)
  }

})

const allImages = document.querySelectorAll("img")

for (const image of allImages) {
  image.src = chrome.runtime.getURL(salad)
}


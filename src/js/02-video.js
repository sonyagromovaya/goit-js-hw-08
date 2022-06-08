import Player from '@vimeo/player';
var throttle = require('lodash.throttle');
const iframeRef = document.querySelector('iframe');

const player = new Player(iframeRef, {});
const helloWorld = data => {
  console.log(data);
  console.log('hello world');
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
};
// player.play();
player.on('timeupdate', throttle(helloWorld, 1000));
const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime);
}

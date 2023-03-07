const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let intervalId = null;
stopBtn.disabled = true;

const TIME = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  intervalId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopBtn() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.style.padding = '20px';
startBtn.style.borderRadius = '5px';
startBtn.style.border = '0px';

stopBtn.style.padding = '20px';
stopBtn.style.borderRadius = '5px';
stopBtn.style.border = '0px';

let timer;
let dixieme = 0;
let seconds = 0;
let minuts = 0;
let watchDisplay = document.getElementById('watchDisplay');

function onStartButtonClick() {
  if (!timer) {
    startWatch();
  }
}
function onStopButtonClick() {
  stopWatch();
}
function onResetButtonClick() {
  resetWatch();
}

function startWatch() {
  dixieme++;
  watchDisplay.innerText = formatDixieme();
  timer = setTimeout(() => {
    startWatch();
  }, 1);
}
function stopWatch() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
function resetWatch() {
  stopWatch();
  dixieme = 0;
  seconds = 0;
  minuts = 0;
  watchDisplay.innerText = formatDixieme();
}
function formatDixieme() {
  let d = '';
  let s = '';

  if (dixieme > 99) {
    dixieme = 0;
    seconds++;
  }
  if (seconds > 59) {
    seconds = 0;
    minuts++;
  }
  if (dixieme < 10) {
    d = '0' + dixieme;
  } else {
    d = dixieme;
  }
  if (seconds < 10) {
    s = '0' + seconds;
  } else {
    s = seconds;
  }
  return minuts + ' : ' + s + ' : ' + d;
}

let timer;
let dixieme = 0;
let seconds = 0;
let minuts = 0;
let timerDisplay = document.getElementById('timer');

function startTimer() {
  dixieme++;
  timerDisplay.innerText = formatDixieme();
  timer = setTimeout(() => {
    startTimer();
  }, 1);
}
function stopTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
function resetTimer() {
  stopTimer();
  dixieme = 0;
  seconds = 0;
  minuts = 0;
  timerDisplay.innerText = formatDixieme();
}
function formatDixieme() {
  let timerString = '';
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
    timerString += '0' + dixieme;
  } else {
    timerString += dixieme;
  }
  if (minuts > 0 || seconds > 0) {
    if (seconds < 10) {
      timerString = '0' + seconds + ' : ' + timerString;
    } else {
      timerString = seconds + ' : ' + timerString;
    }
  }
  if (minuts > 0) {
    timerString = minuts + ' : ' + timerString;
  }

  return timerString;
}


const buttons = document.getElementsByClassName('calc-button');
const calcInput = document.getElementById('calc-input');
calcInput.value = 0;
let a = 0;
let b = 0;
let operation = null;

for (let button of buttons) {
  button.onclick = clacButtonClicked;
}

function clacButtonClicked(e) {
  if (e.target.value === 'C') {
    calcInput.value = '';
    a = 0;
    b = 0;
    calcInput.value = 0;
  } else if (e.target.value === '=') {
    if (operation === '+') {
      calcInput.value = a + b;
    } else if (operation === '-') {
      calcInput.value = a - b;
    } else if (operation === '*') {
      calcInput.value = a * b;
    } else if (operation === '/') {
      calcInput.value = a / b;
    }
    a = parseInt(calcInput.value);
  } else if (e.target.value === '+') {
    if (a !== null) {
      operation = '+';
      calcInput.value = '0';
    }
  } else if (e.target.value === '-') {
    if (a !== null) {
      operation = '-';
      calcInput.value = '0';
    }
  } else if (e.target.value === '/') {
    if (a !== null) {
      operation = '/';
      calcInput.value = '0';
    }
  } else if (e.target.value === '*') {
    if (a !== null) {
      operation = '*';
      calcInput.value = '0';
    }
  } else {
    if (calcInput.value !== '0') {
      calcInput.value += e.target.value;
    } else {
      calcInput.value = e.target.value;
    }

    if (operation === null) {
      a = parseInt(calcInput.value);
    } else {
      b = parseInt(calcInput.value);
    }
  }
}

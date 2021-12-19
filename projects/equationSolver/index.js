const aInput = document.getElementById('a-input');
const bInput = document.getElementById('b-input');
const resultP = document.getElementById('result');

const calcButton = document.getElementById('calc-button');
calcButton.onclick = function () {
	let a = aInput.value;
	let b = bInput.value;
	if (b === '') {
		b = 0;
		bInput.value = 0;
	}
	if (a === '') {
		a = 0;
		aInput.value = 0;
	}
	let result = null;

	if (a != 0) {
		result = '=> X = ' + -b + ' / ' + a + ' = ' + (-b / a).toFixed(2);
		resultP.innerText = result;
	} else {
		resultP.innerText = 'a doit etre diffent de 0';
	}
};

const clickAudio = document.getElementById('clickAudio');
const wrongAudio = document.getElementById('wrongAudio');
const aInput = document.getElementById('a-input');
const bInput = document.getElementById('b-input');
const resultP = document.getElementById('result');

const calcButton = document.getElementById('calc-button');
calcButton.onclick = function () {
	clickAudio.play();
	let a = parseFloat(aInput.value);
	let b = parseFloat(bInput.value);
	if (Number.isNaN(b)) {
		b = 0;
		bInput.value = 0;
	}
	if (Number.isNaN(a)) {
		a = 0;
		aInput.value = 0;
	}

	let result = null;

	if (a != 0) {
		result = '=> X = ' + -b + ' / ' + a + ' = ' + (-b / a).toFixed(2);
		resultP.innerText = result;
	} else {
		wrongAudio.play();
		resultP.innerText = 'a doit etre diffent de 0';
	}
};

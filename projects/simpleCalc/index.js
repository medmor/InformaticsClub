const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const resultInput = document.getElementById('result');
const operatorSpan = document.getElementById('operator');
const msg = document.getElementById('msg');
let a = undefined;
let b = undefined;

function onOperationClick(op) {
	a = parseFloat(input1.value);
	b = parseFloat(input2.value);
	if (Number.isNaN(a)) {
		msg.innerText = 'Veuillez entrer a';
		return;
	}
	if (Number.isNaN(b)) {
		msg.innerText = 'Veuillez entrer b';
		return;
	}
	msg.innerText = '';
	operatorSpan.innerText = op;
	resultInput.value = preformCalculation(op);
}

function preformCalculation(op) {
	let res = '';
	switch (op) {
		case '+':
			res = a + b;
			break;
		case '-':
			res = a - b;
			break;
		case 'x':
			res = a * b;
			break;
		case '/':
			res = a / b;
			break;
		default:
			break;
	}
	return res;
}

let randomNumber = Math.floor(Math.random() * 10);
let msgElement = document.getElementById('msgElement');
let inputElement = document.getElementById('inputElement');
let solved = false;

function guessTheNumber(button) {
	const value = inputElement.value;

	if (randomNumber === parseInt(value) && !solved) {
		msgElement.innerText = 'Bien jouer le nombre est : ' + randomNumber;
		solved = true;
		inputElement.value = '';
		button.innerText = 'Rejouer';
		return;
	} else {
		msgElement.innerText = 'Dommage, essayer un autre nombre';
	}

	if (solved) {
		solved = false;
		msgElement.innerHTML = '';
		inputElement.value = '';
		randomNumber = Math.floor(Math.random() * 10);
		button.innerText = 'Deviner';
	}
}
window.onload = () => {
	randomNumber = Math.floor(Math.random() * 10);
	msgElement = document.getElementById('msgElement');
	inputElement = document.getElementById('inputElement');
	solved = false;
};

let randomNumber = Math.floor(Math.random() * 10);
let loseAudio = document.getElementById('loseAudio');
let tadaAudio = document.getElementById('tadaAudio');
let msgElement = document.getElementById('msgElement');
let inputElement = document.getElementById('inputElement');
let solved = false;

function guessTheNumber(button) {
	const value = inputElement.value;

	if (randomNumber === parseInt(value) && !solved) {
		tadaAudio.play();
		msgElement.innerText = 'Bien jouer le nombre est : ' + randomNumber;
		solved = true;
		inputElement.value = '';
		button.innerText = 'Rejouer';
		inputElement.style.display = 'none';
		return;
	} else {
		loseAudio.play();
		msgElement.innerText = 'Dommage, essayer un autre nombre';
	}

	if (solved) {
		solved = false;
		msgElement.innerHTML = '';
		inputElement.value = '';
		randomNumber = Math.floor(Math.random() * 10);
		button.innerText = 'Deviner';
		inputElement.style.display = '';
	}
}
window.onload = () => {
	randomNumber = Math.floor(Math.random() * 10);
	msgElement = document.getElementById('msgElement');
	inputElement = document.getElementById('inputElement');
	solved = false;
};

const container = document.getElementById('container-game');

const message = document.querySelector('#message');
message.innerText = 'Cliquez sur le bouton "Jouer" pour commencer';

const colors = ['red', 'green', 'orange', 'blue'];
let choosedColors = [];
let playerClickIndex = 0;

let gameState = 'pregame';
let gameStates = {
	pregame: 'pregame',
	computerTurn: 'computerTurn',
	playerTurn: 'playerTurn',
	gameOver: 'gameOver',
};

function chooseRandomColor() {
	message.innerText = 'Rappelez-vous la séquence !!!';
	playerClickIndex = 0;
	gameState = gameStates.computerTurn;
	const color = colors[Math.floor(Math.random() * 4)];
	choosedColors.push(color);
	container.classList.add('no-cursor');
	playingSequence = true;
	setTimeout(() => {
		playSequence(0);
	}, 500);
}
function playSequence(index) {
	if (index < choosedColors.length) {
		const color = choosedColors[index];
		const div = document.getElementById(color);
		div.classList.add('active');
		setTimeout(() => {
			div.classList.remove('active');
			setTimeout(() => {
				playSequence(index + 1);
			}, 250);
		}, 500);
	} else {
		container.classList.remove('no-cursor');
		gameState = gameStates.playerTurn;
		message.innerHTML = 'À ton tour! Répéter la séquence';
	}
}

function onMouseDown(event) {
	if (gameState === gameStates.playerTurn) {
		event.target.classList.add('active');
		if (event.target.id !== choosedColors[playerClickIndex]) {
			gameState = gameStates.gameOver;
			message.innerText = 'Jeu terminé; Ton score est :' + (choosedColors.length - 1);
			document.querySelector('#playButton').classList.remove('hide');
			choosedColors = [];
		}
		playerClickIndex++;
	}
}

function onMouseUp(event) {
	event.target.classList.remove('active');
	if (gameState === gameStates.playerTurn) {
		if (playerClickIndex === choosedColors.length) {
			gameState = gameStates.computerTurn;
			setTimeout(() => {
				chooseRandomColor();
			}, 500);
		}
	}
}

function onMouseEnter(event) {
	if (gameState === gameStates.playerTurn) {
		event.target.classList.add('hover');
	}
}

function onMouseLeave(event) {
	if (gameState === gameStates.playerTurn) {
		event.target.classList.remove('hover');
	}
}

function onPlayButtonClick(button) {
	button.classList.add('hide');
	chooseRandomColor();
}

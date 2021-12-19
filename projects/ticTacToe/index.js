const clickAudio = document.getElementById('clickAudio');
const tadaAudio = document.getElementById('tadaAudio');
const loseAudio = document.getElementById('loseAudio');
const msg = document.getElementById('msg');
const table = document.getElementById('container-game');
const rows = table.rows;
let gameEnded = false;

const board = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

let isPlayerTurn = Math.random() < 0.5 ? true : false;
if (!isPlayerTurn) {
	msg.innerText = "Veuillez attendre le tour de l'ordinateur";
	computerPlay();
} else {
	msg.innerText = 'Veuillez jouer votre tour';
}

function cellClick(e) {
	if (!gameEnded) {
		clickAudio.play();
		if (isPlayerTurn) {
			const firstChild = e.firstChild;
			if (!firstChild.innerText) {
				const row = e.parentNode.dataset.index;
				const cell = e.dataset.index;
				firstChild.innerText = 'o';
				board[row][cell] = 'o';
				if (isWining('o')) {
					gameEnded = true;
					msg.innerText = 'Bravo; Vous avez gagné';
					tadaAudio.play();
					return;
				}
				isPlayerTurn = false;
				msg.innerText = "Veuillez attendre le tour de l'ordinateur";
				setTimeout(() => {
					computerPlay();
				}, 1000);
			}
		}
	}
}

function computerPlay() {
	clickAudio.play();
	for (const row of rows) {
		const cells = row.cells;
		for (const cell of cells) {
			const firstChild = cell.firstChild;
			if (!firstChild.innerText) {
				firstChild.innerText = 'x';
				board[row.dataset.index][cell.dataset.index] = 'x';
				isPlayerTurn = true;
				if (isWining('x')) {
					gameEnded = true;
					msg.innerText = 'Dommage; Vous avez perdu';
					loseAudio.play();
					return;
				}
				msg.innerText = 'Veuillez jouer votre tour';
				return;
			}
		}
	}
}

function isWining(c) {
	if (
		(board[0][0] == c && board[0][1] === c && board[0][2] === c) ||
		(board[1][0] == c && board[1][1] === c && board[1][2] === c) ||
		(board[2][0] == c && board[2][1] === c && board[2][2] === c) ||
		(board[0][0] == c && board[1][0] === c && board[2][0] === c) ||
		(board[0][1] == c && board[1][1] === c && board[2][1] === c) ||
		(board[0][2] == c && board[1][2] === c && board[2][2] === c) ||
		(board[0][0] == c && board[1][1] === c && board[2][2] === c) ||
		(board[2][0] == c && board[1][1] === c && board[0][2] === c)
	) {
		return true;
	}
	return false;
}

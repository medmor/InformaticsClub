"use strict"
const container = document.getElementById('container-game');
const movesElement = document.getElementById("moves")
const containerWidth = 250;
const maskCoord = { x: -1, y: -1 }
let cards = [];
let mask = "<div class='mask'></div>";
let gridSize = -1;
let moves = 0;
let solved = false;


function initGrid(cardNumbers = 9) {
	clickAudio.play();
	resetTimer();
	startTimer();
	moves = 0;
	movesElement.innerHTML = "Déplacements : " + moves;
	solved = false;

	gridSize = Math.sqrt(cardNumbers);
	maskCoord.x = maskCoord.y = gridSize - 1;

	const cardWidth = containerWidth / gridSize;
	let gridTemplate = '';
	for (let i = 0; i < gridSize; i++) {
		gridTemplate += cardWidth + 'px' + ' ';
	}

	container.style.gridTemplateRows = gridTemplate;
	container.style.gridTemplateColumns = gridTemplate;
	container.style.gap = '10px';

	container.innerHTML = '';
	cards = [];
	for (let i = 1; i <= cardNumbers; i++) {
		let card = document.createElement('div');
		card.classList.add('card-game');
		card.innerText = i;
		card.dataset.index = i;
		card.style.fontSize = (1 / gridSize) * 200;
		container.append(card);
		if (i == cardNumbers) {
			card.innerHTML = gridSize * gridSize + mask;
		}
		cards.push(card);
	}
	shuffleGrid();
}

function shuffleGrid() {
	for (let i = 0; i < 100; i++) {
		var c = getCardToSwap();
		var mindex = cord2Index(maskCoord.x, maskCoord.y);
		swapCard(mindex, c.i, { x: c.x, y: c.y });
	}
}

function onClick(e) {
	if (!e.target.dataset.index) return;
	if (!solved) {
		const cardCoord = cardCoordinates(e.target.dataset.index - 1);

		const canMove = Math.sqrt(Math.pow(cardCoord.x - maskCoord.x, 2) + Math.pow(cardCoord.y - maskCoord.y, 2)) == 1;

		if (canMove) {
			clickAudio.play();

			moves++;
			movesElement.innerHTML = "Déplacements : " + moves;

			const maskIndex = cord2Index(maskCoord.x, maskCoord.y);
			const cardIndex = cord2Index(cardCoord.x, cardCoord.y);

			swapCard(maskIndex, cardIndex, cardCoord);

			if (checkSolved()) {
				tadaAudio.play();
				stopTimer();
				solved = true;
				cards[cards.length - 1].innerHTML = gridSize * gridSize;
			}
		}
	}
}


function cardCoordinates(index) {
	var c = {};
	c.x = index % gridSize;
	c.y = Math.floor(index / gridSize);
	return c;
}

function getCardToSwap() {
	const cards = [];
	const x = maskCoord.x, y = maskCoord.y;
	if (x > 0)
		cards.push({ i: cord2Index(x - 1, y), x: x - 1, y: y });
	if (x < gridSize - 1)
		cards.push({ i: cord2Index(x + 1, y), x: x + 1, y });
	if (y > 0)
		cards.push({ i: cord2Index(x, y - 1), x: x, y: y - 1 });
	if (y < gridSize - 1)
		cards.push({ i: cord2Index(x, y + 1), x: x, y: y + 1 });
	let card = cards[Math.floor(Math.random() * cards.length)];
	return card;
}

function swapCard(mindex, cindex, ccoord) {
	cards[mindex].innerHTML = cards[cindex].innerHTML;

	cards[cindex].innerHTML = gridSize * gridSize + mask;

	maskCoord.x = ccoord.x;
	maskCoord.y = ccoord.y;
}
function checkSolved() {
	if (maskCoord.x == gridSize - 1 && maskCoord.y == gridSize - 1) {
		for (let i = 0; i < cards.length - 1; i++) {
			if (cards[i].innerHTML != i + 1) {
				return fasle;
			}
		}
		return true;
	}
}

let cord2Index = (x, y) => x + gridSize * y;
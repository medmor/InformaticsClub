const clickAudio = document.getElementById('clickAudio');
const wrongAudio = document.getElementById('wrongAudio');
const tadaAudio = document.getElementById('tadaAudio');
const container = document.getElementById('container-game');
const errorsElement = document.getElementById('errors');
const containerWidth = 250;
let firstCard = null;
let secondCard = null;
let errors = 0;
let cardNumbers = -1;
initGrid();

function initGrid(cards = 4) {
	cardNumbers = cards;
	clickAudio.play();
	resetTimer();
	startTimer();
	let sqrtCardNumbers = Math.sqrt(cardNumbers);
	const cardWidth = containerWidth / sqrtCardNumbers;
	let gridTemplate = '';
	for (let i = 0; i < sqrtCardNumbers; i++) {
		gridTemplate += cardWidth + 'px' + ' ';
	}

	container.style.gridTemplateRows = gridTemplate;
	container.style.gridTemplateColumns = gridTemplate;
	container.style.gap = '10px';

	const numbers = [];

	for (let i = 0; i < cardNumbers / 2; i++) {
		numbers.push(i);
	}
	for (let i = 0; i < cardNumbers / 2; i++) {
		numbers.push(i);
	}
	container.innerHTML = '';
	for (let i = 1; i <= cardNumbers; i++) {
		let card = document.createElement('div');
		card.classList.add('card-game');
		const randomIndex = Math.floor(Math.random() * numbers.length);
		const numb = numbers[randomIndex];
		numbers.splice(randomIndex, 1);
		card.innerText = numb;
		card.dataset.index = numb;
		card.style.fontSize = (1 / sqrtCardNumbers) * 200;
		let mask = document.createElement('div');
		mask.classList.add('mask');
		card.append(mask);
		container.append(card);
	}
}

function onClick(e) {
	if (e.target.classList.contains('mask')) {
		if (firstCard === null) {
			clickAudio.play();
			e.target.classList.add('hide');
			firstCard = e.target.parentNode;
		} else if (secondCard === null) {
			e.target.classList.add('hide');
			secondCard = e.target.parentNode;
			if (firstCard.dataset.index === secondCard.dataset.index) {
				cardNumbers-=2;
				tadaAudio.currentTime = 0;
				tadaAudio.play();
				reNullCards();
				if(cardNumbers==0){
					stopTimer();
				}
			} else {
				wrongAudio.play();
				const mask1 = firstCard.firstChild.nextSibling;
				const mask2 = secondCard.firstChild.nextSibling;
				errors++;
				errorsElement.innerText = 'Erreurs : ' + errors;
				setTimeout(() => {
					mask1.classList.remove('hide');
					mask2.classList.remove('hide');
					reNullCards();
				}, 1000);
			}
		}
	}
}

function reNullCards() {
	firstCard = null;
	secondCard = null;
}

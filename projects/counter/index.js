const clickAudio = document.getElementById('clickAudio');
let count = 0;

const label = document.getElementById('label');
label.innerText = count;

const plusButton = document.getElementById('plus-button');
plusButton.onclick = function () {
	count = count + 1;
	label.innerText = count;
	clickAudio.play();
};

const minButton = document.getElementById('min-button');
minButton.onclick = function () {
	count = count - 1;
	label.innerText = count;
	clickAudio.play();
};

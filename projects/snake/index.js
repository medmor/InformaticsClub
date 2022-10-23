"use strict"

const boardDivisions = 20;
let gameLoop = null;

let speed = 5;
let lastPaintTime = 0;
let score = 0;

let inputDir = { x: 0, y: 0 }
let food = { x: 6, y: 7 };
let snakeArr = [
    { x: 13, y: 15 }
];
let snakeElements = [];
let changingDir = false;


// Game Functions
function main(ctime) {
    gameLoop = requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    changingDir = false;
    gameLoop();
    moveSound.currentTime = 0;
    moveSound.play();
}

function isCollide() {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    if (snakeArr[0].x > boardDivisions || snakeArr[0].x <= 0 || snakeArr[0].y > boardDivisions || snakeArr[0].y <= 0)
        return true;
    return false;
}

function gameLoop() {
    if (isCollide()) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again");
        board.innerHTML = '<div id="foodElement"></div>';
        food = { x: 6, y: 7 };
        snakeArr = [{ x: 13, y: 15 }];
        snakeElements = [];
        score = 0;
        scoreboard.innerHTML = "Score :0";
        cancelAnimationFrame(gameLoop);
        gameLoop = null;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > parseInt(hiscore)) {
            hiscore = score;
            localStorage.setItem("hiscore", hiscore.toString());
            hiscoreBox.innerHTML = "Hi Score: " + hiscore;
        }
        scoreboard.innerHTML = "Score :" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        food = { x: Math.round(boardDivisions * Math.random()), y: Math.round(boardDivisions * Math.random()) }
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    for (let i = 0; i < snakeArr.length; i++) {
        createSnakeElement(i);
    }
}

let hiscore = localStorage.getItem("hiscore");

if (hiscore === null) {
    localStorage.setItem("hiscore", "0");
}
else {
    hiscoreBox.innerHTML = "Hi Score: " + hiscore;
    localStorage.setItem("hiscore", hiscore);
}

createSnakeElement(0);

window.addEventListener('keydown', e => {
    e.preventDefault();

    if (!gameLoop) {
        createSnakeElement(0);
        gameLoop = requestAnimationFrame(main);
        setDir(0, -1);
    }
    if (changingDir)
        return;
    changingDir = true;
    switch (e.key) {
        case "ArrowUp":
            setDir(0, -1);
            break;
        case "ArrowDown":
            setDir(0, 1);
            break;
        case "ArrowLeft":
            setDir(-1, 0);
            break;
        case "ArrowRight":
            setDir(1, 0);
            break;

        default:
            break;
    }
});

function setDir(x, y) {
    inputDir.x = x;
    inputDir.y = y;
    dirSound.currentTime = 0;
    dirSound.play();
}

function createSnakeElement(index) {
    let snakeElement = snakeElements[index];
    if (!snakeElement) {
        snakeElement = document.createElement('div');
        snakeElements.push(snakeElement);
        if (index == 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    }
    snakeElement.style.gridRowStart = snakeArr[index].y;
    snakeElement.style.gridColumnStart = snakeArr[index].x;
}
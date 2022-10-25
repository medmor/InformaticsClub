"use strict"

let gameLoop = null;
let conDim = containerGame.getBoundingClientRect();
const player = {
    gameover: true,
    score: 0,
    lives: 5,
    inPlay: false,
    ballDir: { x: 2, y: -5 },
};
let bricks;
let bricksLenght = 0;

document.addEventListener('keydown', function (e) {
    if (e.key === "ArrowLeft") paddle.left = true;
    if (e.key === "ArrowRight") paddle.right = true;
    if (e.key === "ArrowUp" && !player.inPlay) player.inPlay = true;
})
document.addEventListener('keyup', function (e) {
    if (e.key === "ArrowLeft") paddle.left = false;
    if (e.key === "ArrowRight") paddle.right = false;
})

function startGame() {
    if (player.gameover) {
        player.gameover = false;
        gameover.style.display = "none";
        player.score = 0;
        player.lives = 10;
        player.inPlay = false;
        ball.style.display = "block";
        ball.style.left = paddle.offsetLeft + 50 + "px";
        ball.style.top = paddle.offsetTop - 30 + "px";
        player.ballDir = { x: 2, y: -5 };
        setupBricks();
        scoreUpdater();
        gameLoop = requestAnimationFrame(update);
    }
}

function setupBricks() {
    let row = {
        x: ((conDim.width % 50) / 2)
        , y: 25
    }
    let x = 0;
    while (row.y < (conDim.height / 2)) {
        createBrick(row);
        row.x += 50;
        x++;
        if (row.x > (conDim.width - 50)) {
            row.y += 25;
            row.x = ((conDim.width % 50) / 2);
        }
    }
    bricks = document.querySelectorAll('.brick');
    bricksLenght = bricks.length;
}

function createBrick(pos) {
    const div = document.createElement('div');
    div.setAttribute('class', 'brick');
    div.style.left = pos.x + 'px';
    div.style.top = pos.y + 'px';
    containerGame.appendChild(div);
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.right < bRect.left) || (aRect.left > bRect.right) || (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom));
}

function rColor() {
    return '#' + Math.random().toString(16).substring(2, 8);
}

function scoreUpdater() {
    document.querySelector('.score').textContent = player.score;
    document.querySelector('.lives').textContent = player.lives;
}

function update() {
    if (!player.gameover) {
        let pCurrent = paddle.offsetLeft;
        if (paddle.left && pCurrent > 0) {
            pCurrent -= 5;
        }
        if (paddle.right && (pCurrent < (conDim.width - paddle.offsetWidth))) {
            pCurrent += 5;
        }
        paddle.style.left = pCurrent + 'px';
        if (!player.inPlay) {
            waitingOnPaddle();
        }
        else {
            moveBall();
        }
        gameLoop = requestAnimationFrame(update);
    }
}

function waitingOnPaddle() {
    ball.style.top = (paddle.offsetTop - 22) + 'px';
    ball.style.left = (paddle.offsetLeft + 40) + 'px';
}

function fallOff() {
    player.lives--;
    if (player.lives < 0) {
        endGame();
        player.lives = 0;
    }
    scoreUpdater();
    stopper();
}

function endGame() {
    gameover.style.display = "block";
    gameover.innerHTML = "Game Over<br>Your score " + player.score + "<br> Click here to restart";
    player.gameover = true;
    ball.style.display = "none";
    for (let tBrick of bricks) {
        tBrick.parentNode.removeChild(tBrick);
    }
    cancelAnimationFrame(gameLoop);
}

function stopper() {
    player.inPlay = false;
    player.ballDir = { x: 0, y: -5 };
    player.score = 0;
    player.lives = 5;
    scoreUpdater();
    waitingOnPaddle();
    cancelAnimationFrame(gameLoop);
}

function moveBall() {
    let posBall = {
        x: ball.offsetLeft
        , y: ball.offsetTop
    }
    if (posBall.y > (conDim.height - 20) || posBall.y < 0) {
        if (posBall.y > (conDim.height - 20)) {
            fallOff();
        }
        else {
            player.ballDir.y *= -1;
        }
    }
    if (posBall.x > (conDim.width - 20) || posBall.x < 0) {
        player.ballDir.x *= -1;
    }
    if (isCollide(paddle, ball)) {
        let temp = ((posBall.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10;
        player.ballDir.x = temp;
        player.ballDir.y *= -1;
    };

    if (bricksLenght==0 && !player.gameover) {
        stopper();
        setupBricks();
    }
    for (let tBrick of bricks) {
        if (isCollide(tBrick, ball)) {
            coinSound.currentTime = 0;
            coinSound.play();
            player.ballDir.y *= -1;
            tBrick.parentNode.removeChild(tBrick);
            player.score++;
            scoreUpdater();
            bricksLenght--;
        }
    }
    posBall.y += player.ballDir.y;
    posBall.x += player.ballDir.x;
    ball.style.top = posBall.y + 'px';
    ball.style.left = posBall.x + 'px';
}
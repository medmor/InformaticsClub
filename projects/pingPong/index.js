'use strict';

let leftScore = 0,
    rightScore = 0;
const racketMoveSpeed = 3;



let gameSpaceXY = getDimentions(gameSpace.getBoundingClientRect()),
    leftRacketXY = getDimentions(leftRacket.getBoundingClientRect()),
    rightRacketXY = getDimentions(rightRacket.getBoundingClientRect());
leftRacketXY.top -= gameSpaceXY.top;
rightRacketXY.top -= gameSpaceXY.top;

leftRacket.style.top = leftRacketXY.top + "px"; // needed to change top from js
rightRacket.style.top = rightRacketXY.top + "px"; // needed to change top from js

let kbdEvents = [];

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'w':
        case 's':
            e.preventDefault();
            break;
    }
    kbdEvents[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    kbdEvents[e.key] = false;
});

function moveRacket() {
    if (kbdEvents['ArrowUp']) {
        if (rightRacketXY.top > 0) {
            updateRacketPos(rightRacketXY, rightRacket, -racketMoveSpeed);
        }
    } else if (kbdEvents['ArrowDown']) {
        if (rightRacketXY.top < gameSpaceXY.height - rightRacketXY.height - 8) {
            updateRacketPos(rightRacketXY, rightRacket, racketMoveSpeed);
        }
    }

    if (kbdEvents['w']) {
        if (leftRacketXY.top > 0) {
            updateRacketPos(leftRacketXY, leftRacket, -racketMoveSpeed);
        }
    } else if (kbdEvents['s']) {
        if (leftRacketXY.top < gameSpaceXY.height - leftRacketXY.height - 8) {
            updateRacketPos(leftRacketXY, leftRacket, racketMoveSpeed);
        }
    }
}

let counter = 0;

function start() {
    if (counter === (leftScore + rightScore)) {
        startButton.style.display = "none";
        counter++;

        let vectorX = 1 - 2 * Math.round(Math.random() * gameSpaceXY.width / 200),
            vectorY = 1 - 2 * Math.round(Math.random() * gameSpaceXY.width / 200),
            canChangeVextorX = true;

        let indX = Math.floor(Math.random() * 2) + 1,
            indY = Math.floor(Math.random() * 2) + 1;

        ball.style.top = "50%";
        ball.style.left = "50%";
        let ballXY = getBallDimetions(ball.getBoundingClientRect(), gameSpaceXY);
        incrementBallXY(ballXY, 1, 1);
        let timer;

        timer = requestAnimationFrame(go);


        function go() {
            let stopGame = false;
            moveRacket();

            incrementBallXY(ballXY, indX * vectorX, indY * vectorY);
            if (ballXY.right >= gameSpaceXY.width - rightRacketXY.width) {
                if (((ballXY.top + ballXY.radius) >= rightRacketXY.top) &&
                    ((ballXY.top + ballXY.radius) <= rightRacketXY.top + rightRacketXY.height)) {
                    indX += .1;
                    if (canChangeVextorX) {
                        changeVectorX();
                    }
                } else if (ballXY.right >= gameSpaceXY.width) {
                    stopGame = true;
                    leftScore++;
                    board.innerHTML = leftScore + ':' + rightScore;
                }
            } else if (ballXY.left <= leftRacketXY.width) {
                if (((ballXY.top + ballXY.radius) >= leftRacketXY.top) &&
                    ((ballXY.top + ballXY.radius) <= leftRacketXY.top + leftRacketXY.height)) {
                    indX += Math.random() / 2;
                    indY += Math.random() / 2;
                    if (canChangeVextorX) {
                        changeVectorX();
                    }
                } else if (ballXY.left <= 0) {
                    stopGame = true;
                    rightScore++;
                    board.innerHTML = leftScore + ':' + rightScore;
                }
            } else if (ballXY.top < 0 || ballXY.bottom > gameSpaceXY.height) {
                moveSound.currentTime = 0;
                moveSound.play();
                vectorY *= -1;
            }

            if (stopGame) {
                cancelAnimationFrame(timer);
                startButton.style.display = "inline";
            } else {
                timer = requestAnimationFrame(go);
            }

        }
        function changeVectorX() {
            moveSound.currentTime = 0;
            moveSound.play();
            vectorX *= -1;
            canChangeVextorX = false;
            setTimeout(() => { canChangeVextorX = true }, 100);
        }
    }

}

function getDimentions(rect) {
    return {
        left: Math.floor(rect.left + window.pageXOffset),
        top: Math.floor(rect.top + window.pageYOffset),
        right: Math.floor(rect.right + window.pageXOffset),
        bottom: Math.floor(rect.bottom + window.pageYOffset),
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
        radius: Math.floor(rect.width) / 2
    };
}
function getBallDimetions(rect, gameS) {
    return {
        left: Math.floor(rect.left + window.pageXOffset - gameS.left),
        top: Math.floor(rect.top + window.pageYOffset - gameS.top),
        right: Math.floor(rect.right + window.pageXOffset - gameS.left),
        bottom: Math.floor(rect.bottom + window.pageYOffset - gameS.top),
        width: Math.floor(rect.width),
        radius: Math.floor(rect.width) / 2
    };
}
function updateRacketPos(racketPos, racketDiv, speed) {
    racketPos.top += speed;
    racketPos.bottom += speed;
    racketDiv.style.top = racketPos.top + "px";
}
function incrementBallXY(ballxy, xInc, yInc) {
    ballxy.left += xInc;
    ballxy.right += xInc;
    ballxy.top += yInc;
    ballxy.bottom += yInc;
    ball.style.left = ballxy.left + 'px';
    ball.style.top = ballxy.top + 'px';
}

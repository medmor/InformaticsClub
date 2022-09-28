'use strict';
//create elements for tennis

let leftScore = 0,
    rightScore = 0;
const gameSpace = document.getElementById("gameSpace"),
    ball = document.getElementById("ball"),
    leftRacket = document.getElementById("leftRacket"),
    rightRacket = document.getElementById("rightRacket"),
    racketMoveSpeed = 1;
leftRacket.style.top = "140px"; // needed to change top from js
rightRacket.style.top = "140px"; // needed to change top from js



//get the positions and sizes of the game table and rackets, and then
//write them into hashes in absolute sizes relative to the entire page
//including scrolling
let posGameSpace = gameSpace.getBoundingClientRect(),
    gameSpaceXY = {
        left: Math.floor(posGameSpace.left + window.pageXOffset),
        top: Math.floor(posGameSpace.top + window.pageYOffset),
        right: Math.floor(posGameSpace.right + window.pageXOffset),
        bottom: Math.floor(posGameSpace.bottom + window.pageYOffset)
    };

let posLeftRacket = leftRacket.getBoundingClientRect(),
    leftRacketXY = {
        left: Math.floor(posLeftRacket.left + window.pageXOffset),
        top: Math.floor(posLeftRacket.top + window.pageYOffset),
        right: Math.floor(posLeftRacket.right + window.pageXOffset),
        bottom: Math.floor(posLeftRacket.bottom + window.pageYOffset),
        width: Math.floor(posLeftRacket.width)
    };

let posRightRacket = rightRacket.getBoundingClientRect(),
    rightRacketXY = {
        left: Math.floor(posRightRacket.left + window.pageXOffset),
        top: Math.floor(posRightRacket.top + window.pageYOffset),
        right: Math.floor(posRightRacket.right + window.pageXOffset),
        bottom: Math.floor(posRightRacket.bottom + window.pageYOffset),
        width: Math.floor(posRightRacket.width)
    };


//array of active keyboard events
let kbdEvents = [];

// hang event handler on keypress
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'w':
        case 's':
            e.preventDefault();
            break;
    }
    //record each click in the events array
    kbdEvents[e.key] = true;
});

// hang the event handler when the keys are released
window.addEventListener('keyup', function (e) {
    //remove each click from the events array
    kbdEvents[e.key] = false;
});

//racket movement function
function moveRacket() {
    if (kbdEvents['ArrowUp']) {
        //move right paddle up
        if (rightRacketXY.top <= gameSpaceXY.top + 8) {
        } else {
            rightRacket.style.top = parseInt(rightRacket.style.top) - racketMoveSpeed + 'px';
        }
    } else if (kbdEvents['ArrowDown']) {
        //move right paddle down
        if (rightRacketXY.bottom >= gameSpaceXY.bottom - 8) {
        } else {
            rightRacket.style.top = parseInt(rightRacket.style.top) + racketMoveSpeed + 'px';
        }
    }

    if (kbdEvents['w']) {
        //moving up the left racket
        if (leftRacketXY.top <= gameSpaceXY.top + 8) {

        } else {
            leftRacket.style.top = parseInt(leftRacket.style.top) - racketMoveSpeed + 'px';
        }
    } else if (kbdEvents['s']) {
        // move down the left paddle
        if (leftRacketXY.bottom >= gameSpaceXY.bottom - 8) {

        } else {
            leftRacket.style.top = parseInt(leftRacket.style.top) + racketMoveSpeed + 'px';
        }
    }

    // overwrite the new received values of the positions of the rackets in hashes
    posLeftRacket = leftRacket.getBoundingClientRect();
    leftRacketXY.top = Math.floor(posLeftRacket.top + window.pageYOffset);
    leftRacketXY.bottom = Math.floor(posLeftRacket.bottom + window.pageYOffset);

    posRightRacket = rightRacket.getBoundingClientRect();
    rightRacketXY.top = Math.floor(posRightRacket.top + window.pageYOffset);
    rightRacketXY.bottom = Math.floor(posRightRacket.bottom + window.pageYOffset);

}

// counter of started games
let counter = 0;

//start the game
function start() {

    // if the game is not over, then do nothing
    //otherwise start a new one
    if (counter === (leftScore + rightScore)) {

        counter++;
        ball.style.left = '275px';
        ball.style.top = '175px';


        //random vector direction
        var x = Math.floor(Math.random() * 2),
            y = Math.floor(Math.random() * 2),
            vectorX = 1 - 2 * x,
            vectorY = 1 - 2 * y;
        //random coordinate increment factor
        var indX = Math.floor(Math.random() * 2),
            indY = Math.floor(Math.random() * 2);

        var timer;
        //start the game after 1sec
        setTimeout(function () {
            timer = requestAnimationFrame(go);
        },
            1000);

        // launch the ball
        function go() {
            moveRacket();

            ball.style.left = parseInt(ball.style.left) + indX * vectorX + 'px';
            ball.style.top = parseInt(ball.style.top) + indY * vectorY + 'px';

            //get the values of the positions and sizes of the ball, and then
            //write them into a hash in absolute sizes relative to the entire page
            //including scrolling
            var posBall = ball.getBoundingClientRect(),
                ballXY = {
                    left: Math.floor(posBall.left + window.pageXOffset),
                    top: Math.floor(posBall.top + window.pageYOffset),
                    right: Math.floor(posBall.right + window.pageXOffset),
                    bottom: Math.floor(posBall.bottom + window.pageYOffset),
                    radius: Math.floor(posBall.width) / 2
                };
            //if the ball hits the right paddle
            if ((ballXY.right >= (gameSpaceXY.right - rightRacketXY.width)) &&
                ((ballXY.top + ballXY.radius) >= rightRacketXY.top) &&
                ((ballXY.top + ballXY.radius) <= rightRacketXY.bottom)) {
                vectorX *= -1;
                timer = requestAnimationFrame(go);
                //if the ball hits the left paddle
            } else if ((ballXY.left <= (gameSpaceXY.left + leftRacketXY.width)) &&
                ((ballXY.top + ballXY.radius) >= leftRacketXY.top) &&
                ((ballXY.top + ballXY.radius) <= leftRacketXY.bottom)) {
                vectorX *= -1;
                timer = requestAnimationFrame(go);
                //if the ball hits the right wall
            } else if (ballXY.right >= gameSpaceXY.right) {
                cancelAnimationFrame(timer);
                leftScore++;
                board.innerHTML = leftScore + ':' + rightScore;
                //if the ball hits the left wall
            } else if (ballXY.left <= gameSpaceXY.left) {
                cancelAnimationFrame(timer);
                rightScore++;
                board.innerHTML = leftScore + ':' + rightScore;
            } else if (ballXY.top > gameSpaceXY.top && ballXY.bottom < gameSpaceXY.bottom) {
                timer = requestAnimationFrame(go);
                //if the ball hits the top or bottom wall
            } else if (ballXY.top <= gameSpaceXY.top || ballXY.bottom >= gameSpaceXY.bottom) {
                vectorY *= -1;
                timer = requestAnimationFrame(go);
            }

        }

    }

}
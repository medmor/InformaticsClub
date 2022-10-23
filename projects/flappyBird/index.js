'use strict';

let game = document.getElementById('game');
let birdElement = document.getElementById('bird');
let gameStatus = null;

let sky = {
    x: 0,
};

let bird = {
    speedX: 5,
    speedY: 5,
    y: birdElement.offsetTop,
    x: birdElement.offsetLeft,
    timer: null,
};

let pipes = [];


document.body.addEventListener('click', ev => {
    moveSound.currentTime = 0;
    moveSound.play();
    bird.speedY = -8;
});
document.addEventListener("keyup", (ev) => {
    if (ev.code == "Space") {
        moveSound.currentTime = 0;
        moveSound.play();
        bird.speedY = -8;
    }
})

let createPipe = position => {
    let pipe = {};
    pipe.x = position;
    pipe.topPipeHeight = 50 + parseInt(Math.random() * 300);
    pipe.bottomPipeHeight = 600 - pipe.topPipeHeight - 200;
    pipe.bottomPipeTop = pipe.topPipeHeight + 100 + parseInt(Math.random() * 100);
    pipe.timer = null;

    let topPipe = document.createElement('div');
    topPipe.style.height = pipe.topPipeHeight + 'px';
    topPipe.style.left = pipe.x + 'px';
    topPipe.classList.add("pipe", "pipe-top");
    game.appendChild(topPipe);

    let bottomPipe = document.createElement('div');
    bottomPipe.style.height = pipe.bottomPipeHeight + 'px';
    bottomPipe.style.top = pipe.bottomPipeTop + 'px';
    bottomPipe.style.left = pipe.x + 'px';
    bottomPipe.classList.add("pipe", "pipe-bottom");
    game.appendChild(bottomPipe);
    pipe.topPipe = topPipe;
    pipe.bottomPipe = bottomPipe;
    pipes.push(pipe);

};

function start() {
    Array.from(document.getElementsByClassName("pipe")).forEach(p=>{
        p.parentNode.removeChild(p);
    })
    mask.style.display = "none";
    birdElement.style.top = "100px"
    bird = {
        speedX: 5,
        speedY: 5,
        y: birdElement.offsetTop,
        x: birdElement.offsetLeft,
        timer: null,
    };
    pipes = [];
    createPipe(400);
    createPipe(600);
    createPipe(800);
    createPipe(1000);
    createPipe(1200);
    gameLoop();
    pipesLoop();
}
function gameLoop() {
    gameStatus = setInterval(() => {
        sky.x -= bird.speedX;
        game.style.backgroundPositionX = sky.x + 'px';

        bird.y += bird.speedY;
        bird.speedY += .8;
        birdElement.style.top = bird.y + 'px';

        if (birdElement.offsetTop <= 0 || birdElement.offsetTop >= 575) {
            onLose();
            birdElement.style.top = 575 + 'px';
        }
    }, 30);
}
function pipesLoop() {
    pipes.forEach(pipe => {
        pipe.timer = setInterval(() => {
            if (gameStatus === null) {
                clearInterval(pipe.timer);
            }
            pipe.x -= 3;
            pipe.topPipe.style.left = pipe.x + 'px';
            pipe.bottomPipe.style.left = pipe.x + 'px';
            if (pipe.x < -52) {
                pipe.topPipeHeight = 100 + parseInt(Math.random() * 200);
                pipe.bottomPipeHeight = 600 - pipe.topPipeHeight - 200;
                pipe.bottomPipeTop = pipe.topPipeHeight + 100 + parseInt(Math.random() * 100);

                pipe.topPipe.style.height = pipe.topPipeHeight + 'px';
                pipe.bottomPipe.style.height = pipe.bottomPipeHeight + 'px';

                pipe.bottomPipe.style.top = pipe.bottomPipeTop + 'px';

                pipe.x = 1000;
            }

            let topPipeHitCheck = bird.x + 24 > pipe.x && bird.x < pipe.x + 52 && bird.y < pipe.topPipeHeight;
            let bottomPipeHitCheck = bird.x + 24 > pipe.x && bird.x < pipe.x + 52 && bird.y + 24 > pipe.bottomPipeTop;

            if (topPipeHitCheck || bottomPipeHitCheck) {
                onLose();
                clearInterval(pipe.timer);
            }
        }, 30);
    })
}
function onLose() {
    loseSound.play();
    clearInterval(gameStatus);
    gameStatus = null;
    mask.style.display = "flex";
}
'use strict';

let game = document.getElementById('game');
let birdElement = document.getElementById('bird');
let gameStatus = null;

let score = 0;

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
    pipe.topPipeHeight = 10 + parseInt(Math.random() * 300);
    pipe.bottomPipeHeight = 600 - pipe.topPipeHeight - 100;
    pipe.bottomPipeTop = pipe.topPipeHeight + 85 + parseInt(Math.random() * 95);
    pipe.birdEntred = false;
    pipe.timer = null;
    let topPipe = document.createElement('div');
    topPipe.style.height = pipe.topPipeHeight + 'px';
    topPipe.style.left = pipe.x + 'px';
    topPipe.classList.add("pipe", "pipe-top");
    
    let bottomPipe = document.createElement('div');
    bottomPipe.style.height = pipe.bottomPipeHeight + 'px';
    bottomPipe.style.top = pipe.bottomPipeTop + 'px';
    bottomPipe.style.left = pipe.x + 'px';
    bottomPipe.classList.add("pipe", "pipe-bottom");
    pipe.topPipe = topPipe;
    pipe.bottomPipe = bottomPipe;
    pipes.push(pipe);
    
    pipesDiv.appendChild(topPipe);
    pipesDiv.appendChild(bottomPipe);
};

function start() {
    score = 0;
    pipesDiv.innerHTML = "";
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
        bird.y += bird.speedY;
        bird.speedY += .8;
        birdElement.style.top = bird.y + 'px';

        if (birdElement.offsetTop <= 0 || birdElement.offsetTop  >= 575) {
            onLose();
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
                pipe.topPipeHeight = 10 + parseInt(Math.random() * 300);
                pipe.bottomPipeHeight = 600 - pipe.topPipeHeight - 100;
                pipe.bottomPipeTop = pipe.topPipeHeight + 85 + parseInt(Math.random() * 95);

                pipe.topPipe.style.height = pipe.topPipeHeight + 'px';
                pipe.bottomPipe.style.height = pipe.bottomPipeHeight + 'px';

                pipe.bottomPipe.style.top = pipe.bottomPipeTop + 'px';

                pipe.x = 1000;
            }

            if (!pipe.birdEntred && bird.x + 24 > pipe.x && bird.x < pipe.x + 52) {
                pipe.birdEntred = true;
            }
            if (pipe.birdEntred) {
                if (bird.y < pipe.topPipeHeight || bird.y + 24 > pipe.bottomPipeTop) {

                    onLose();
                    clearInterval(pipe.timer);
                }
                if (bird.x > pipe.x + 52) {
                    pipe.birdEntred = false;
                    setScore(++score);
                    coinSound.play();
                }
            }
            if (scoreDiv.style.opacity > 0)
                scoreDiv.style.opacity-=.005;
        }, 30);
    })
}
function onLose() {
    loseSound.play();
    clearInterval(gameStatus);
    gameStatus = null;
    mask.style.display = "flex";
    mask.innerText = "cliquer pour commencer \n Votre Score est : " + score;

}

function setScore(s) {
    scoreDiv.innerText = s;
    scoreDiv.style.opacity = 1;
}


// let hrElement;
// let counter = 100;
// for (let i = 0; i < counter; i++) {
//   hrElement = document.createElement("HR");
  
//     hrElement.style.left = Math.floor(Math.random() * game.offsetWidth) + "px";
//     hrElement.style.animationDuration = 0.2 + Math.random()  + "s";
//     hrElement.style.animationDelay = Math.random() * 5 + "s";
 
//   game.appendChild(hrElement);
// }
// console.log(window.innerWidth)
// console.log(game.offsetWidth)
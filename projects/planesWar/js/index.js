
let player, enemyPool;

function start(){
    loopSound.play();
    loopSound.loop = true;
    
    gameContainer.dimentions = gameContainer.getBoundingClientRect()
    
    player = new Player(playerSprite, 150);
    
    enemyPool = new EnemyPool(20);

    mask.style.display = "none";
    startGameLoop();
}

function reset(){
    updateArray = [];
    collisionArray = [];
    mask.style.display = "flex";
}

registerEventCallback(events.playerKilled.name, ()=>{
    loopSound.pause();
    loopSound.currentTime = 0;
    enemyPool.destroy();
    player.destroy();
    reset();
});


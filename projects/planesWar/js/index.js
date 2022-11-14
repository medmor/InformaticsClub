
let player, enemyPool;

function start(){
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
    enemyPool.destroy();
    player.destroy();
    reset();
});


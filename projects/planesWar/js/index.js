
function start(){
    gameContainer.dimentions = gameContainer.getBoundingClientRect()
    
    new Player(playerSprite, 150);
    
    new EnemyPool(20);


    mask.style.display = "none";
}
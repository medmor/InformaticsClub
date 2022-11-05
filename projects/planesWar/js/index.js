let player = new Player(playerSprite, 150);

let enemy = new Enemy(enemySprite, 100, 200);


gameContainer.dimentions = gameContainer.getBoundingClientRect()

addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
        player.moveToLeft(player.left - 5);
    } else if (e.code == "ArrowRight") {
        player.moveToRight(player.left + 5, gameContainer.dimentions.width);
    } else if (e.code == "ArrowUp") {
        player.fire();
    }
});

setInterval(() => {
    for (let i = 0; i < player.ammoPool.ammos.length; i++) {
        let ammo = player.ammoPool.ammos[i]
        if (ammo.isActif) {
            if (collide(ammo, enemy)) {
                console.log("collision");
            }
        }
    }
}, 100);

function collide(sprite1, sprite2) {
    if (
        sprite1.left < sprite2.left + sprite2.width &&
        sprite1.left + sprite1.width > sprite2.left &&
        sprite1.bottom < sprite2.bottom + sprite2.height &&
        sprite1.height + sprite1.bottom > sprite2.bottom
    ) {
        return true;
    }
    return false;
}
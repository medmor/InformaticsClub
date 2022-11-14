class EnemyPool {
    enemies = [];
    counter = 1000;
    isActif = true;

    constructor(capacity) {
        for (let i = 0; i < capacity; i++) {
            let s = enemySprite.cloneNode(true);
            s.setAttribute("id", "");
            s.style.display = "block";
            gameContainer.appendChild(s);
            this.enemies.push(new Enemy(s, gameContainer.dimentions.width, gameContainer.dimentions.height))
        }
        updateArray.push(this);
    }

    getEnemy() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (!this.enemies[i].isActif) {
                return this.enemies[i];
            }
        }
    }

    spawnEnemy() {
        var enemy = this.getEnemy();
        if (enemy) {
            enemy.setActif(true);
        }
    }

    destroy() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].destroy(true);
            this.enemies[i] = null;
        }
        this.enemies = [];
    }

    onUpdate = () => {
        this.counter++;
        if (this.counter > 10) {
            this.counter = 0;
            this.spawnEnemy();
        }
    }
}


class Enemy extends SpriteBase {

    ammoPool = new AmmoPool(1, enemyAmmoSprite);

    leftLimit;
    rightLimit;

    xSpeed = 2;
    ySpeed = -3;
    initialHeight;

    static enemyFalled = "EnemyFalled";

    constructor(sprite, gameContainerWidth, gameContainerHeight) {
        super(sprite);

        this.leftLimit = 5 + Math.random() * gameContainerWidth / 2;
        this.rightLimit = gameContainerWidth / 2 + 5 + Math.random() * gameContainerWidth / 2 - 10;

        this.setLeft(this.leftLimit + Math.random() * (this.rightLimit - this.leftLimit));

        this.setBottom(gameContainerHeight - this.height);
        this.initialHeight = this.bottom;

        this.setActif(false);

        this.registerCollision();
        this.registerUpdate();
    }

    randomMove() {
        this.setBottom(this.bottom + this.ySpeed);
        this.setLeft(this.left + this.xSpeed);
        if (this.left < this.leftLimit || this.left > this.rightLimit) {
            this.xSpeed = -this.xSpeed;
        }
        if (this.bottom < 1) {
            this.setActif(false);
            this.setBottom(this.initialHeight);
            dispatchEvent(events.enemyFall.name);
        }
    }

    fire() {
        var ammo = this.ammoPool.getAmmo();
        if (ammo) {
            ammo.fire(player, -10);
        }
    }
    onUpdate = () => {
        this.randomMove();
    }

    onCollision = (other) => {
        this.setActif(false);
        this.setBottom(this.initialHeight);
        if(other instanceof Ammo){
            dispatchEvent(events.enemyDestroyed.name);
        }
    }

}
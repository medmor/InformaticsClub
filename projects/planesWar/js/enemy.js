class Enemy extends SpriteBase {

    ammoPool = new AmmoPool(20, enemyAmmoSprite);

    constructor(sprite, left, bottom){
        super(sprite, left, bottom);
            }

    moveToLeft(left) {
        if (left >= 0) {
            this.setLeft(left);
        }
    }

    moveToRight(left, gameContainerWidth) {
        if (left < gameContainerWidth - this.width) {
            this.setLeft(left);
        }
    }

    fire() {
        var ammo = this.ammoPool.getAmmo();
        if (ammo) {
            ammo.fire(player, -10);
        }
    }

}
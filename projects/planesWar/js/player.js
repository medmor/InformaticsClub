class Player extends SpriteBase {

    ammoPool = new AmmoPool(10)

    moveToLeft(left){
        if(left >= 0){
            this.setLeft(left);
        }
    }

    moveToRight(left, gameContainerWidth){
        if(left < gameContainerWidth - this.width){
            this.setLeft(left);
        }
    }

    fire(){
        var ammo = this.ammoPool.getAmmo();
        if(ammo){
            ammo.fire(player, 10);
        }
    }
}
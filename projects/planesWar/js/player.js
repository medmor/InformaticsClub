class Player extends SpriteBase {

    ammoPool = new AmmoPool(10);
    lives = 5;

    constructor(sprite, left){
        super(sprite, left);
        this.setActif(true);
        this.registerCollision();
        this.registerUpdate();

        registerEventCallback(events.enemyFall.name, ()=>{
            this.lives--;
            if(this.lives == 0){
                this.setActif(false);
                dispatchEvent(events.playerKilled.name);
            }
        });
    }

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
            ammo.fire(this, 10);
        }
    }

    onUpdate = () => {
        if(leftInput){
            this.moveToLeft(this.left - 5);
        } else if(rightInput){
            this.moveToRight(this.left + 5, gameContainer.dimentions.width);
        }
        if(upInput){
            this.fire();
        }
    }

    onCollision= (other)=>{
        if(other instanceof Enemy){
            this.lives --;
            if(this.lives == 0){
                this.setActif(false);
                dispatchEvent(events.playerKilled.name);
            }
        }
    }
}
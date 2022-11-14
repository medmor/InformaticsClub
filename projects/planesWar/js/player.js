class Player extends SpriteBase {

    ammoPool = new AmmoPool(10);
    lives = 5;
    score = 0;

    constructor(sprite, left){
        super(sprite, left);
        this.setActif(true);
        this.registerCollision();
        this.registerUpdate();

        registerEventCallback(events.enemyFall.name, ()=>{
            this.lives--;
            livesInfoP.innerText = "Lives : " + this.lives;
            if(this.lives == 0){
                this.setActif(false);
                dispatchEvent(events.playerKilled.name);
            }
        });
        registerEventCallback(events.playerKilled.name, ()=>{
            for(let i = 0; i < this.ammoPool.ammos.length; i++){
                this.ammoPool.ammos[i].destroy(true);
            }
        });
        registerEventCallback(events.enemyDestroyed.name, ()=>{
            this.score++;
            scoreInfoP.innerText = "Score : " + this.score;
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
            livesInfoP.innerText = "Lives : " + this.lives;
            if(this.lives == 0){
                this.setActif(false);
                dispatchEvent(events.playerKilled.name);
            }
        }
    }
}
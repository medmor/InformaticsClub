class AmmoPool {
    ammos = [];

    constructor(capacity, sprite) {
        var s;
        for (let i = 0; i < capacity; i++) {
            if(!sprite){
                s = document.createElement("div");
                s.classList.add("ammo");
                
                gameContainer.appendChild(s);
            }else{
                s = sprite;
            }
            this.ammos.push(new Ammo(s));
        }
    }

    getAmmo() {
        for (let i = 0; i < this.ammos.length; i++) {
            if (!this.ammos[i].isActif) {
                this.ammos[i].isActif = true;
                return this.ammos[i];
            }
        }
    }
}

class Ammo extends SpriteBase {

    isActif = false;
    timer = null;


    constructor(sprite) {

        super(sprite, undefined, 0);
        this.sprite.style.display = "none";
    }

    remove() {
        this.isActif = false;
        this.sprite.style.display = "none";
        this.bottom = 0;
        this.sprite.style.bottom = this.bottom + "px";
        clearInterval(this.timer);
        this.timer = null;
    }

    fire(player, speed) {
        this.left = player.left + 7;
        this.sprite.style.left = this.left + "px";
        this.sprite.style.display = "block";
        this.timer = setInterval(() => {
            this.bottom += speed;
            this.sprite.style.bottom = this.bottom + "px";
            if (this.bottom > 390) {
                this.remove();
            }
        }, 100);
    }
}
class AmmoPool {
    ammos = [];

    constructor(capacity, sprite) {
        var s;
        for (let i = 0; i < capacity; i++) {
            if (!sprite) {
                s = document.createElement("div");
                s.classList.add("ammo");

                gameContainer.appendChild(s);
            } else {
                s = sprite;
            }
            this.ammos.push(new Ammo(s));
        }
    }

    getAmmo() {
        for (let i = 0; i < this.ammos.length; i++) {
            if (!this.ammos[i].isActif) {
                return this.ammos[i];
            }
        }
    }
}

class Ammo extends SpriteBase {

    speed = 0;

    constructor(sprite) {
        super(sprite, undefined, 0);

        this.setActif(false);

        this.registerCollision();
        this.registerUpdate();
    }

    fire(player, speed) {
        this.isActif = true;
        this.speed = speed;
        this.left = player.left + 7;
        this.sprite.style.left = this.left + "px";
        this.sprite.style.display = "block";
    }

    onUpdate = () => {
        if (this.isActif) {
            this.bottom += this.speed;
            this.sprite.style.bottom = this.bottom + "px";
            if (this.bottom > 390) {
                this.destroy(undefined, () => {
                    this.setBottom(0);
                });
            }
        }
    }

    onCollision = (other) => {
        if(other instanceof Enemy){ 
            this.destroy(undefined, () => {
                this.setBottom(0);
            });
        }
    }
}
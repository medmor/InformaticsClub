class SpriteBase {
    left = 0;
    bottom = 0;
    width = 0;
    height = 0;
    sprite = null;
    isActif;

    onUpdate;
    onCollision;

    constructor(sprite, left, bottom) {
        this.sprite = sprite;

        if (left) this.setLeft(left);
        if (bottom) this.setBottom(bottom);

        var dimentions = this.sprite.getBoundingClientRect();

        this.width = dimentions.width;
        this.height = dimentions.height;
    }

    setBottom(bottom) {
        this.bottom = bottom;
        this.sprite.style.bottom = this.bottom + "px";
    }

    setLeft(left) {
        this.left = left;
        this.sprite.style.left = this.left + "px";
    }

    setActif(value){
        this.isActif = value;
        if(this.isActif){
            this.sprite.style.display = "block";
        }        else{
            this.sprite.style.display = "none";
        }
    }


    destroy(removeFromDoom, onDestroyCallback){
        this.setActif(false);
        if(removeFromDoom){
            this.sprite.remove();
        }
        if(onDestroyCallback){
            onDestroyCallback();
        }
    }

    registerUpdate(){
        updateArray.push(this);
    }
    registerCollision(){
        collisionArray.push(this);
    }
}
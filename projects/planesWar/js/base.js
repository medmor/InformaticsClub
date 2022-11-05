class SpriteBase {
    left = 0;
    bottom = 0;
    width = 0;
    height = 0;
    sprite = null;

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

}
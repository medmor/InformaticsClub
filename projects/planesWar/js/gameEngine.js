let updateArray = [];
let collisionArray = [];

let gameLoop;
function startGameLoop() {
    gameLoop = setInterval(() => {

        //update ammo
        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].isActif && updateArray[i].onUpdate)
                updateArray[i].onUpdate();
        }
        //collision
        for (let i = 0; i < collisionArray.length - 1; i++) {
            for (let j = i + 1; j < collisionArray.length; j++) {
                if (collisionArray[i].onCollision && collisionArray[j].onCollision) {
                    if (collide(collisionArray[i], collisionArray[j])) {
                        collisionArray[i].onCollision(collisionArray[j]);
                        collisionArray[j].onCollision(collisionArray[i]);
                    }
                }
            }
        }
    }, 100);
}

function collide(sprite1, sprite2) {
    if (!sprite1.isActif || !sprite2.isActif) {
        return false;
    }
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


//events
let events = {
    enemyFall: {
        name: "enemyFall",
        callbacks: []
    },
    enemyDestroyed: {
        name: "enemyDestroyed",
        callbacks: []
    },
    playerKilled: {
        name: "playerKilled",
        callbacks: []
    }
};

function dispatchEvent(eventName) {
    if (events[eventName].callbacks) {
        for (let i = 0; i < events[eventName].callbacks.length; i++) {
            events[eventName].callbacks[i]();
        }
    }
}
function registerEventCallback(eventName, callback) {
    if (events[eventName]) {
        events[eventName].callbacks.push(callback);
    }
}

//input
let rightInput = false;
let leftInput = false;
let upInput = false;

addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
        leftInput = true;
    } else if (e.code == "ArrowRight") {
        rightInput = true;
    } else if (e.code == "ArrowUp") {
        upInput = true;
    }
});

addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        leftInput = false;
    } else if (e.code == "ArrowRight") {
        rightInput = false;
    } else if (e.code == "ArrowUp") {
        upInput = false;
    }
})

registerEventCallback(events.playerKilled.name, () => {
    clearInterval(gameLoop);
});
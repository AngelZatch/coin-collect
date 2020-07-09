import * as PIXI from "pixi.js"

const app = new PIXI.Application({
    width: 600,
    height: 600
})

document.body.appendChild(app.view)

// TODO: Solve typing of this
let bowsette

app.loader
    .add('bowsette', 'assets/bowsette.png')
    .load((loader, resources) => setup(resources))

function setup(resources) {
    // Create Bowsette Sprite
    bowsette = new PIXI.Sprite(resources.bowsette.texture)
    bowsette.x = app.renderer.width / 2
    bowsette.y = app.renderer.height / 2
    bowsette.anchor.x = 0.5
    bowsette.anchor.y = 0.5
    bowsette.scale.x = 0.4
    bowsette.scale.y = 0.4
    let playerXMovement = 0, playerYMovement = 0

    app.stage.addChild(bowsette)

    // Setup keyboard
    let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

    left.press = () => {
        playerXMovement = -2
    }

    left.release = () => {
        playerXMovement = 0
    }

    up.press = () => {
        playerYMovement = -2
    }

    up.release = () => {
        playerYMovement = 0
    }

    down.press = () => {
        playerYMovement = 2
    }

    down.release = () => {
        playerYMovement = 0
    }

    right.press = () => {
        playerXMovement = 2
    }

    right.release = () => {
        playerXMovement = 0
    }

    app.ticker.add(() => loop(playerXMovement, playerYMovement))
}

function loop(playerXMovement, playerYMovement) {
    bowsette.x += playerXMovement;
    bowsette.y += playerYMovement;
    console.log('HEY')
}

function keyboard(value) {
    const key = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value,
        isDown: false,
        isUp: true,
        press: () => {
            key.isDown = true
            key.isUp = false
        },
        release: () => {
            key.isDown = false
            key.isUp = true
        },
        downHandler: (event) => {
            if (event.key === key.value) {
                if (key.isUp) { key.press() }
                event.preventDefault()
            }
        },
        upHandler: (event) => {
            if (event.key === key.value) {
                if (key.isUp) { key.release() }
                event.preventDefault()
            }
        },
        unsubscribe: () => {
            window.removeEventListener("keydown", downListener)
            window.removeEventListener("keyup", upListener)
        }
    };

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false)
    window.addEventListener("keyup", upListener, false)

    return key;
}

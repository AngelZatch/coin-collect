import * as PIXI from "pixi.js"

const app = new PIXI.Application({
    width: 1080,
    height: 720,
    antialias: true,
    resolution: 1
})

document.body.appendChild(app.view)

let bowsette: PIXI.Sprite
let score = 0
const coins: Array<PIXI.Sprite> = []
let state: () => void
const gameScene: PIXI.Container = new PIXI.Container()
const gameOverScene: PIXI.Container = new PIXI.Container()
let message: PIXI.Text

app.loader
    .add('bowsette', 'assets/bowsette.png')
    .add('coin', 'assets/coin.png')
    .load(setup)

function setup() {
    // Create Scenes
    app.stage.addChild(gameScene)

    app.stage.addChild(gameOverScene)
    gameOverScene.visible = false

    // Create Bowsette Sprite
    bowsette = new PIXI.Sprite(app.loader.resources.bowsette.texture)
    bowsette.interactive = true
    bowsette.x = app.renderer.width / 2
    bowsette.y = app.renderer.height / 2
    bowsette.anchor.x = 0.5
    bowsette.anchor.y = 0.5
    bowsette.scale.x = 0.1
    bowsette.scale.y = 0.1

    // Create Score Text
    message = new PIXI.Text(`Score: ${score}`, new PIXI.TextStyle({
        fontSize: 20,
        fill: "white"
    }))
    message.x = 10
    message.y = app.renderer.height - 40
    gameScene.addChild(message)

    gameScene.addChild(bowsette)

    // Mouse control
    window.addEventListener('mousemove', (event: MouseEvent) => {
        bowsette.x = Math.min(Math.max(0, event.clientX), app.view.width)
        bowsette.y = Math.min(Math.max(0, event.clientY), app.view.height)
    })

    state = play

    app.ticker.add(() => gameLoop())
}

function gameLoop() {
    state()
}

function play() {
    if (Math.random() * 100 < 1) {
        coins.push(spawnCoin())
    }

    let coinCollected = false

    coins.forEach((coin, index) => {
        if (areSpritesColliding(bowsette, coin)) {
            coinCollected = true
            gameScene.removeChild(coin)
            coins.splice(index, 1)
        }
    })

    if (coinCollected) {
        score += 1
        message.text = `Score: ${score}`
        coinCollected = false
    }

    if (score > 500000) {
        state = end
    }
}

function end() {
    gameScene.visible = false
    gameOverScene.visible = true
}

function spawnCoin() {
    const coin = new PIXI.Sprite(app.loader.resources.coin.texture)
    coin.interactive = true
    coin.x = Math.random() * (app.renderer.width - 10)
    coin.y = Math.random() * (app.renderer.height - 10)
    coin.scale.x = 0.004
    coin.scale.y = 0.004
    coin.anchor.x = 0.5
    coin.anchor.y = 0.5

    gameScene.addChild(coin)

    return coin
}

function areSpritesColliding(r1: PIXI.Sprite, r2: PIXI.Sprite): boolean {

    // hit will determine whether there's a collision
    let hit = false

    // Find the center points of each sprite
    const r1CenterX = r1.x + r1.width / 2
    const r1CenterY = r1.y + r1.height / 2
    const r2CenterX = r2.x + r2.width / 2
    const r2CenterY = r2.y + r2.height / 2

    // Find the half-widths and half-heights of each sprite
    const r1HalfWidth = r1.width / 2
    const r1HalfHeight = r1.height / 2
    const r2HalfWidth = r2.width / 2
    const r2HalfHeight = r2.height / 2

    // Calculate the distance vector between the sprites
    const vx = r1CenterX - r2CenterX
    const vy = r1CenterY - r2CenterY

    // Figure out the combined half-widths and half-heights
    const combinedHalfWidths = r1HalfWidth + r2HalfWidth
    const combinedHalfHeights = r1HalfHeight + r2HalfHeight

    // Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        // A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            // There's definitely a collision happening
            hit = true
        } else {

            // There's no collision on the y axis
            hit = false
        }
    } else {

        // There's no collision on the x axis
        hit = false
    }

    // `hit` will be either `true` or `false`
    return hit
}

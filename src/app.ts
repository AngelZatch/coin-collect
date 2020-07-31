import * as PIXI from "pixi.js"
import { Coin } from "./models/coin.model"

const app = new PIXI.Application({
    width: 1080,
    height: 720,
    antialias: true,
    resolution: 1
})

document.body.appendChild(app.view)

let player: PIXI.Graphics
let score = 0
const coins: Array<Coin> = []
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

    player = new PIXI.Graphics()
    player.beginFill(0x6cfcfc)
    player.drawRect(-30, -30, 30, 30)

    // Create Score Text
    message = new PIXI.Text(`Score: ${score}`, new PIXI.TextStyle({
        fontSize: 20,
        fill: "white"
    }))
    message.x = 10
    message.y = app.renderer.height - 40
    gameScene.addChild(message)

    gameScene.addChild(player)
    // Mouse control
    window.addEventListener('mousemove', (event: MouseEvent) => {
        player.x = Math.min(Math.max(0, event.clientX), app.view.width)
        player.y = Math.min(Math.max(0, event.clientY), app.view.height)
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
        // Testing collision
        if (areSpritesColliding(player, coin.sprite)) {
            coinCollected = true
            gameScene.removeChild(coin.sprite)
            coins.splice(index, 1)
        }
        // Decreasing lifespan of coin and deleting it if needed
        coin.lifespan -= 1
        if (coin.lifespan <= 0) {
            gameScene.removeChild(coin.sprite)
            coins.splice(index, 1)
        }
    })

    if (coinCollected) {
        score += 1
        message.text = `Score: ${score}`
    }

    if (score > 500000) {
        state = end
    }
}

function end() {
    gameScene.visible = false
    gameOverScene.visible = true
}

function spawnCoin(): Coin {
    const coin = new Coin({
        sprite: new PIXI.Graphics()
    })
    coin.sprite.beginFill(0xf7ce3b)
    coin.sprite.drawCircle(Math.random() * (app.renderer.width - 10), Math.random() * (app.renderer.height - 10), 10)

    gameScene.addChild(coin.sprite)

    return coin
}

function areSpritesColliding(r1: PIXI.Graphics, r2: PIXI.Graphics): boolean {
    const r1Bounds = r1.getBounds()
    const r2Bounds = r2.getBounds()

    return r1Bounds.x + r1Bounds.width > r2Bounds.x
        && r1Bounds.x < r2Bounds.x + r2Bounds.width
        && r1Bounds.y + r1Bounds.height > r2Bounds.y
        && r1Bounds.y < r2Bounds.y + r2Bounds.height
}

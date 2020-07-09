import * as PIXI from "pixi.js"

const app = new PIXI.Application({
    width: 800,
    height: 800
})

document.body.appendChild(app.view)

app.loader.add('bowsette', 'assets/bowsette.png').load((loader, resources) => {
    const bowsette = new PIXI.Sprite(resources.bowsette.texture)

    bowsette.x = app.renderer.width / 2
    bowsette.y = app.renderer.height / 2

    bowsette.anchor.x = 0.5
    bowsette.anchor.y = 0.5

    app.stage.addChild(bowsette)

    app.ticker.add(() => {
        bowsette.rotation += 0.01
    })
})

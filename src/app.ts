import * as PIXI from "pixi.js"

const app = new PIXI.Application({
    width: 900,
    height: 600
})

document.body.appendChild(app.view)

let bowsette: PIXI.Sprite

app.loader
    .add('bowsette', 'assets/bowsette.png')
    .load((loader, resources) => setup(resources))

function setup(resources: Partial<Record<string, PIXI.LoaderResource>>) {
    // Create Bowsette Sprite
    bowsette = new PIXI.Sprite(resources?.bowsette?.texture)
    console.log(bowsette)
    bowsette.x = app.renderer.width / 2
    bowsette.y = app.renderer.height / 2
    bowsette.anchor.x = 0.5
    bowsette.anchor.y = 0.5
    bowsette.scale.x = 0.1
    bowsette.scale.y = 0.1

    app.stage.addChild(bowsette)

    // Mouse control
    window.addEventListener('mousemove', (event: MouseEvent) => {
        bowsette.x = Math.min(Math.max(0, event.clientX), app.view.width)
        bowsette.y = Math.min(Math.max(0, event.clientY), app.view.height)
    })

    app.ticker.add(() => loop())
}

function loop() {
}
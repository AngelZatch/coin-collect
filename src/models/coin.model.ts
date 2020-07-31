export class Coin {
    public value: number
    public lifespan: number
    public sprite: PIXI.Graphics

    constructor(coin: Partial<Coin>) {
        this.value = 1
        this.lifespan = 600
        this.sprite = coin.sprite!
    }
}

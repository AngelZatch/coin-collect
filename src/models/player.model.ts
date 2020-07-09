export class Player {
    public size: number
    public score: number

    constructor(player?: Partial<Player>) {
        this.size = player && player.size || 5
        this.score = player && player.score || 0
    }
}

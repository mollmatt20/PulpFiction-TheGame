class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', { frameWidth: 16, frameHeight: 16 })
        this.load.image('tilesetImage', 'colored_packed.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tilemap.json')
    }

    create() {
        this.scene.start("titleScene")
    }
}
class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet('kenney_sheet', 'colored_transparent_packed.png', { frameWidth: 16, frameHeight: 16 })
        this.load.image('tilesetImage', 'colored_packed.png')
        this.load.tilemapTiledJSON('menuJSON', 'menu.json')
        this.load.tilemapTiledJSON('levelone_outsideJSON', 'levelone_outside.json')
    }

    create() {
        this.scene.start("titleScene")
    }
}
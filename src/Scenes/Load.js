class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'img/slime.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet('kenney_sheet', 'img/colored_transparent_packed.png', { frameWidth: 16, frameHeight: 16 })
        this.load.image('tilesetImage', 'img/colored_packed.png')
        this.load.tilemapTiledJSON('menuJSON', 'maps/menu.json')
        this.load.tilemapTiledJSON('levelone_outsideJSON', 'maps/levelone_outside.json')
        this.load.tilemapTiledJSON('levelone_buildingJSON', 'maps/levelone_building.json')
    }

    create() {
        this.scene.start("titleScene")
    }
}
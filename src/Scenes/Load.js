class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('vince', 'img/Vince.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet('slime', 'img/slime.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet('kenney_sheet', 'img/colored_transparent_packed.png', { frameWidth: 16, frameHeight: 16 })
        this.load.image('tilesetImage', 'img/colored_packed.png')
        this.load.image('tileset', 'img/PulpFiction_packed.png', { frameWidth: 16, frameHeight: 16 })
        this.load.tilemapTiledJSON('menuJSON', 'maps/menu.json')
        this.load.tilemapTiledJSON('lv1_outJSON', 'maps/levelone_outside.json')
        this.load.tilemapTiledJSON('lv1_buildJSON', 'maps/levelone_building.json')
        this.load.tilemapTiledJSON('lv1_build2JSON', 'maps/levelone_building2.json')
        this.load.tilemapTiledJSON('lv1_bathroomJSON', 'maps/levelone_bathroom.json')
        this.load.tilemapTiledJSON('lv2_outJSON', 'maps/leveltwo_outside.json')
        this.load.tilemapTiledJSON('lv2_build1JSON', 'maps/leveltwo_building1.json')
        this.load.tilemapTiledJSON('lv2_build2JSON', 'maps/leveltwo_building2.json')
        this.load.tilemapTiledJSON('lv2_build2_noObjectsJSON', 'maps/leveltwo_building2_noObjects.json')
        this.load.tilemapTiledJSON('lv2_bathroomJSON', 'maps/leveltwo_bathroom.json')
        this.load.tilemapTiledJSON('lv2_build3JSON', 'maps/leveltwo_building3.json')
        this.load.tilemapTiledJSON('lv3_outJSON', 'maps/levelthree_outside.json')
        this.load.tilemapTiledJSON('lv3_homeJSON', 'maps/levelthree_home.json')
        this.load.tilemapTiledJSON('lv3_bathroomJSON', 'maps/levelthree_bathroom.json')
        this.load.audio('gunshot', 'gunshot.mp3')
    }

    create() {
        this.scene.start("titleScene")
    }
}
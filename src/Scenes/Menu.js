class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    create(){
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('colored_packed', 'tilesetImage')
        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)

        this.slime = this.physics.add.sprite(32, 32, 'slime', 0)
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1})
        })
        this.slime.play('jiggle')
        this.slime.body.setCollideWorldBounds(true)
        this.cursors = this.input.keyboard.createCursorKeys()
    }
}
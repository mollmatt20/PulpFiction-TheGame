class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    create(){
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('colored_packed', 'tilesetImage')
        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        wallLayer.setCollisionByProperty({ collides: true })

        this.slime = this.physics.add.sprite(32, 32, 'slime', 0)
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1})
        })
        this.slime.play('jiggle')
        this.slime.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.slime, wallLayer)
        this.VEL = 100
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }
        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }
        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}
class Lv1_Build extends Phaser.Scene {
    constructor() {
        super("lv1buildScene")
    }

    create() {
        const map = this.add.tilemap('lv1_buildJSON')
        const tileset = map.addTilesetImage('colored_packed', 'tilesetImage')

        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const doorLayer = map.createLayer('Door', tileset, 0, 0)

        wallLayer.setCollisionByProperty({ collides: true })
        doorLayer.setCollisionByProperty({ collides: true })

        const slimeSpawn = map.findObject('Spawns', obj => obj.name === 'slimeSpawn')
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y, 'slime', 0)
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1})
        })
        this.slime.play('jiggle')

        this.slime.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.slime, wallLayer)
        this.physics.add.collider(this.slime, doorLayer, () => {
            this.scene.start('lv1outScene')
        })

        this.VEL = 100

        // camera properties
        this.cam = this.cameras.main
        this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam.centerOn(this.slime.x, this.slime.y);

        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.checkCamBounds(this.slime, this.cam)

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

    checkCamBounds(obj, cam) {
        if(obj.x + obj.width/2 > cam.width + cam.scrollX) {
            // move camera
            cam.setScroll(cam.scrollX + cam.width, cam.scrollY);
            // move player
            obj.x = cam.scrollX + obj.width/2;
        } else if(obj.x - obj.width/2 < cam.scrollX) {
            cam.setScroll(cam.scrollX - cam.width, cam.scrollY);
            obj.x = cam.scrollX + width - obj.width/2;
        } else if(obj.y + obj.height/2 > cam.height + cam.scrollY) {
            cam.setScroll(cam.scrollX, cam.scrollY + cam.height);
            obj.y = cam.scrollY + obj.height/2;
        } else if(obj.y - obj.height/2 < cam.scrollY) {
            cam.setScroll(cam.scrollX, cam.scrollY - cam.height);
            obj.y = cam.scrollY + cam.height - obj.height/2;
        }
    }
}
class Lv1_Build2 extends Phaser.Scene {
    constructor() {
        super("lv1build2Scene")
    }

    create() {
        const map = this.add.tilemap('lv1_build2JSON')
        const tileset = map.addTilesetImage('PulpFiction_packed', 'tileset')

        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const tableLayer = map.createLayer('Table', tileset, 0, 0)        
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const mainLayer = map.createLayer('Main Door', tileset, 0, 0)
        const returnLayer = map.createLayer('Return Door', tileset, 0, 0)

        wallLayer.setCollisionByProperty({ collides: true })
        tableLayer.setCollisionByProperty({ collides: true })
        mainLayer.setCollisionByProperty({ collides: true })
        returnLayer.setCollisionByProperty({ collides: true })

        let vinceSpawn = map.findObject('Spawns', obj => obj.name === 'ogSpawn')
        if (spawnFlag == 'bathroom') {
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'doorSpawn')
        }
        this.vince = this.physics.add.sprite(vinceSpawn.x, vinceSpawn.y, 'vince', 0)
        
        this.vince.body.setCollideWorldBounds(true)

        this.physics.add.collider(this.vince, wallLayer)
        this.physics.add.collider(this.vince, tableLayer)
        this.physics.add.collider(this.vince, mainLayer, () => {
            if(key == 1) {
                spawnFlag = 'bathroom'
                this.scene.start('lv1bathroomtextScene')
            }
        })
        this.physics.add.collider(this.vince, returnLayer, () => {
            if(key == 2) {
                spawnFlag = 'build2'
                this.scene.start('lv1outScene')
            }
        })

        this.VEL = 100

        // camera properties
        this.cam = this.cameras.main
        this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam.centerOn(this.vince.x, this.vince.y);

        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.checkCamBounds(this.vince, this.cam)

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
        this.vince.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
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
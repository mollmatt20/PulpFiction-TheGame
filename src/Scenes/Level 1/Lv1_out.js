class Lv1_out extends Phaser.Scene {
    constructor() {
        super("lv1outScene")
    }

    create() {
        // Add tilemap
        const map = this.add.tilemap('lv1_outJSON')
        const tileset = map.addTilesetImage('PulpFiction_packed', 'tileset')

        // Add tilemap layers
        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const door1Layer = map.createLayer('Door1', tileset, 0, 0)
        const door2Layer = map.createLayer('Door2', tileset, 0, 0) 
        const door3Layer = map.createLayer('Door3', tileset, 0, 0) 

        // Set collision properties of certain tilemap layers
        wallLayer.setCollisionByProperty({ collides: true })
        door1Layer.setCollisionByProperty({ collides: true })
        door2Layer.setCollisionByProperty({ collides: true })
        door3Layer.setCollisionByProperty({ collides: true })

        // Player spawn points depending which level they entered
        let vinceSpawn = map.findObject('Spawns', obj => obj.name === 'ogSpawn')
        if(spawnFlag == 'build1'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'buildSpawn1')
        } else if(spawnFlag == 'build2'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'buildSpawn2')
        }

        // Apply colliding physics to player and transfer to
        // new scene through a door if the prerequisites are met
        this.vince = this.physics.add.sprite(vinceSpawn.x, vinceSpawn.y, 'vince', 0)
        
        this.vince.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.vince, wallLayer)
        this.physics.add.collider(this.vince, door1Layer, () => {
            if(key == 2) {
                spawnFlag = 'lv1_door'
                this.scene.start('menuScene')
            }
        })
        this.physics.add.collider(this.vince, door2Layer, () => {
            if(key == 0) {
                spawnFlag = 'build1'
                this.scene.start('lv1build1textScene')
            }
        })
        this.physics.add.collider(this.vince, door3Layer, () => {
            if(key == 1) {
                spawnFlag = 'build2'
                this.scene.start('lv1build2textScene')
            }
        })

        this.VEL = 200

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
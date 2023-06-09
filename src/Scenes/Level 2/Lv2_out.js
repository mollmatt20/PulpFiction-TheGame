class Lv2_out extends Phaser.Scene {
    constructor() {
        super('lv2outScene')
    }
    
    create() {
        // Add tilemap
        const map = this.add.tilemap('lv2_outJSON')
        const tileset = map.addTilesetImage('PulpFiction_packed', 'tileset')

        // Add tilemap layers
        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const returnLayer = map.createLayer('Return Door', tileset, 0, 0)
        const door1Layer = map.createLayer('Door1', tileset, 0, 0) 
        const door2Layer = map.createLayer('Door2', tileset, 0, 0)        
        const door3Layer = map.createLayer('Door3', tileset, 0, 0)               

        // Set collision properties of certain tilemap layers
        wallLayer.setCollisionByProperty({ collides: true })
        returnLayer.setCollisionByProperty({ collides: true })
        door1Layer.setCollisionByProperty({ collides: true })
        door2Layer.setCollisionByProperty({ collides: true })
        door3Layer.setCollisionByProperty({ collides: true })

        // Player spawn points depending which level they entered
        let vinceSpawn = map.findObject('Spawns', obj => obj.name === 'ogSpawn')
        if(spawnFlag == 'build1'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'build1Spawn')
        } else if(spawnFlag == 'build2') {
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'build2Spawn')
        } else if(spawnFlag == 'build3') {
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'build3Spawn')
        }
        this.vince = this.physics.add.sprite(vinceSpawn.x, vinceSpawn.y, 'vince', 0)
        
        // Apply colliding physics to player and transfer to
        // new scene through a door if the prerequisites are met
        this.vince.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.vince, wallLayer)
        this.physics.add.collider(this.vince, returnLayer, () => {
            spawnFlag = 'lv2_door'
            this.scene.start('menuScene')
        })
        this.physics.add.collider(this.vince, door1Layer, () => {
            spawnFlag = 'build1'
            if(key == 0 || key == 4) {
                if(key == 0) {
                    this.scene.start('lv2build1text1Scene')
                }
                if(key == 4) {
                    this.scene.start('lv2build1text2Scene')
                }
            }
        })
        this.physics.add.collider(this.vince, door2Layer, () => {
            spawnFlag = 'build2'
            if(key == 1 || key == 3) {
                if(key == 1) {
                    this.scene.start('lv2build2text1Scene')
                }
                if(key == 3) {
                    this.scene.start('lv2build2text2Scene')
                }
            }
        })
        this.physics.add.collider(this.vince, door3Layer, () => {
            spawnFlag = 'build3'
            if(key == 2) {
                this.scene.start('lv2build3text1Scene')
            }
        })

        this.VEL = 200

        // camera properties
        this.cam = this.cameras.main
        this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam.centerOn(this.vince.x, this.vince.y);

        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys()
        console.log(key)
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
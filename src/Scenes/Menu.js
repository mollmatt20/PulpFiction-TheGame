class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    create(){
        // Add tilemap
        const map = this.add.tilemap('menuJSON')
        const tileset = map.addTilesetImage('PulpFiction_packed','tileset')

        // Add tilemap layers
        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const doorLayer1 = map.createLayer('Door1', tileset, 0, 0)
        const doorLayer2 = map.createLayer('Door2', tileset, 0, 0)
        const doorLayer3 = map.createLayer('Door3', tileset, 0, 0)

        // Set collision properties of certain tilemap layers
        wallLayer.setCollisionByProperty({ collides: true })
        doorLayer1.setCollisionByProperty({ collides: true })
        doorLayer2.setCollisionByProperty({ collides: true })
        doorLayer3.setCollisionByProperty({ collides: true })

        // Player spawn points depending which level they entered
        let vinceSpawn = map.findObject('Spawns', obj => obj.name === 'ogSpawn')
        if(spawnFlag == 'lv1_door'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'lv1Spawn')
        }
        if(spawnFlag == 'lv2_door'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'lv2Spawn')
        }
        if(spawnFlag == 'lv3_door'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'lv3Spawn')
        }

        // Apply colliding physics to player and transfer to
        // new scene through a door if the prerequisites are met
        this.vince = this.physics.add.sprite(vinceSpawn.x, vinceSpawn.y, 'vince', 0)
        
        this.vince.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.vince, wallLayer)
        this.physics.add.collider(this.vince, doorLayer1, () =>{
            key = 0
            if(lvCompleted == 0) {
                this.scene.start('lv1entertextScene')
            }
        }, null, this)
        this.physics.add.collider(this.vince, doorLayer2, () =>{
            key = 0
            if(lvCompleted == 1) {
                this.scene.start('lv2entertextScene')
            }
        }, null, this)
        this.physics.add.collider(this.vince, doorLayer3, () =>{
            key = 0
            if(lvCompleted == 2) {
                this.scene.start('lv3entertextScene')
            }
        }, null, this)
        this.VEL = 100


        // camera properties
        this.cam = this.cameras.main
        this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam.centerOn(this.vince.x, this.vince.y);

        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // check player against camera bounds
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

    // check passed obj against passed camera bounds to scroll camera
    // assumes object origin is 0.5
    // also relies upon player tile & physics world collisions to keep player inside world
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
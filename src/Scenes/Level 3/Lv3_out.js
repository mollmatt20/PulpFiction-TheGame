class Lv3_out extends Phaser.Scene {
    constructor() {
        super('lv3outScene')
    }
    
    create() {
        // Add tilemap
        const map = this.add.tilemap('lv3_outJSON')
        const tileset = map.addTilesetImage('PulpFiction_packed', 'tileset')

        // Add tilemap layers
        const floor1Layer = map.createLayer('Floor1', tileset, 0, 0)
        const floor2Layer = map.createLayer('Floor2', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const stairsLayer = map.createLayer('Stairs', tileset, 0, 0)
        const mainLayer = map.createLayer('Main Door', tileset, 0, 0)
        const doorLayer = map.createLayer('Other Doors', tileset, 0, 0)                

        // Set collision properties of certain tilemap layers
        wallLayer.setCollisionByProperty({ collides: true })
        mainLayer.setCollisionByProperty({ collides: true })
        doorLayer.setCollisionByProperty({ collides: true })

        // Player spawn points depending which level they entered
        let vinceSpawn = map.findObject('Spawns', obj => obj.name === 'ogSpawn')
        if(spawnFlag == 'mainDoor'){
            vinceSpawn = map.findObject('Spawns', obj => obj.name === 'doorSpawn')
        } 

        // Apply colliding physics to player and transfer to
        // new scene through a door if the prerequisites are met
        this.vince = this.physics.add.sprite(vinceSpawn.x, vinceSpawn.y, 'vince', 0)
        
        this.vince.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.vince, wallLayer)
        this.physics.add.collider(this.vince, doorLayer)
        this.physics.add.collider(this.vince, mainLayer, () => {
            spawnFlag = 'mainDoor'
            this.scene.start('lv3hometextScene')
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
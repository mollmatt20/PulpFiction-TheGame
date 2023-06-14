class Lv2_build3 extends Phaser.Scene {
    constructor() {
        super('lv2build3Scene')
    }

    create() {
        // Add tilemap
        const map = this.add.tilemap('lv2_build3JSON')
        const tileset = map.addTilesetImage('PulpFiction_packed', 'tileset')

        // Add tilemap layers
        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const tableLayer = map.createLayer('Table', tileset, 0, 0)
        const doorLayer = map.createLayer('Door', tileset, 0, 0)

        // Set collision properties of certain tilemap layers
        wallLayer.setCollisionByProperty({ collides: true })
        tableLayer.setCollisionByProperty({ collides: true })
        doorLayer.setCollisionByProperty({ collides: true })

        // Player spawn points depending which level they entered
        let vinceSpawn = map.findObject('Spawns', obj => obj.name === 'ogSpawn')

        this.vince = this.physics.add.sprite(vinceSpawn.x, vinceSpawn.y, 'vince', 0)
        
        // Create key from tilemap
        this.key = map.createFromObjects("Objects", {
            name: "Key",
            key: "kenney_sheet",
            frame: 560
        });

        // Apply colliding physics to player and transfer to
        // new scene through a door if the prerequisites are met
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);

        this.vince.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.vince, wallLayer)
        this.physics.add.collider(this.vince, doorLayer, () => {
            if(key == 3) {
                this.scene.start('lv2outScene')
            }
        })

        this.physics.add.overlap(this.vince, this.key, (obj1, obj2) => {
            key++;
            obj2.destroy(); 
        });

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
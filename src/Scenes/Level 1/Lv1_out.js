class Lv1_out extends Phaser.Scene {
    constructor() {
        super("lv1outScene")
    }

    create() {
        const map = this.add.tilemap('lv1_outJSON')
        const tileset = map.addTilesetImage('colored_packed', 'tilesetImage')

        const floorLayer = map.createLayer('Floor', tileset, 0, 0)
        const wallLayer = map.createLayer('Wall', tileset, 0, 0)
        const doorLayer = map.createLayer('Door', tileset, 0, 0)
        const door2Layer = map.createLayer('Door2', tileset, 0, 0)        

        wallLayer.setCollisionByProperty({ collides: true })
        doorLayer.setCollisionByProperty({ collides: true })
        door2Layer.setCollisionByProperty({ collides: true })

        let slimeSpawn = map.findObject('Spawns', obj => obj.name === 'slimeSpawn')
        if(spawnFlag == 'build1'){
            slimeSpawn = map.findObject('Spawns', obj => obj.name === 'slimeSpawn2')
        }
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y, 'slime', 0)
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1})
        })
        this.slime.play('jiggle')

        this.coins = map.createFromObjects("Objects", {
            name: "coin",
            key: "kenney_sheet",
            frame: 214
        });

        // for simplicity's sake, we'll add physics to the coins manually
        // https://newdocs.phaser.io/docs/3.54.0/Phaser.Physics.Arcade.World#enable        
        // second parameter is 0: DYNAMIC_BODY or 1: STATIC_BODY
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        
        // then add the coins to a group
        this.coinGroup = this.add.group(this.coins);

        this.slime.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.slime, wallLayer)
        this.physics.add.collider(this.slime, doorLayer, () => {
            if(coin == 3) {
                coin = 0
                spawnFlag = 'lv1_door'
                this.scene.start('menuScene')
            }
        })
        this.physics.add.collider(this.slime, door2Layer, () => {
            if(coin == 3) {
                coin = 0
                spawnFlag = 'build1'
                this.scene.start('lv1build1textScene')
            }
        })
        this.physics.add.overlap(this.slime, this.coinGroup, (obj1, obj2) => {
            coin++;
            obj2.destroy(); // remove coin on overlap
        });

        this.VEL = 200

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
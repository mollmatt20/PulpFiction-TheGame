class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        // Set keyboard SPACE input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Font config
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '15px',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 300
        }

        // Set text and sound to drop at the same time 
        let sound = this.sound.add('gunclip')
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, ' ', textConfig).setOrigin(0.5)
        this.time.delayedCall(1000, () => {
            sound.play()
            this.screenText.setText('Pulp Fiction')
        })
        this.time.delayedCall(2000, () => {
            sound.play()
            this.screenText.setText('The Game')
        })
        this.time.delayedCall(3000, () => {
            sound.play()
            this.screenText.setText('Press SPACE to play.\nCollect the golden keys\nin each level')
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            spawnFlag = 'menu'
            this.scene.start('menuScene');
        }
    }
}
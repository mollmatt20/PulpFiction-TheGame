class TheEnd extends Phaser.Scene {
    constructor() {
        super('endScene')
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
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, " ", textConfig).setOrigin(0.5)
        let sound = this.sound.add('gunshot')
        this.time.delayedCall(1000, () => {
            sound.play()
        })
        this.time.delayedCall(2000, () => {
            sound.play()
            this.screenText.setText("The End")
        })
        this.time.delayedCall(3000, () => {
            sound.play()
            this.screenText.setText("Press SPACE to play again")
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}
class IntroText extends Phaser.Scene {
    constructor(){
        super('introtextScene')
    }

    create() {
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '15px',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 300
        }

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, 'Hmm..?', textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText('Where am I?')
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText('The hell is this place?\nHow did I end up here?')
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText('I was just taking a shit\nlike 5 minutes ago.')
        })
        this.time.delayedCall(12000, () => {
            this.scene.start('menuScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}
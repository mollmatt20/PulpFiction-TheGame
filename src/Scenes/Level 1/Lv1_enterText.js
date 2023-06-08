class Lv1_enterText extends Phaser.Scene {
    constructor(){
        super('lv1entertextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Alright, now I'm back in LA.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText('Gah.. My head hurts..')
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText('What the hell was that chamber\nI ended up in? And how the hell \ndid that door take me out here?')
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("Ugh.. I don’t understand...")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("I’ll just look for\nsomeone for help.")
        })
        this.time.delayedCall(15000, () => {
            this.scene.start('lv1outScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv1outScene');
        }
    }
}
class Lv1_bathroomText extends Phaser.Scene {
    constructor(){
        super('lv1bathroomtextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "This diner...\nI remember coming here\nwith Jules after\ncleaning up our mess.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText('Looks like the same mess\nfrom the couple that\nheld it up')
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText('I was on the toilet\nwhen it happened.')
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("Some chance for me\nto even catch a break.")
        })
        this.time.delayedCall(12000, () => {
            this.scene.start('lv1bathroomScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv1bathroomScene');
        }
    }
}
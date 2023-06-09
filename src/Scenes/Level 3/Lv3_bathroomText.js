class Lv3_bathroomText extends Phaser.Scene {
    constructor(){
        super('lv3bathroomtextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "...", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("No...")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("I remember what happens\nafter I step out of here.")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("I remember that\nI barely did step out.")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("I always end up here.")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("...")
        })
        this.time.delayedCall(15000, () => {
            this.screenText.setText("What are the chances\nof this happening?")
        })
        this.time.delayedCall(18000, () => {
            this.scene.start('lv3bathroomScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv3bathroomScene');
        }
    }
}
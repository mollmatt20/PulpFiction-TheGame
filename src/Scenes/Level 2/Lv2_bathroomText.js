class Lv2_bathroomText extends Phaser.Scene {
    constructor(){
        super('lv2bathroomtextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Wait.. I know what happens\nwhen I step out of here.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("Mia overdosed and I\ntook her to Lance.")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Why do I remember all the\nbad shit after stepping\nout of a bathroom?")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("...")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("Why does everything go to\nshit after the bathroom?")
        })
        this.time.delayedCall(15000, () => {
            this.scene.start('lv2bathroomScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv2bathroomScene');
        }
    }
}
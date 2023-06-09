class Lv3_enterText extends Phaser.Scene {
    constructor(){
        super('lv3entertextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Ok... this place seems familiar.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("Boss told me Butch\ndouble crossed him.")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Gave me the job\nto take him out.")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("...")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("I don’t remember what\nhappened after that.")
        })
        this.time.delayedCall(15000, () => {
            this.scene.start('lv3outScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv3outScene');
        }
    }
}
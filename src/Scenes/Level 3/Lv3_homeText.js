class Lv3_homeText extends Phaser.Scene {
    constructor(){
        super('lv3hometextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Shit...", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("No...")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Not again...")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("Head doesn’t feel good.")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("Why does it always\nlead back to the bathroom?")
        })
        this.time.delayedCall(15000, () => {
            this.scene.start('lv3homeScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv3homeScene');
        }
    }
}
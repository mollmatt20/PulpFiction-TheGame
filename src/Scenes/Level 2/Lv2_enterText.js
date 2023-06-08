class Lv2_enterText extends Phaser.Scene {
    constructor(){
        super('lv2entertextScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Hmm? Looks like it's night.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("Where's all of this\nleading to anyway?")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Someone put me in\nthis sick game? ")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("Why can't I find my way out?")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("...")
        })
        this.time.delayedCall(15000, () => {
            this.screenText.setText("Man... I would like some\ncoke right about now.")
        })
        this.time.delayedCall(18000, () => {
            this.scene.start('lv2outScene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv2outScene');
        }
    }
}
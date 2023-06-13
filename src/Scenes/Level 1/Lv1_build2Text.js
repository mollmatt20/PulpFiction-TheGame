class Lv1_build2Text extends Phaser.Scene {
    constructor(){
        super('lv1build2textScene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Where’s everyone?", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("Haven’t seen anyone here.\nThis doesn’t make sense.\nWhat the hell man.")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Ugh... Head ain’t taking\nthis well. Gotta wash up")
        })
        this.time.delayedCall(9000, () => {
            this.scene.start('lv1build2Scene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv1build2Scene');
        }
    }
}
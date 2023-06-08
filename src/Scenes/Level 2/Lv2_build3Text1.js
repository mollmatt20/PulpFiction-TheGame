class Lv2_build3Text1 extends Phaser.Scene {
    constructor(){
        super('lv2build3text1Scene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "This restaurant is here too?", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("What's happening?")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Have I just been revisiting\nthese places from that night?")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("But why?")
        })
        this.time.delayedCall(12000, () => {
            this.scene.start('lv2build3Scene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv2build3Scene');
        }
    }
}
class Lv2_build1Text2 extends Phaser.Scene {
    constructor(){
        super('lv2build1text2Scene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Yeah... just need the needle\nBut...", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("Where do I go next?")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("I remember one other job\nI had to do after Jules left.")
        })
        this.time.delayedCall(9000, () => {
            this.scene.start('lv2build1Scene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv2build1Scene');
        }
    }
}
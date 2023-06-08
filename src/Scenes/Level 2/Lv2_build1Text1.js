class Lv2_build1Text1 extends Phaser.Scene {
    constructor(){
        super('lv2build1text1Scene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Hey, this is Lance's place.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("I see the drugs but not him. ")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("I always come right\nhere when I need it.")
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
class Lv2_build2Text1 extends Phaser.Scene {
    constructor(){
        super('lv2build2text1Scene')
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
        
        this.screenText = this.add.text(game.config.width/2, game.config.height/2, "Looks like the boss's home.", textConfig).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            this.screenText.setText("Wait a minute.")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("Yeah, I picked up his wife\nand took her out to dinner.")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("Hell of a night that was.")
        })
        this.time.delayedCall(12000, () => {
            this.scene.start('lv2build2Scene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv2build2Scene');
        }
    }
}
class Lv1_build1Text extends Phaser.Scene {
    constructor(){
        super('lv1build1textScene')
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
            this.screenText.setText("Hey, I recognize this place.")
        })
        this.time.delayedCall(6000, () => {
            this.screenText.setText("This is where Jules and\nI capped those idiots.")
        })
        this.time.delayedCall(9000, () => {
            this.screenText.setText("Looks about the same after\nwe trashed the place.\nJules was really startled\nabout that experience.")
        })
        this.time.delayedCall(12000, () => {
            this.screenText.setText("Jules calls it\n“divine intervention”, huh.")
        })
        this.time.delayedCall(15000, () => {
            this.screenText.setText("Nothing but a miracle.\nHe just had to quit.\nAt least I don’t need to hear\nhis long ass Bible speech.")
        })
        this.time.delayedCall(18000, () => {
            this.screenText.setText("...")
        })
        this.time.delayedCall(21000, () => {
            this.scene.start('lv1build1Scene')
        })
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('lv1build1Scene');
        }
    }
}
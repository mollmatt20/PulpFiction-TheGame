class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '15px',
            color: '#FFFFFF',
            align: 'center',
            fixedWidth: 150
        }

        this.screenText = this.add.text(game.config.width/2, game.config.height/2, 'Pulp Fiction', textConfig).setOrigin(0.5);
        this.time.delayedCall(2000, () => {
            this.screenText.setText('The Game')
        })
        this.time.delayedCall(4000, () => {
            this.screenText.setText('Press up to continue')
        })
        
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            spawnFlag = 'menu'
            this.scene.start('menuScene')
        }
    }
}
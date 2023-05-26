class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys()
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('menuScene')
        }
    }
}
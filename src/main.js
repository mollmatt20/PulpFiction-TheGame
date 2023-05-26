let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    height: 320,
    width: 320,
    scene: [ Load, Title, Menu ]
}

const game = new Phaser.Game(config)

// global var
const centerX = game.config.width/2
const centerY = game.config.height/2
const width = game.config.width
const height = game.config.height
let cursors = null;
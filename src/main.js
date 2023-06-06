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
    scene: [ Load, Title, Menu, Lv1_out, Lv1_Build, Lv2_out, 
        Lv2_build1, Lv2_build2, Lv2_build3, Lv3_out, 
        Lv3_home, Lv3_bathroom 
    ]
}

const game = new Phaser.Game(config)

// global var
const centerX = game.config.width/2
const centerY = game.config.height/2
const width = game.config.width
const height = game.config.height
let cursors = null
let spawnFlag = null
let coin = 0
let key = 0
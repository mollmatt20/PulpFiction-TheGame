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
    scene: [ Load, Title, IntroText, Menu, Lv1_enterText, Lv1_out, Lv1_Build1, Lv1_build1Text, 
        Lv1_build2Text, Lv1_Build2, Lv1_bathroom, Lv1_bathroomText,
        Lv2_enterText, Lv2_out, Lv2_build1Text1, Lv2_build1, Lv2_build2Text1, Lv2_build2, 
        Lv2_build3Text1, Lv2_build3, Lv2_build2Text2, Lv2_build2_noObjects, Lv2_bathroomText, Lv2_bathroom, Lv2_build1Text2, 
        Lv3_enterText, Lv3_out, Lv3_homeText, Lv3_home, Lv3_bathroomText, Lv3_bathroom, TheEnd 
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
let keySPACE = null
let lvCompleted = 0
let key = 0
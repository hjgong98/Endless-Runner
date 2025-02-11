let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
        }
    },
    scene: [ Menu, Play, Instructions, Sprites, Controls, Achievements, Credits]
}
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// global game options
let gameOptions = {
    // Speed of the background scroll (in pixels per frame)
    backgroundScrollSpeed: 1,

    // platform speed range, in pixels per second
    platformSpeedRange: [300, 400],
 
    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],
 
    // platform width range, in pixels
    platformSizeRange: [90, 300],
 
    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-10, 10],
 
    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 10,
 
    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],
 
    // player gravity
    playerGravity: 900,
 
    // player jump force
    jumpForce: 400,
 
    // player starting X position
    playerStartPosition: 200,
 
    // consecutive jumps allowed
    jumps: 2
}

// Reserve keyword bindings
let keyJump
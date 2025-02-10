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

// Global game options
let gameOptions = {
    platformSpeedRange: [300, 400],     // Platform speed range, in pixels per second
    spawnRange: [80, 300],              // Spawn range for platforms
    platformSizeRange: [90, 300],       // Platform width range
    platformHeightRange: [-10, 10],     // Height range between platforms
    platformHeighScale: 10,             // Scale for platform height range
    platformVerticalLimit: [0.4, 0.8],  // Platform max and min height, as screen height ratio
    playerGravity: 900,                 // Player gravity
    jumpForce: 400,                     // Player jump force
    playerStartPosition: 200,           // Player starting X position
    jumps: 2                            // Number of consecutive jumps allowed
}

// Reserve keyword bindings
let keyJump
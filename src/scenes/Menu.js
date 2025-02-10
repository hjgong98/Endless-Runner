class Menu extends Phaser.Scene {
    constructor() {
        super("Menu")
    }

    preload() {
        // load player spritesheets
        this.load.spritesheet('player1', 'assets/sprite 1.png', {
            frameWidth: 16,
            frameHeight: 32
        })
        this.load.spritesheet('player2', 'assets/sprite 2.png', {
            frameWidth: 16,
            frameHeight: 32
        })
        this.load.spritesheet('player3', 'assets/sprite 3.png', {
            frameWidth: 16,
            frameHeight: 32
        })
        this.load.spritesheet('player4', 'assets/sprite 4.png', {
            frameWidth: 16,
            frameHeight: 32
        })
        this.load.spritesheet('player5', 'assets/sprite 5.png', {
            frameWidth: 16,
            frameHeight: 32
        })

        // load backgrounds

        // load platforms
        this.load.image('platform', 'assets/platform.png')

        // load coins / fire

        // load bakground music

    }

    create() {
        // menu UI
        this.add.text(100, 100, 'Main Menu', { fontSize: '32px', fill: '#fff' })

        // go to controls scene
        let controlsButton = this.add.text(100, 175, 'Choose Controls', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Controls')
        })

        // how to play
        let instructionsButton = this.add.text(100, 215, 'Instructions', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Instructions')
        })

        // go to sprite scene
        let spritesButton = this.add.text(100, 255, 'Choose Sprite', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Sprites')
        })

        // go to play scene
        let playButton = this.add.text(100, 295, 'Start Game', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Play')
        })

        // achievements
        let achievementButton = this.add.text(100, 335, 'Achievements', {
            fontSize: '24px',
            fill: '#fff'
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Achievements')
        })

        // credits
        let creditsButton = this.add.text(100, 375, 'Credits', {
            fontSize: '24px',
            fill: '#fff'
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Credits')
        })
    }
}
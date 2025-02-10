class Play extends Phaser.Scene {
    constructor() {
        super("Play")
    }

    preload() {
        // load images
        this.load.image('platform', 'assets/platform.png')
    }

    create() {
        // get the selected sprite
        const selectedSprite = this.registry.get('selectedSprite') || 'player1' // Default to 'player1' if none selected
        const controlScheme = this.registry.get('controls') || 'wasd' // Default to 'wasd' if none selected

        // Set up the player with the selected sprite
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, selectedSprite)
        this.player.setGravityY(gameOptions.playerGravity)
        this.player.setCollideWorldBounds(true)

        // Create player animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(selectedSprite, { start: 0, end: 1 }),
            frameRate: 8
        })
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(selectedSprite, { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        })

        // Play the animation
        this.player.anims.play('run')

        // Set up controls based on the selected scheme
        if (controlScheme === 'wasd') {
            this.cursors = this.input.keyboard.addKeys({
                jump: Phaser.Input.Keyboard.KeyCodes.W
            })
        } else if (controlScheme === 'arrows') {
            this.cursors = this.input.keyboard.addKeys({
                jump: Phaser.Input.Keyboard.KeyCodes.UP
            })
        } else if (controlScheme === 'mouse') {
            this.input.on('pointerdown', () => {
                this.input.on('pointerdown', this.jump, this)
            })
        } else if (controlScheme === 'spacebar') {
            this.cursors = this.input.keyboard.addKeys({
                jump: Phaser.Input.Keyboard.KeyCodes.SPACE
            })
        }

        // Double jump logic
        this.canDoubleJump = false

        // Add a platform
        this.platform = this.physics.add.staticGroup()
        this.platform.create(game.config.width / 2, game.config.height - 50, 'platform') // Adjust position as needed

        // Enable collision between the player and the platform
        this.physics.add.collider(this.player, this.platform)

        // Add a button to return to the Menu
        let menuButton = this.add.text(500, 20, 'Menu', { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Menu')
            })
    }

    update() {
        // Player movement
        if (this.cursors) {
            if ((this.cursors.jump.isDown && this.player.body.touching.down) || 
                (this.cursors.jump.isDown && !this.player.body.touching.down && !this.canDoubleJump)) {
                
                // First jump or double jump
                this.player.setVelocityY(-220)
                this.canDoubleJump = true

                // Stop the run animation and play the idle animation
                this.player.anims.stop()
                this.player.anims.play('run')
            } else if (this.cursors.jump.isDown && this.canDoubleJump) {
                // Double jump
                this.player.setVelocityY(-220)
                this.canDoubleJump = false

                // Stop the run animation and play the idle animation
                this.player.anims.stop()
                this.player.anims.play('run')
            }
        }

        // Mouse movement if control is mouse
        if (this.registry.get('controls') === 'mouse') {
            if (this.input.activePointer.isDown) {
                if (this.player.body.touching.down || !this.canDoubleJump) {
                    this.player.setVelocityY(-220)  // First jump or double jump
                    this.canDoubleJump = true

                    // Stop the run animation and play the idle animation
                    this.player.anims.stop()
                    this.player.anims.play('run')
                } else if (this.canDoubleJump) {
                    this.player.setVelocityY(-220)  // Double jump
                    this.canDoubleJump = false

                    // Stop the run animation and play the idle animation
                    this.player.anims.stop()
                    this.player.anims.play('run')
                }
            }
        }
    }
}
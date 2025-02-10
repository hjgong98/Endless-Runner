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

        // get background sprite
        //this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0,0)

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
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                jump: Phaser.Input.Keyboard.KeyCodes.W
            })
        } else if (controlScheme === 'arrows') {
            this.cursors = this.input.keyboard.addKeys({
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
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
        //this.jumpCount = 0
        //this.maxJumps = 2

        // Add a button to return to the Menu
        let menuButton = this.add.text(500, 20, 'Menu', { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Menu')
            })

        // Platform group and pool
        this.platformGroup = this.add.group({
            removeCallback: (platform) => {
                this.platformPool.add(platform)
            }
        })

        this.platformPool = this.add.group({
            removeCallback: (platform) => {
                this.platformGroup.add(platform)
            }
        })

        // Add the first platform
        this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1])

        // Enable collision between the player and the platforms
        this.physics.add.collider(this.player, this.platformGroup, () => {
            if (!this.player.anims.isPlaying) {
                this.player.anims.play('run')
            }
        })
    }

    update() {
        // shift tile sprite over
        //this.background1.tilePositionX -= .5

        // Player movement (left and right)
        if (this.cursors) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-200) // Move left
                this.player.anims.play('run', true) // Play run animation
                this.player.flipX = true // Flip sprite to face left
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(200) // Move right
                this.player.anims.play('run', true) // Play run animation
                this.player.flipX = false // Flip sprite to face right
            } else {
                this.player.setVelocityX(0) // Stop horizontal movement
                this.player.anims.play('idle', true) // Play idle animation
            }

            // Jump logic
            //if (this.cursors.jump.isDown && this.player.body.touching.down) {
                // First jump (on the ground)
                //this.player.setVelocityY(-gameOptions.jumpForce)
                //this.jumpCount = 1
            //} else if (this.cursors.jump.isDown && !this.player.body.touching.down && this.jumpCount < this.maxJumps) {
                // Double jump (in the air)
                //this.player.setVelocityY(-gameOptions.jumpForce)
                //this.jumpCount++
            //}
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

        // Reset jump count when the player lands on the ground
        //if (this.player.body.touching.down) {
            //this.jumpCount = 0
        //}

        // Mouse movement if control is mouse
        if (this.registry.get('controls') === 'mouse') {
            // Get the pointer's X position
            const pointerX = this.input.activePointer.x

            // Define a dead zone (e.g., 10 pixels) to prevent rapid flipping
            const deadZone = 10

            // Move left if pointer is to the left of the sprite
            if (pointerX < this.player.x - deadZone) {
                this.player.setVelocityX(-200) // Move left
                this.player.anims.play('run', true) // Play run animation
                this.player.flipX = true // Flip sprite to face left
            }
            // Move right if pointer is to the right of the sprite
            else if (pointerX > this.player.x + deadZone) {
                this.player.setVelocityX(200) // Move right
                this.player.anims.play('run', true) // Play run animation
                this.player.flipX = false // Flip sprite to face right
            }
            // Stop moving if pointer is directly on the sprite
            else {
                this.player.setVelocityX(0) // Stop horizontal movement
                this.player.anims.play('idle', true) // Play idle animation
            }

            // jump logic
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

        // Recycling platforms
        let minDistance = game.config.width
        let rightmostPlatformHeight = 0
        this.platformGroup.getChildren().forEach((platform) => {
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2
            if (platformDistance < minDistance) {
                minDistance = platformDistance
                rightmostPlatformHeight = platform.y
            }
            if (platform.x < -platform.displayWidth / 2) {
                this.platformGroup.killAndHide(platform)
                this.platformGroup.remove(platform)
            }
        })

        // Adding new platforms
        if (minDistance > this.nextPlatformDistance) {
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1])
            let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1])
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0]
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1]
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight)
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight)
        }
    }

    // Function to add a platform
    addPlatform(platformWidth, posX, posY) {
        let platform
        if (this.platformPool.getLength()) {
            platform = this.platformPool.getFirst()
            platform.x = posX
            platform.y = posY
            platform.active = true
            platform.visible = true
            this.platformPool.remove(platform)
        } else {
            platform = this.physics.add.sprite(posX, posY, 'platform')
            platform.setImmovable(true) // Make the platform immovable
            platform.setGravityY(0) // Disable gravity for the platform
            platform.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1) // Move platform to the left
            this.platformGroup.add(platform)
        }
        platform.displayWidth = platformWidth
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1])
    }
}
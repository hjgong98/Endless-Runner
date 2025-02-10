class Sprites extends Phaser.Scene {
    constructor() {
        super("Sprites");
    }

    create() {
        // Title
        this.add.text(100, 50, 'Choose Your Sprite', { fontSize: '32px', fill: '#fff' })

        // display 5 sprites
        const sprite1 = this.add.sprite(100, 150, 'player1').setInteractive()
        const sprite2 = this.add.sprite(200, 150, 'player2').setInteractive()
        const sprite3 = this.add.sprite(300, 150, 'player3').setInteractive()
        const sprite4 = this.add.sprite(400, 150, 'player4').setInteractive()
        const sprite5 = this.add.sprite(500, 150, 'player5').setInteractive()

        // add movement
        this.anims.create({
            key: 'moving1',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moving2',
            frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moving3',
            frames: this.anims.generateFrameNumbers('player3', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moving4',
            frames: this.anims.generateFrameNumbers('player4', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moving5',
            frames: this.anims.generateFrameNumbers('player5', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        
        sprite1.play('moving1')
        sprite2.play('moving2')
        sprite3.play('moving3')
        sprite4.play('moving4')
        sprite5.play('moving5')

        // chose a sprite
        sprite1.on('pointerdown', () => this.selectSprite('player1'))
        sprite2.on('pointerdown', () => this.selectSprite('player2'))
        sprite3.on('pointerdown', () => this.selectSprite('player3'))
        sprite4.on('pointerdown', () => this.selectSprite('player4'))
        sprite5.on('pointerdown', () => this.selectSprite('player5'))
    }

    selectSprite(spriteKey) {
        // Save the selected sprite key to the registry
        this.registry.set('selectedSprite', spriteKey)

        // Go to the Play scene
        this.scene.start('Menu')
    }
}
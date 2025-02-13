class Credits extends Phaser.Scene {
    constructor() {
        super("Credits")
    }

    create() {
        this.add.text(100, 100, 'Credits', { fontSize: '32px', fill: '#fff' })

        this.add.text(100, 200, 'background images downloaded for free from https://craftpix.net/file-licenses/', {fontSize: '24px', fill: '#fff'})

        // back button
        let backButton = this.add.text(100, 300, 'Back to Menu', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Menu')
        })
    }
}
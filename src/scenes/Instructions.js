class Instructions extends Phaser.Scene {
    constructor() {
        super("Instructions")
    }

    create() {
        // title
        this.add.text(100, 100, 'Instructions', { fontSize: '32px', fill: '#fff' })

        // get selected contol scheme from registry
        const controlScheme = this.registry.get('controls') || 'wasd' // Default to 'wasd' if none selected

        // display instructions based on control scheme
        if (controlScheme === 'wasd') {
            this.add.text(100, 200, 'Use WASD to move.\nPress W to jump.', { fontSize: '24px', fill: '#fff' })
        } else if (controlScheme === 'arrows') {
            this.add.text(100, 200, 'Use Arrow Keys to move.\nPress UP to jump.', { fontSize: '24px', fill: '#fff' })
        } else if (controlScheme === 'mouse') {
            this.add.text(100, 200, 'Use mouse to move.\nLeft click to jump.', { fontSize: '24px', fill: '#fff' })
        } else if (controlScheme === 'spacebar') {
            this.add.text(100, 200, 'Use Arrow Keys to move.\nPress SPACE to jump.', { fontSize: '24px', fill: '#fff' })
        }


        // Button to return to the Menu
        let menuButton = this.add.text(100, 250, 'Back to Menu', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Menu')
        })
    }
}
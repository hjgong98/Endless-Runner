class Achievements extends Phaser.Scene {
    constructor() {
        super("Achievements")
    }

    create() {
        this.add.text(100, 100, 'Achievements', { fontSize: '32px', fill: '#fff' })

        // Get the longest time from the registry
        const longestTime = this.registry.get('longestTime') || 0


        // Convert seconds to minutes and seconds
        const minutes = Math.floor(longestTime / 60)
        const seconds = longestTime % 60

        // Display the longest time survived
        this.add.text(100, 200, `Longest Time Survived: ${minutes}m ${seconds}s`, { 
            fontSize: '24px', 
            fill: '#fff' 
        })

        // back button
        let backButton = this.add.text(100, 300, 'Back to Menu', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setInteractive().on('pointerdown', () => {
            this.scene.start('Menu')
        })
    }
}
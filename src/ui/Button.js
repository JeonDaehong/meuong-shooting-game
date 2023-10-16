import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Text {
    constructor(x, y, label, scene, callback) {
        super(scene, x, y, label);

        this.setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: "#3A7D46", fontSize: 20 })
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => callback())
            .on("pointerover", () => {
                this.setStyle({ fill: "#000" });
                this.playHoverSound(scene);
            })
            .on("pointerout", () => this.setStyle({ fill: "#fff" }));

        scene.add.existing(this);
    }

    playHoverSound(scene) {
        const hoverSound = scene.sound.add("buttonHoverSound");
        hoverSound.play();
        hoverSound.setVolume(0.2);
    }
}
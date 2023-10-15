import Phaser from "phaser";
import Config from "../Config";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    create() {
        this.add.graphics()
            .fillStyle(0xbbdefb)
            .fillRect(0, 0, Config.width, Config.height)
            .setScrollFactor(0);

        this.add
            .bitmapText(Config.width / 2, 150, "pixelFont", "Meuong Shooting Game!", 60)
            .setOrigin(0.5);

        this.add
            .sprite(Config.width / 2, Config.height / 2, "player")
            .setScale(4)
            .play("player");
    }
}
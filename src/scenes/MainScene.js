import Phaser from "phaser";
import Config from "../Config";

export default class MainScene extends Phaser.Scene {

    constructor() {
        super("mainScene");
    }

    create() {

    let mainMoveSprite;

        this.add.graphics()
            .fillStyle(0x3A9B4C)
            .fillRect(0, 0, Config.width, Config.height)
            .setScrollFactor(0);

        this.add
            .bitmapText(Config.width / 2, 150, "pixelFont", "Meuong Shooting Game!", 80)
            .setOrigin(0.5)
            .setTint(0xC7FFD0);

        mainMoveSprite = this.add
            .sprite(Config.width / 2, (Config.height / 2) + 20, "mainMove")
            .setScale(0.8)
            .play("main_move");

        this.mainMoveFunction(mainMoveSprite);

    }

    mainMoveFunction(mainMoveSprite) {
        this.time.addEvent({
            delay: 3000, // 3초
            callback: () => {
                mainMoveSprite.destroy();
                mainMoveSprite = this.add
                                    .sprite(Config.width / 2, (Config.height / 2) + 20, "mainMove")
                                    .setScale(0.8)
                                    .play("main_move");
            },
            callbackScope: this,
            loop: true // 반복
        });
        this.time.addEvent({
            delay: 6000, // 5초
            callback: () => {
                mainMoveSprite.destroy();
                mainMoveSprite = this.add
                                    .sprite(Config.width / 2, (Config.height / 2) + 20, "mainAttack")
                                    .setScale(0.8)
                                    .play("main_attack");
            },
            callbackScope: this,
            loop: true // 반복
        });
    }
}
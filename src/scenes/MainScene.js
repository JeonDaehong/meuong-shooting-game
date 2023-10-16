import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";

export default class MainScene extends Phaser.Scene {

    constructor() {
        super("mainScene");
    }

    create() {

        let mainMoveSprite;
        let extraButtonMessage = false;

        // Sound
        this.sound.pauseOnBlur = false;
        this.mainBackgroundMusic = this.sound.add("mainBackgroundMusic");
        this.mainBackgroundMusic.play();
        this.mainBackgroundMusic.setVolume(0.15);
        this.mainBackgroundMusic.on('complete', () => {
            this.mainBackgroundMusic.play();
        });

        this.add.graphics()
            .fillStyle(0x3A9B4C)
            .fillRect(0, 0, Config.width, Config.height)
            .setScrollFactor(0);

        this.add
            .bitmapText(Config.width / 2, 110, "pixelFont", "Meuong Shooting Game!", 100)
            .setOrigin(0.5)
            .setTint(0xC7FFD0);

        mainMoveSprite = this.add
            .sprite(Config.width / 2, (Config.height / 2) - 50, "mainMove")
            .setScale(0.8)
            .play("main_move");
        this.mainMoveFunction(mainMoveSprite);

        let popupText = this.add
            .bitmapText(Config.width / 2, Config.height / 2, "pixelFont", "You must clear the Hard Level\n\n      to play the Extra Level.", 50)
            .setOrigin(0.5)
            .setTint(0xFFF010);
            
        popupText.setDepth(50)
        popupText.setOrigin(0.5);
        popupText.setAlpha(0); // 초기에는 투명 상태로 시작

        new Button(
            Config.width / 2,
            Config.height / 2 + 130,
            " Easy Level Play ",
            this,
            () => {
                this.scene.start("stage1_easyScene")
                this.buttonSound();
                this.mainBackgroundMusic.stop();
            }
        );

        new Button(
            Config.width / 2,
            Config.height / 2 + 200,
            " Hard Level Play ",
            this,
            () => {
                this.scene.start("stage1_hardScene")
                this.buttonSound();
                this.mainBackgroundMusic.stop();
            }
        );

        new Button(
            Config.width / 2,
            Config.height / 2 + 270,
            " Extra Level Play ",
            this,
            () => { 
                    if (!extraButtonMessage) {
                        this.tweens.add({
                            targets: [popupText],
                            alpha: 1,
                            duration: 500,
                        });
                        this.time.addEvent({
                            delay: 2000,
                            callback: () => {
                                this.tweens.add({
                                    targets: [popupText],
                                    alpha: 0,
                                    duration: 500,
                                });
                                extraButtonMessage = false;
                            },
                            callbackScope: this,
                        });
                        extraButtonMessage = true;
                        this.buttonSound();
                    }
                }
        );
    }

    mainMoveFunction(mainMoveSprite) {
        this.time.addEvent({
            delay: 3000, // 3초
            callback: () => {
                mainMoveSprite.destroy();
                mainMoveSprite = this.add
                                    .sprite(Config.width / 2, (Config.height / 2) - 50, "mainMove")
                                    .setScale(0.8)
                                    .setDepth(20)
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
                                    .sprite(Config.width / 2, (Config.height / 2) - 50, "mainAttack")
                                    .setScale(0.8)
                                    .setDepth(20)
                                    .play("main_attack");
            },
            callbackScope: this,
            loop: true // 반복
        });
    }

    buttonSound() {
        this.buttonClickSound = this.sound.add("buttonClickSound");
        this.buttonClickSound.play();
        this.buttonClickSound.setVolume(0.2);
    }
}
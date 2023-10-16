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
            .bitmapText(Config.width / 2, 100, "pixelFont", "Meuong Shooting Game!", 80)
            .setOrigin(0.5)
            .setTint(0xC7FFD0);

        mainMoveSprite = this.add
            .sprite(Config.width / 2, (Config.height / 2) - 50, "mainMove")
            .setScale(0.8)
            .play("main_move");

        this.mainMoveFunction(mainMoveSprite);

        new Button(
            Config.width / 2,
            Config.height / 2 + 110,
            "Easy Level Play",
            this,
            () => this.scene.start("stage1_easyScene")
        );

        new Button(
            Config.width / 2,
            Config.height / 2 + 170,
            "Hard Level Play",
            this,
            () => this.scene.start("stage1_hardScene")
        );

        new Button(
            Config.width / 2,
            Config.height / 2 + 230,
            "Extra Level Play",
            this,
            () => { 
                    if (!extraButtonMessage) {
                        this.tweens.add({
                            targets: [popupText],
                            alpha: 1,
                            duration: 500,
                        });
                        this.time.addEvent({
                            delay: 3000,
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
                    }
                }
        );
        
        let popupText = this.add.text(Config.width / 2, Config.height / 2, "Extra Level은 Hard Level을\n\n 클리어 하셔야지만\n\n 플레이 가능합니다.", {
            fontSize: "20px",
            color: "#ffffff",
            align: "center",
        });
        popupText.setDepth(50)
        popupText.setOrigin(0.5);
        popupText.setAlpha(0); // 초기에는 투명 상태로 시작

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

    createPopUp() {
    }
}
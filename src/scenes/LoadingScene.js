import Phaser from "phaser";
import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";
import mainAttackImg from "../assets/spritesheets/MAIN_ATT.png";
import mainMoveImg from "../assets/spritesheets/MAIN_MOVE.png";
import mainBackgroundMusic from "../assets/sounds/MainBackgroundMusic.mp3";
import buttonHoverSound from "../assets/sounds/ButtonHoverSound.mp3";
import buttonClickSound from "../assets/sounds/ButtonClickSound.mp3";
import Stage1_Music from "../assets/sounds/1Stage_Music.mp3";
import playerIdleLeftImg from "../assets/spritesheets/playerIdleLeft.png";
import playerMoveDownImg from "../assets/spritesheets/playerMoveDown.png";
import playerMoveLeftImg from "../assets/spritesheets/playerMoveLeft.png";
import playerMoveUpImg from "../assets/spritesheets/playerMoveUp.png";
import playerAttackDownImg from "../assets/spritesheets/playerAttackDown.png";
import playerAttackLeftImg from "../assets/spritesheets/playerAttackLeft.png";
import playerAttackUpImg from "../assets/spritesheets/playerAttackUp.png";
import stage1BgImg1 from "../assets/images/Stage1_Background.png";
import stage1BgImg2 from "../assets/images/Stage1_Background2.png";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {

        // BackGround
        this.load.image("stage1BgImg1", stage1BgImg1);
        this.load.image("stage1BgImg2", stage1BgImg2);

        // FONT
        this.load.bitmapFont("pixelFont", fontPng, fontXml);

        // SPRITESHEETS
        this.load.spritesheet("mainAttack", mainAttackImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("mainMove", mainMoveImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerIdleLeft", playerIdleLeftImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerMoveDown", playerMoveDownImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerMoveLeft", playerMoveLeftImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerMoveUp", playerMoveUpImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerAttackDown", playerAttackDownImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerAttackLeft", playerAttackLeftImg, {
            frameWidth: 422,
            frameHeight: 424,
        });
        this.load.spritesheet("playerAttackUp", playerAttackUpImg, {
            frameWidth: 422,
            frameHeight: 424,
        });

        // AUDIOS
        this.load.audio("mainBackgroundMusic", mainBackgroundMusic);
        this.load.audio("buttonHoverSound", buttonHoverSound);
        this.load.audio("buttonClickSound", buttonClickSound);
        this.load.audio("Stage1_Music", Stage1_Music);
    }

    create() {
        
        this.add.text(20, 20, "Loading game...");

        // MAIN
        this.anims.create({
            key: "main_attack",
            frames: this.anims.generateFrameNumbers("mainAttack"),
            frameRate: 18,
            repeat: -1,
        });
        this.anims.create({
            key: "main_move",
            frames: this.anims.generateFrameNumbers("mainMove"),
            frameRate: 18,
            repeat: -1,
        });

        // Player Action
        this.anims.create({
            key: "player_idleLeft",
            frames: this.anims.generateFrameNumbers("playerIdleLeft"),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player_idleUp",
            frames: this.anims.generateFrameNumbers("playerMoveUp", {
                start: 0,
                end: 0,}),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player_idleDown",
            frames: this.anims.generateFrameNumbers("playerMoveDown", {
                start: 0,
                end: 0,}),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player_moveDown",
            frames: this.anims.generateFrameNumbers("playerMoveDown"),
            frameRate: 18,
            repeat: -1,
        });
        this.anims.create({
            key: "player_moveLeft",
            frames: this.anims.generateFrameNumbers("playerMoveLeft"),
            frameRate: 18,
            repeat: -1,
        });
        this.anims.create({
            key: "player_moveUp",
            frames: this.anims.generateFrameNumbers("playerMoveUp"),
            frameRate: 18,
            repeat: -1,
        });
        this.anims.create({
            key: "player_attackDown",
            frames: this.anims.generateFrameNumbers("playerAttackDown"),
            frameRate: 18,
            repeat: -1,
        });
        this.anims.create({
            key: "player_attackLeft",
            frames: this.anims.generateFrameNumbers("playerAttackLeft"),
            frameRate: 18,
            repeat: -1,
        });
        this.anims.create({
            key: "player_attackUp",
            frames: this.anims.generateFrameNumbers("playerAttackUp"),
            frameRate: 18,
            repeat: -1,
        });

        this.scene.start("mainScene");
    }
}
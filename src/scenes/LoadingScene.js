import Phaser from "phaser";
import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";
import mainAttackImg from "../assets/spritesheets/MAIN_ATT.png";
import mainMoveImg from "../assets/spritesheets/MAIN_MOVE.png";
import mainBackgroundMusic from "../assets/sounds/MainBackgroundMusic.mp3";
import buttonHoverSound from "../assets/sounds/ButtonHoverSound.mp3";
import buttonClickSound from "../assets/sounds/ButtonClickSound.mp3";
import Stage1_Music from "../assets/sounds/1Stage_Music.mp3";
import PlayerAttackSound from "../assets/sounds/PlayerAttackSound.mp3";
import playerIdleLeftImg from "../assets/spritesheets/playerIdleLeft.png";
import playerIdleUpImg from "../assets/spritesheets/playerIdleUp.png";
import playerIdleDownImg from "../assets/spritesheets/playerIdleDown.png";
import playerMoveDownImg from "../assets/spritesheets/playerMoveDown.png";
import playerMoveLeftImg from "../assets/spritesheets/playerMoveLeft.png";
import playerMoveUpImg from "../assets/spritesheets/playerMoveUp.png";
import playerAttackDownImg from "../assets/spritesheets/playerAttackDown.png";
import playerAttackLeftImg from "../assets/spritesheets/playerAttackLeft.png";
import playerAttackUpImg from "../assets/spritesheets/playerAttackUp.png";
import stage1BgImg1 from "../assets/images/Stage1_Background.png";
import stage1BgImg2 from "../assets/images/Stage1_Background2.png";
import playerBulletImgLeft from "../assets/images/PlayerAttack1.png";
import playerBulletImgRight from "../assets/images/PlayerAttack2.png";
import playerBulletImgUp from "../assets/images/PlayerAttack3.png";
import playerBulletImgDown from "../assets/images/PlayerAttack4.png";
import pauseSound from "../assets/sounds/PauseSound.mp3";
import unPauseSound from "../assets/sounds/UnPauseSound.mp3";
import stage1BossPhase1IdleImg from "../assets/spritesheets/Stage1_Boss_Phase1_Idle.png";
import stage1BossPhase1LeftHandIdleImg from "../assets/spritesheets/Stage1_Boss_Phase1_LeftHand_Idle.png";
import stage1BossPhase1RightHandIdleImg from "../assets/spritesheets/Stage1_Boss_Phase1_RightHand_Idle.png";
import explosionOgg from "../assets/sounds/explosion.ogg";
import explosionImg from "../assets/spritesheets/explosionImg.png";
import enemy1Img from "../assets/spritesheets/Enemy1_angry.png";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {

        // BackGround
        this.load.image("stage1BgImg1", stage1BgImg1);
        this.load.image("stage1BgImg2", stage1BgImg2);

        // Bullet
        this.load.image("playerBulletleft", playerBulletImgLeft);
        this.load.image("playerBulletRight", playerBulletImgRight);
        this.load.image("playerBulletUp", playerBulletImgUp);
        this.load.image("playerBulletDown", playerBulletImgDown);

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
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerIdleUp", playerIdleUpImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerIdleDown", playerIdleDownImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerMoveDown", playerMoveDownImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerMoveLeft", playerMoveLeftImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerMoveUp", playerMoveUpImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerAttackDown", playerAttackDownImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerAttackLeft", playerAttackLeftImg, {
            frameWidth: 465,
            frameHeight: 466,
        });
        this.load.spritesheet("playerAttackUp", playerAttackUpImg, {
            frameWidth: 465,
            frameHeight: 466,
        });

        // Enemy
        this.load.spritesheet("stage1BossPhase1Idle", stage1BossPhase1IdleImg, {
            frameWidth: 360,
            frameHeight: 348,
        });
        this.load.spritesheet("stage1BossPhase1LeftHandIdle", stage1BossPhase1LeftHandIdleImg, {
            frameWidth: 212,
            frameHeight: 216,
        });
        this.load.spritesheet("stage1BossPhase1RightHandIdle", stage1BossPhase1RightHandIdleImg, {
            frameWidth: 212,
            frameHeight: 216,
        });

        this.load.spritesheet("enemy1", enemy1Img, {
            frameWidth: 149,
            frameHeight: 152,
        });

        // EFFECT
        this.load.spritesheet("explosion", explosionImg, {
            frameWidth: 388,
            frameHeight: 382,
        });


        // AUDIOS
        this.load.audio("mainBackgroundMusic", mainBackgroundMusic);
        this.load.audio("buttonHoverSound", buttonHoverSound);
        this.load.audio("buttonClickSound", buttonClickSound);
        this.load.audio("Stage1_Music", Stage1_Music);
        this.load.audio("PlayerAttackSound", PlayerAttackSound);
        this.load.audio("pauseSound", pauseSound);
        this.load.audio("unPauseSound", unPauseSound);
        this.load.audio("audio_explosion", explosionOgg);
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
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "player_idleUp",
            frames: this.anims.generateFrameNumbers("playerIdleUp"),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "player_idleDown",
            frames: this.anims.generateFrameNumbers("playerIdleDown"),
            frameRate: 15,
            repeat: -1,
        });
        this.anims.create({
            key: "player_moveDown",
            frames: this.anims.generateFrameNumbers("playerMoveDown"),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: "player_moveLeft",
            frames: this.anims.generateFrameNumbers("playerMoveLeft"),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: "player_moveUp",
            frames: this.anims.generateFrameNumbers("playerMoveUp"),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: "player_attackDown",
            frames: this.anims.generateFrameNumbers("playerAttackDown"),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: "player_attackLeft",
            frames: this.anims.generateFrameNumbers("playerAttackLeft"),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: "player_attackUp",
            frames: this.anims.generateFrameNumbers("playerAttackUp"),
            frameRate: 30,
            repeat: -1,
        });

        // EFFECT
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });

        // Boss
        this.anims.create({
            key: "stage1_boss_1phase_idle",
            frames: this.anims.generateFrameNumbers("stage1BossPhase1Idle"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "stage1_boss_1phase_leftHand_idle",
            frames: this.anims.generateFrameNumbers("stage1BossPhase1LeftHandIdle"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "stage1_boss_1phase_rightHand_idle",
            frames: this.anims.generateFrameNumbers("stage1BossPhase1RightHandIdle"),
            frameRate: 20,
            repeat: -1,
        });

        // Enemy
        this.anims.create({
            key: "enemy1_move",
            frames: this.anims.generateFrameNumbers("enemy1"),
            frameRate: 20,
            repeat: -1,
        });

        this.scene.start("mainScene");
    }
}
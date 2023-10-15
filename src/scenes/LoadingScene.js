import Phaser from "phaser";

import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";

import mainAttackImg from "../assets/spritesheets/MAIN_ATT.png";
import mainMoveImg from "../assets/spritesheets/MAIN_MOVE.png";
import player from "../assets/spritesheets/player.png";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {

        // FONT
        this.load.bitmapFont("pixelFont", fontPng, fontXml);

        // SPRITESHEETS
        this.load.spritesheet("mainAttack", mainAttackImg, {
            frameWidth: 32,
            frameHeight: 36,
        });
        this.load.spritesheet("mainMove", mainMoveImg, {
            frameWidth: 32,
            frameHeight: 36,
        });
        this.load.spritesheet("player", player, {
            frameWidth: 32,
            frameHeight: 36,
        });
    }

    create() {
        
        this.add.text(20, 20, "Loading game...");

        // MAIN
        this.anims.create({
            key: "main_attack",
            frames: this.anims.generateFrameNumbers("mainAttack"),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "main_move",
            frames: this.anims.generateFrameNumbers("mainMove"),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "player",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.start("mainScene");
    }
}
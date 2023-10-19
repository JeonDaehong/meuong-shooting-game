import Phaser from "phaser";
import Config from "../Config";

export default class Stage1_Boss extends Phaser.Physics.Arcade.Sprite {

    constructor(scene) {
        super(scene, (Config.width / 2), (Config.height / 2) - 200);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(30);
        this.scale = 1;
        this.m_speed = 50;
        this.m_hp = 10000;
        this.m_canBeAttacked = true;
        this.setBodySize(165, 290);
        this.setOffset(100, 20);
        this.m_isDead = false;

    }

}
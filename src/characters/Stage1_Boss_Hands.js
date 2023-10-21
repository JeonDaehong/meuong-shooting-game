import Phaser from "phaser";
import Config from "../Config";

export default class Stage1_Boss_Hands extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth(30);
        this.scale = 1;
        this.m_speed = 50;
        this.m_hp = 10000;
        this.m_canBeAttacked = true;
        this.setBodySize(130, 130);
        this.setOffset(50, 35);
        this.m_isDead = false;

    }

}
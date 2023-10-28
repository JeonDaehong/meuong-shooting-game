import Phaser from "phaser";
import Config from "../Config";
export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene) {

        super(scene, (Config.width / 2), (Config.height / 2) + 200, "player");
            scene.add.existing(this);
            scene.physics.add.existing(this);

        this.scale = 0.5;
        this.setDepth(20);
        this.setBodySize(60, 150);
        this.setOffset(180, 140);
        this.m_moving = false;
        this.m_attack = false;
        this.m_canBeAttacked = true;
        this.m_speed = 7;

        this.currentDirection = 1; // 1 : 좌, 2 : 우, 3 : 상, 4 : 하

    }

    move(vector) {

        this.x += vector[0] * this.m_speed;
        this.y += vector[1] * this.m_speed;

        if (vector[0] === -1) this.flipX = false;
        else if (vector[0] === 1) this.flipX = true;
    }

}
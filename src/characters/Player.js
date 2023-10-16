import Phaser from "phaser";
import Config from "../Config";
export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene) {

        super(scene, (Config.width / 2), (Config.height / 2) + 200, "player");
            scene.add.existing(this);
            scene.physics.add.existing(this);

        this.scale = 0.5;
        this.setDepth(20);
        this.setBodySize(168, 170);
        this.m_moving = false;
        this.m_canBeAttacked = true;

    }

    move(vector) {

        let PLAYER_SPEED = 5;

        this.x += vector[0] * PLAYER_SPEED;
        this.y += vector[1] * PLAYER_SPEED;

        if (vector[0] === -1) this.flipX = false;
        else if (vector[0] === 1) this.flipX = true;
    }

}
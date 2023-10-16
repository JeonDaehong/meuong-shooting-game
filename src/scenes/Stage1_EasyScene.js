import Phaser from "phaser";
import Player from "../characters/Player";
import Config from "../Config";

export default class Stage1_EasyScene extends Phaser.Scene {
    constructor() {
        super("stage1_easyScene");
    }

    create() {
        this.m_player = new Player(this);
		this.m_cursorKeys = this.input.keyboard.createCursorKeys();
        this.m_player.play("player_idleLeft");
    }

    update() {
        this.movePlayerManager();

    }

    movePlayerManager() {
        if (this.m_cursorKeys.left.isDown || this.m_cursorKeys.right.isDown || this.m_cursorKeys.up.isDown || this.m_cursorKeys.down.isDown) {
            if (!this.m_player.m_moving) {
                this.m_player.play("player_moveLeft");
            }
            this.m_player.m_moving = true;
        } else {
            if (this.m_player.m_moving) {
                this.m_player.play("player_idleLeft");
            }
            this.m_player.m_moving = false;
        }
        let vector = [0, 0];
        if (this.m_cursorKeys.left.isDown) {
            vector[0] += -1;
        } else if (this.m_cursorKeys.right.isDown) {
            vector[0] += 1;
        }
        if (this.m_cursorKeys.up.isDown) {
            vector[1] += -1;
        } else if (this.m_cursorKeys.down.isDown) {
            vector[1] += 1;
        }
        this.m_player.move(vector);
    }
}
import Phaser from "phaser";
import Player from "../characters/Player";
import Config from "../Config";

export default class Stage1_EasyScene extends Phaser.Scene {
    constructor() {
        super("stage1_easyScene");
    }

    create() {
        this.m_player = new Player(this);
        this.m_player.play("player_idleLeft");
		this.m_cursorKeys = this.input.keyboard.createCursorKeys();

        this.add.graphics()
            .fillStyle(0x000000)
            .fillRect(0, 0, Config.width, Config.height)
            .setScrollFactor(0);

        // Sound
        this.sound.pauseOnBlur = false;
        this.mainBackgroundMusic = this.sound.add("Stage1_Music");
        this.mainBackgroundMusic.play();
        this.mainBackgroundMusic.setVolume(0.1);
        this.mainBackgroundMusic.on('complete', () => {
            this.mainBackgroundMusic.play();
        });

        // BackGround
        const backgroundImage2 = this.add.image(Config.width/2, (Config.height/2) - 150, 'stage1BgImg2');
        const backgroundImage1 = this.add.image(Config.width/2, Config.height/2, 'stage1BgImg1');
    }

    update() {
        this.motionPlayerManager();

    }

    motionPlayerManager() {

        const thisSceneMaxLeftCoordinate = 30;
        const thisSceneMaxRightCoordinate = 1250;
        const thisSceneMaxUpCoordinate = 430;
        const thisSceneMaxDownCoordinate = 665;

        // Attack
        if (this.m_cursorKeys.space.isDown) {
            if ( this.m_player.currentDirection == 1 || this.m_player.currentDirection == 2) {
                if (!this.m_player.m_attack) {
                    this.m_player.play("player_attackLeft");
                }
            } else if ( this.m_player.currentDirection == 3) {
                if (!this.m_player.m_attack) {
                    this.m_player.play("player_attackUp");
                }
            } else if ( this.m_player.currentDirection == 4) {
                if (!this.m_player.m_attack) {
                    this.m_player.play("player_attackDown");
                }
            }
            this.m_player.m_attack = true;
        } else {
            if (this.m_player.m_attack) {
                if ( this.m_player.currentDirection == 1 || this.m_player.currentDirection == 2) {
                    this.m_player.play("player_idleLeft");
                } else if ( this.m_player.currentDirection == 3) {
                    this.m_player.play("player_idleUp");
                } else if ( this.m_player.currentDirection == 4) {
                    this.m_player.play("player_idleDown");
                }
                this.m_player.m_attack = false;
            }
        }

        // Move
        if (this.m_cursorKeys.left.isDown) {
            this.m_player.currentDirection = 1;
            if (!this.m_player.m_moving) {
                this.m_player.play("player_moveLeft");
            }
            this.m_player.m_moving = true;
        } else if (this.m_cursorKeys.right.isDown) {
            this.m_player.currentDirection = 2;
            if (!this.m_player.m_moving) {
                this.m_player.play("player_moveLeft");
            }
            this.m_player.m_moving = true;
        } else if (this.m_cursorKeys.up.isDown) {
            this.m_player.currentDirection = 3;
            if (!this.m_player.m_moving) {
                this.m_player.play("player_moveUp");
            }
            this.m_player.m_moving = true;
        } else if (this.m_cursorKeys.down.isDown) {
            this.m_player.currentDirection = 4;
            if (!this.m_player.m_moving) {
                this.m_player.play("player_moveDown");
            }
            this.m_player.m_moving = true;
        } else {
            if (this.m_player.m_moving) {
                if ( this.m_player.currentDirection == 1 || this.m_player.currentDirection == 2) {
                    this.m_player.play("player_idleLeft");
                } else if ( this.m_player.currentDirection == 3) {
                    this.m_player.play("player_idleUp");
                } else if ( this.m_player.currentDirection == 4) {
                    this.m_player.play("player_idleDown");
                }
                this.m_player.m_moving = false;
            }
        }

        let vector = [0, 0];

        if (this.m_cursorKeys.left.isDown) {
            vector[0] += -1;
            if (this.m_player.x <= thisSceneMaxLeftCoordinate) this.m_player.x += this.m_player.m_speed;
        } else if (this.m_cursorKeys.right.isDown) {
            vector[0] += 1;
            if (this.m_player.x >= thisSceneMaxRightCoordinate) this.m_player.x -= this.m_player.m_speed;
        }
        if (this.m_cursorKeys.up.isDown) {
            vector[1] += -1;
            if (this.m_player.y <= thisSceneMaxUpCoordinate) this.m_player.y += this.m_player.m_speed;
        } else if (this.m_cursorKeys.down.isDown) {
            vector[1] += 1;
            if (this.m_player.y >= thisSceneMaxDownCoordinate) this.m_player.y -= this.m_player.m_speed;
        }

        this.m_player.move(vector);
    }
}
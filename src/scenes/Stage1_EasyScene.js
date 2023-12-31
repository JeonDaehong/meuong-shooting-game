import Phaser from "phaser";
import Player from "../characters/Player";
import Config from "../Config";
import { pause } from "../utils/pauseManager";
import Stage1_Boss from '../characters/Stage1_Boss';
import Stage1_Boss_Hands from '../characters/Stage1_Boss_Hands';
import Mob from "../characters/Mob";
import { addMob, addMobEvent, removeOldestMobEvent } from "../utils/mobManager";
import { doAttackOneSet } from "../utils/attackManager";

export default class Stage1_EasyScene extends Phaser.Scene {
    constructor() {
        super("stage1_easyScene");
    }

    create() {

        const canvas = this.sys.canvas;
        canvas.style.cursor = "none";

        this.m_player = new Player(this);
        this.m_player.play("player_idleLeft");
		this.m_cursorKeys = this.input.keyboard.createCursorKeys();

        this.playerAttackSound = this.sound.add("PlayerAttackSound");

        this.boss = new Stage1_Boss(this);
        this.boss.play("stage1_boss_1phase_idle");
        this.bossLeftHand = new Stage1_Boss_Hands(this, (Config.width / 2) - 180, (Config.height / 2) - 200);
        this.bossLeftHand.play("stage1_boss_1phase_leftHand_idle");
        this.bossRightHand = new Stage1_Boss_Hands(this, (Config.width / 2) + 160, (Config.height / 2) - 200);
        this.bossRightHand.play("stage1_boss_1phase_rightHand_idle");

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
        this.m_pauseInSound = this.sound.add("pauseSound");
        this.m_pauseOutSound = this.sound.add("unPauseSound");

        // Player Attack
        this.m_weaponDynamic = this.add.group();
        this.m_weaponStatic = this.add.group();
        this.m_attackEvents = {};

        // BackGround
        const backgroundImage2 = this.add.image(Config.width/2, (Config.height/2) - 150, 'stage1BgImg2');
        const backgroundImage1 = this.add.image(Config.width/2, (Config.height/2) + 70, 'stage1BgImg1');
        
        // Enemy
        this.m_mobs = this.physics.add.group();
        // 맨 처음에 등장하는 몹을 수동으로 추가해줍니다.
        // 추가하지 않으면 closest mob을 찾는 부분에서 에러가 발생합니다.
        this.m_mobs.add(new Mob(this, 1500, 650, "enemy1", "enemy1_move", 10));
        this.m_mobEvents = [];
        addMobEvent(1500, 650, this, 5000, "enemy1", "enemy1_move", 100, 0.8);
        addMobEvent(-500, 650, this, 5000, "enemy1", "enemy1_move", 100, 0.8);
        addMobEvent(1500, 650, this, 10000, "enemy2", "enemy2_move", 100, 0.8);
        addMobEvent(-500, 650, this, 10000, "enemy2", "enemy2_move", 100, 0.8);

        // Pause
        this.input.keyboard.on(
            "keydown-ESC",
            () => { pause(this, "pause"); },
            this
        );
    }

    update() {
        this.motionPlayerManager();

    }

    motionPlayerManager() {

        const thisSceneMaxLeftCoordinate = 30;
        const thisSceneMaxRightCoordinate = 1250;
        const thisSceneMaxUpCoordinate = 500;
        const thisSceneMaxDownCoordinate = 665;

        let keysPressed = [
            this.m_cursorKeys.space.isDown,
            this.m_cursorKeys.left.isDown,
            this.m_cursorKeys.right.isDown,
            this.m_cursorKeys.up.isDown,
            this.m_cursorKeys.down.isDown
        ];
        
        let totalKeysPressed = keysPressed.filter(Boolean).length;

        switch(true){
            case this.m_cursorKeys.space.isDown:
                this.m_player.m_attack = true;
                this.m_player.m_moving = false;
                if (totalKeysPressed !== 1) {
                    if (this.m_player.currentDirection == 1 || this.m_player.currentDirection == 2) {
                        if(this.m_player.anims.currentAnim.key !== 'player_attackLeft')
                            this.m_player.play("player_attackLeft");
                    } else if (this.m_player.currentDirection == 3) {
                        if(this.m_player.anims.currentAnim.key !== 'player_attackUp')
                            this.m_player.play("player_attackUp");
                    } else if (this.m_player.currentDirection == 4) {
                        if(this.m_player.anims.currentAnim.key !== 'player_attackDown')
                            this.m_player.play("player_attackDown");
                    }

                    if(this.m_player.currentDirection == 1){
                        doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletleft");
                    }
                    if(this.m_player.currentDirection == 2){
                        doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletRight");
                    }
                    if ( this.m_player.currentDirection == 3){
                            doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletUp");
                    }
                    if(this.m_player.currentDirection == 4){
                            doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletDown");
                    }
                    return;
                }
                if ( this.m_player.currentDirection == 1 || this.m_player.currentDirection == 2) {
                    if(this.m_player.anims.currentAnim.key !== 'player_attackLeft'){
                        this.m_player.play("player_attackLeft");
                    }
                }
                else if ( this.m_player.currentDirection == 3){
                    if(this.m_player.anims.currentAnim.key !== 'player_attackUp'){
                        this.m_player.play("player_attackUp");
                    }
                }
                else if(this.m_player.currentDirection == 4){
                    if(this.m_player.anims.currentAnim.key !== 'player_attackDown'){
                        this.m_player.play("player_attackDown");
                    }
                }

                if(this.m_player.currentDirection == 1){
                    doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletleft");
                }
                if(this.m_player.currentDirection == 2){
                    doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletRight");
                }
                if ( this.m_player.currentDirection == 3){
                        doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletUp");
                }
                if(this.m_player.currentDirection == 4){
                        doAttackOneSet(this, "bullet", 10, 0.1, this.m_player.currentDirection, "playerBulletDown");
                }
                break;
            case this.m_cursorKeys.left.isDown:
                this.m_player.currentDirection = 1;
                this.m_player.m_moving = true;
                this.m_player.m_attack = false;
                if(this.m_player.anims.currentAnim.key !== 'player_moveLeft'){
                    this.m_player.play("player_moveLeft");
                }
                break;
            case this.m_cursorKeys.right.isDown:
                this.m_player.currentDirection = 2;
                this.m_player.m_moving = true;
                this.m_player.m_attack = false;
                if(this.m_player.anims.currentAnim.key !== 'player_moveLeft'){
                    this.m_player.play("player_moveLeft");
                }
                break;
            case this.m_cursorKeys.up.isDown:
                this.m_player.currentDirection = 3;
                this.m_player.m_moving = true;
                this.m_player.m_attack = false;
                if(this.m_player.anims.currentAnim.key !== 'player_moveUp'){
                    this.m_player.play("player_moveUp");
                }
                break;
            case this.m_cursorKeys.down.isDown:
                this.m_player.currentDirection = 4;
                this.m_player.m_moving = true;
                this.m_player.m_attack = false;
                if(this.m_player.anims.currentAnim.key !== 'player_moveDown'){
                    this.m_player.play("player_moveDown");
                }
                break;
            default:
                if (this.m_player.currentDirection == 1 || this.m_player.currentDirection == 2) {
                    if(this.m_player.anims.currentAnim.key !== 'player_idleLeft')
                        this.m_player.play("player_idleLeft");
                } else if (this.m_player.currentDirection == 3) {
                    if(this.m_player.anims.currentAnim.key !== 'player_idleUp')
                        this.m_player.play("player_idleUp");
                } else if (this.m_player.currentDirection == 4) {
                    if(this.m_player.anims.currentAnim.key !== 'player_idleDown')
                        this.m_player.play("player_idleDown");
                }
                break;
            
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
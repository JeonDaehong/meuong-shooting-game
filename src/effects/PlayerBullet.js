import Phaser from "phaser";

export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, startingPosition, damage, scale) {
        super(scene, startingPosition[0], startingPosition[1], "playerBullet");

        // beam의 속도, 지속시간을 적당히 설정해줍니다.
        this.SPEED = 300;
        this.DURATION = 1500;
        this.playerAttackSound = this.sound.add("PlayerAttackSound");
        
        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        scene.m_weaponDynamic.add(this);
        
        this.playerAttackSound.play();
        this.playerAttackSound.setVolume(0.03);

        this.m_damage = damage;
        this.scale = scale;
        this.setDepth(30);

        scene.time.addEvent({
            delay: this.DURATION,
            callback: () => {
                this.destroy();
            },
            loop: false,
        });
    }

}
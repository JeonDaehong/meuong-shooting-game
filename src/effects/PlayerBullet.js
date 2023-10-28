import Phaser from "phaser";

export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, startingPosition, damage, scale, velocity, bulletImg) {
        super(scene, startingPosition[0], startingPosition[1], bulletImg);

        // beam의 속도, 지속시간을 적당히 설정해줍니다.
        this.SPEED = 1000;
        this.DURATION = 3000;
        
        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        scene.m_weaponDynamic.add(this);
        
        scene.playerAttackSound.play();
        scene.playerAttackSound.setVolume(0.1);

        this.m_damage = damage;
        this.scale = scale;
        this.setDepth(30);
        this.setVelocity(velocity[0] * this.SPEED, velocity[1] * this.SPEED);

        scene.time.addEvent({
            delay: this.DURATION,
            callback: () => {
                this.destroy();
            },
            loop: false,
        });
    }

}
import Phaser from "phaser";
import Explosion from "../effects/Explosion";

export default class Mob extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, initHp, animKey) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play(animKey);
        this.setDepth(10);
        this.scale = 0.5;
        this.m_speed = 100;
        this.m_hp = initHp;
        
        this.m_canBeAttacked = true;

        if (texture === "enemy1") {
            // mob 1만 바닥을 기준으로 움직이고 있습니다. 움직일 때 중심을 기준으로 움직이지 않고 오프셋을 설정한 곳에 기준으로 움직이게 해두었습니다. 아주 미묘한 차이입니다. 
            this.setBodySize(24, 14, false);
            this.setOffset(0, 14);
        }

        this.m_events = [];
        this.m_events.push(
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                scene.physics.moveToObject(this, scene.m_player, this.m_speed);
                },
                loop: true,
            })
        );

        scene.events.on("update", (time, delta) => {
            this.update(time, delta); // 현재 시간, FPS(Frame per Sec, 1초당 보여주는 프레임 수) 평활화(급격한 변화를 제외) 값
        });
    }

    update() {
        // mob이 없을 경우의 예외처리입니다.
        if (!this.body) return;

        // 오른쪽으로 향할 때는 오른쪽을, 왼쪽으로 향할 때는 왼쪽을 바라보도록 해줍니다.
        if (this.x < this.scene.m_player.x) this.flipX = true;
        else this.flipX = false;

        // HP가 0 이하이고, 죽은 적이 없으면 죽습니다. (1번만 죽을 수 있습니다.)
        if (this.m_hp <= 0 && !this.m_isDead) {
            this.die();
        }
    }

    die() {

        // 한번이라도 죽으면 die 메서드에 다시 들어오지 못하도록 m_isDead를 true로 바꿔줍니다.
        this.m_isDead = true;

        // 폭발 효과를 발생시킵니다. (이미지, 소리)
        new Explosion(this.scene, this.x, this.y);
        this.scene.m_explosionSound.play();
        this.scene.m_explosionSound.setVolume(0.3);

        // player 쪽으로 움직이게 만들었던 event를 제거합니다.
        this.scene.time.removeEvent(this.m_events);
      
        // 몹이 사라집니다.
        this.destroy();
        
    }

    // 공격받은 mob을 투명도를 1초간 조절함으로써 공격받은 것을 표시합니다.
    displayHit() {
        // 몹의 투명도를 0.5로 변경하고,
        // 1초 후 1로 변경합니다.
        this.alpha = 0.5;
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
            this.alpha = 1;
            },
            loop: false,
        });
    }

    // 1초 쿨타임을 갖는 함수입니다.
    getCoolDown() {
        // 공격받을 수 있는지 여부를 false로 변경하고,
        // 1초 후 true로 변경합니다.
        this.m_canBeAttacked = false;
        this.scene.time.addEvent({
            delay: 800,
            callback: () => {
            this.m_canBeAttacked = true;
            },
            loop: false,
        });
    }

}
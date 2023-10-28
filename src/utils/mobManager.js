import Mob from "../characters/Mob";

export function addMobEvent(x, y, scene, repeatGap, mobTexture, mobAnim, mobHp, mobDropRate) {
    let timer = scene.time.addEvent({
    delay: repeatGap,
    callback: () => {
        scene.m_mobs.add(new Mob(scene, x, y, mobTexture, mobAnim, mobHp, mobDropRate));
    },
        loop: true,
    });

    scene.m_mobEvents.push(timer);
}

export function addMob(x, y, scene, mobTexture, mobAnim, mobHp) {
    scene.m_mobs.add(new Mob(scene, x, y, mobTexture, mobAnim, mobHp, 0));
}

// 가장 오래된 mob event를 지우는 함수입니다.
export function removeOldestMobEvent(scene) {
    scene.m_mobEvents[0].remove();
    scene.m_mobEvents.shift();
}
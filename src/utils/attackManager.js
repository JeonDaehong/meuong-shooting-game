import bullet from "../effects/PlayerBullet.js"

export function doAttackOneSet(scene, attackType, damage, scale, direction, bulletImg) {
    console.log(attackType);
    switch (attackType) {
        case "bullet":
            switch(direction){
                case 1: // left
                    new bullet(scene, [scene.m_player.x - 65, scene.m_player.y], damage, scale, [-1, 0], bulletImg);
                    scene.children.list.forEach(element => {
                        console.log(element);
                    });
                    break;
                case 2: // right
                    new bullet(scene, [scene.m_player.x + 65, scene.m_player.y], damage, scale, [1, 0], bulletImg);
                    break;
                case 3: // up
                    if(scene.m_player.flipX){
                        new bullet(scene, [scene.m_player.x - 15, scene.m_player.y - 75], damage, scale, [0, -1], bulletImg);
                    }
                    else{
                        new bullet(scene, [scene.m_player.x + 15, scene.m_player.y - 75], damage, scale, [0, -1], bulletImg);
                    }
                    break;
                case 4: // down
                    new bullet(scene, [scene.m_player.x, scene.m_player.y + 65], damage, scale, [0, 1], bulletImg);
                    break;
            }
            break;
        default:
            break;
    }
}
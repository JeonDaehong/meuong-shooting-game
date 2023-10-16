import LoadingScene from "./scenes/LoadingScene.js";
import MainScene from "./scenes/MainScene.js";
import Stage1_EasyScene from './scenes/Stage1_EasyScene.js';
import Stage1_HardScene from './scenes/Stage1_HardScene.js';

const Config = {
    width: 1280,
    height: 720,
    backgroundColor: 0xFFFFFF,
    scene: [LoadingScene, MainScene, Stage1_EasyScene, Stage1_HardScene],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            // debug: process.env.DEBUG === "true",
            debug: true,
        },
    },
};

export default Config;
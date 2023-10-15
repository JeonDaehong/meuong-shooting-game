import LoadingScene from "./scenes/LoadingScene.js";
import MainScene from "./scenes/MainScene.js";

const Config = {
    width: 800,
    height: 600,
    backgroundColor: 0xFFFFFF,
    scene: [LoadingScene, MainScene],
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
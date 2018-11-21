require('phaser/dist/phaser-arcade-physics');

let BootScene = require('./Scenes/Boot').BootScene;
let WorldScene = require('./Scenes/World').WorldScene;

function zoomFix(game) {
    let config = game.config;
    let style = game.canvas.style;
    style.width = (config.zoom * config.width) + 'px';
    style.height = (config.zoom * config.height) + 'px';
}

let config = {
    type: Phaser.AUTO,
    backgroundColor: 0x5f9fee,
    parent: 'content',
    width: 160,
    height: 120,
    zoom: 4,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 50}
        }
    },
    scene: [
        BootScene, WorldScene
    ],
    callbacks: {
        postBoot: zoomFix
    }
};

let game = new Phaser.Game(config);
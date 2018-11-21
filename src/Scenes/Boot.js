const KEYS = require('../const').KEYS;

let BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function () {
            Phaser.Scene.call(this, {key: KEYS.BootScene});
        },

    preload: function () {
        this.load.image(KEYS.tiles.greenTileSet, '../assets/green-std-basic.png');
        this.load.tilemapTiledJSON(KEYS.tiles.map, '../assets/green-basic.json');
        this.load.spritesheet(KEYS.tiles.playerSprite, '../assets/solobo.png', {frameWidth: 16, frameHeight: 16});
    },

    create: function () {
        this.scene.start(KEYS.WorldScene);
    }
});

module.exports = {
    BootScene
};
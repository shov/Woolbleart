const KEYS = require('../const').KEYS;

let WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function () {
            Phaser.Scene.call(this, {key: KEYS.WorldScene});
        },
    create: function () {
        console.log('OK');

        let map = this.make.tilemap({key: KEYS.tiles.map});

        let tiles = map.addTilesetImage(KEYS.tiles.greenTileSet, KEYS.tiles.greenTileSet);
        let ground = map.createStaticLayer('Ground', KEYS.tiles.greenTileSet, 0, 0);
        ground.setCollisionByExclusion(-1);

        this.player = this.physics.add.sprite(16 + 16 / 2, 8 * 16 + 16 / 2, KEYS.tiles.playerSprite, 0);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, ground);

        this.player.setBounce(0.02);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.makeUpAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.player.body);
    },

    makeUpAnimations: function () {
        this.anims.create({
            key: KEYS.anim.afk,
            frames: this.anims.generateFrameNumbers(KEYS.tiles.playerSprite, {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: KEYS.anim.walk,
            frames: this.anims.generateFrameNumbers(KEYS.tiles.playerSprite, {start: 4, end: 7}),
            frameRate: 6,
            repeat: -1
        });
    },

    update: function () {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-50);
            this.player.anims.play(KEYS.anim.walk, true);
            this.player.flipX = true;

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(50);
            this.player.anims.play(KEYS.anim.walk, true);
            this.player.flipX = false;

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play(KEYS.anim.afk, true);
        }

        if (this.cursors.up.isDown && this.player.spri) {
            this.player.setVelocityY(-30);
            this.player.anims.stop();
        }
    },
});

module.exports = {
    WorldScene
};
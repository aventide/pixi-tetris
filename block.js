/**
 * TBlock Class
 *
 * Tetris block class
 * Keeps track of block textures, positions, dynamics
 *
 * Author: Alex J. Staples
 * Date last modified: 6/22/16
 *
 */
function TBlock(image, posX, posY) {

    // identification code
    this.id = "";

    // texture taken from file, to be applied as the image for the sprite
    this.texture = PIXI.Texture.fromImage(image);
    this.type = image;

    // sprite seen on stage
    this.sprite = new PIXI.Sprite(this.texture);

    // position of sprite on stage
    this.sprite.position.x = posX;
    this.sprite.position.y = posY;

    // size sprite depending on screen width
    this.sprite.width = BLOCK_SIZE;
    this.sprite.height = BLOCK_SIZE;

    // enable interaction for sprite
    // this.sprite.interactive = true;

    // anchor point or offset from the center, don't worry about this
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    // delta x and y, or the velocities of sprite in each 2D direction
    // NOTE: for y-axis values, higher number means LOWER on screen
    this.DX = 0;
    this.DY = 0;

    // set new position on stage for sprite
    this.setPosition = function (posX, posY) {

        this.sprite.position.x = posX;
        this.sprite.position.y = posY;

    }

    // ---------------------------------------
    // methods for manipulating sprite motion:

    this.halt = function () {
        this.DX = 0;
        this.DY = 0;
    }

    // -------------------------------
    // end motion manipulating methods

    // begin neighbor block methods
    // ----------------------------

    this.getBlocksBelow = function () {

        var bottomBlocks = [];
        for (var i = 0; i < allBlocks.length - 4; i++) {
            if ((allBlocks[i].sprite.position.x == this.sprite.position.x) &&
                (allBlocks[i].sprite.position.y > this.sprite.position.y)) {
                bottomBlocks.push(allBlocks[i]);
            }
        }
        return bottomBlocks;
    }

    // see if there are blocks directly to the right of this one
    this.getDirectBlocksRight = function () {
        var rightBlocks = [];
        for (var i = 0; i < allBlocks.length - 4; i++) {
            // to be a direct block to the right, x coord must be BLOCK_SIZE greater than this
            // and y coord must be between this +/- BLOCK_SIZE
            if (
                (allBlocks[i].sprite.position.x - this.sprite.position.x == BLOCK_SIZE) &&
                (allBlocks[i].sprite.position.y > this.sprite.position.y - BLOCK_SIZE &&
                allBlocks[i].sprite.position.y < this.sprite.position.y + BLOCK_SIZE)
            ) {
                rightBlocks.push(allBlocks[i]);
            }
        }
        return rightBlocks;
    }

    // see if there are blocks directly to the left of this one
    this.getDirectBlocksLeft = function () {
        var leftBlocks = [];
        for (var i = 0; i < allBlocks.length - 4; i++) {
            // to be a direct block to the left, x coord must be BLOCK_SIZE less than this
            // and y coord must be between this +/- BLOCK_SIZE
            if (
                (this.sprite.position.x - allBlocks[i].sprite.position.x == BLOCK_SIZE) &&
                (allBlocks[i].sprite.position.y > this.sprite.position.y - BLOCK_SIZE &&
                allBlocks[i].sprite.position.y < this.sprite.position.y + BLOCK_SIZE)
            ) {
                leftBlocks.push(allBlocks[i]);
            }
        }
        return leftBlocks;
    }

    this.getNearestBlockBelow = function () {
        var bottomBlocks = this.getBlocksBelow();
        var nearestBlock = bottomBlocks[0];
        for (var i = 0; i < bottomBlocks.length; i++) {
            if ((this.sprite.position.y - bottomBlocks[i].sprite.position.y) >
                (this.sprite.position.y - nearestBlock.sprite.position.y)) {
                nearestBlock = bottomBlocks[i];
            }
        }
        return nearestBlock;
    }

    // --------------------------
    // end neighbor block methods

    // begin block type methods
    // ---------------------------

    this.changeType = function (blockImage) {
        this.sprite.texture = PIXI.Texture.fromImage(blockImage);
        this.type = blockImage;
    };

    // --------------------------
    // end block type methods

}

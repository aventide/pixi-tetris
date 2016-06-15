/**
 * TBlock Class
 *
 * Tetris block class
 * Keeps track of block textures, positions, dynamics
 *
 * Author: Alex J. Staples
 * Date last modified: 6/14/16
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

	this.getBlocksAbove = function () {

		var topBlocks = [];
		for (var i = 0; i < allBlocks.length; i++) {
			if ((allBlocks[i].sprite.position.x == this.sprite.position.x) &&
				(allBlocks[i].sprite.position.y < this.sprite.position.y)) {
				topBlocks.push(allBlocks[i]);
			}
		}
		return topBlocks;
	}

	this.getNearestBlockAbove = function () {
		var topBlocks = this.getBlocksAbove();
		var nearestBlock = topBlocks[0];
		for (var i = 0; i < topBlocks.length; i++) {
			if ((topBlocks[i].sprite.position.y - this.sprite.position.y) >
				(nearestBlock.sprite.position.y - this.sprite.position.y)) {
				nearestBlock = topBlocks[i];
			}
		}
		return nearestBlock;
	}

	this.getDirectBlockAbove = function () {
		var topBlocks = this.getBlocksAbove();
		for (var i = 0; i < topBlocks.length; i++) {
			if (topBlocks[i].sprite.position.y == this.sprite.position.y - BLOCK_HALF) {
				return topBlocks[i];
			}
		}
	}

	this.getBlocksBelow = function () {

		var bottomBlocks = [];
		for (var i = 0; i < allBlocks.length; i++) {
			if ((allBlocks[i].sprite.position.x == this.sprite.position.x) &&
				(allBlocks[i].sprite.position.y > this.sprite.position.y)) {
				bottomBlocks.push(allBlocks[i]);
			}
		}
		return bottomBlocks;
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

	this.getDirectBlockBelow = function () {
		var bottomBlocks = this.getBlocksBelow();
		for (var i = 0; i < bottomBlocks.length; i++) {
			if (bottomBlocks[i].sprite.position.y == this.sprite.position.y + BLOCK_HALF) {
				return bottomBlocks[i];
			}
		}
	}

	this.getIntersectingBlock = function () {
		if (this.sprite.position.y - this.getNearestBlockAbove().sprite.position.y < BLOCK_HALF) {
			return this.getNearestBlockAbove();
		}

		if (this.getNearestBlockBelow().sprite.position.y - this.sprite.position.y < BLOCK_HALF) {
			return this.getNearestBlockBelow();
		}
	}

	// --------------------------
	// end neighbor block methods

	// begin block type methods
	// ---------------------------

	this.changeType = function (blockImage) {
		this.sprite.texture = PIXI.Texture.fromImage(blockImage);
		this.type = blockImage;
	}

	this.setRandomType = function () {
		var randBlock = "";
		switch (Math.round(Math.random() * 4)) {
		case 0:
			randBlock = "./res/sprites/m_block_red.png";
			break;
		case 1:
			randBlock = "./res/sprites/m_block_tangerine.png";
			break;
		case 2:
			randBlock = "./res/sprites/m_block_green.png";
			break;
		case 3:
			randBlock = "./res/sprites/m_block_blue.png";
			break;
		case 4:
			randBlock = "./res/sprites/m_block_purple.png";
			break;
		default:
			randBlock = "./res/sprites/m_block_red.png";
			break;
		}
		this.sprite.texture = PIXI.Texture.fromImage(randBlock);
		this.type = randBlock;
	}

	// --------------------------
	// end block type methods

}

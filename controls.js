// window.oncontextmenu = function (event) {
// 	event.preventDefault();
// 	event.stopPropagation();
// 	return false;
// };

// keyboard controls for block
document.onkeydown = function (e) {
	e = e || window.event;
	switch (e.which || e.keyCode) {
		//left arrow
		case 37:
			moveTetroLeft();
			break;
		// up arrow
		case 38:
			rotateTetro();
			break;
		// right arrow
		case 39:
			moveTetroRight();
			break;
		// down arrow
		case 40:
			moveTetroDown();
			break;
		// spacebar
		case 32:
			e.preventDefault();
			instantDown();

		default:
			return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
};

function moveTetroLeft() {
	var validMove = false;
	for (var i = 1; i < 5; i++) {
		//make sure to not go over the left edge
		if ((allBlocks[allBlocks.length - i].sprite.position.x - BLOCK_SIZE) >= BLOCK_HALF) {
			if (allBlocks[allBlocks.length - i].getDirectBlocksLeft().length == 0) {
				validMove = true;
			}
			else {
				validMove = false;
				break;
			}
		}
		else {
			validMove = false;
			break;
		}
	}
	if (validMove) {
		for (var i = 1; i < 5; i++) {
			allBlocks[allBlocks.length - i].sprite.position.x -= BLOCK_SIZE;
		}
		HighlightBlocksBelow();
	}
}

function moveTetroRight() {
	var validMove = false;
	for (var i = 1; i < 5; i++) {
		//make sure to not go over the right edge
		if ((allBlocks[allBlocks.length - i].sprite.position.x + BLOCK_SIZE) <= RENDERER_X - BLOCK_HALF) {
			if (allBlocks[allBlocks.length - i].getDirectBlocksRight().length == 0) {
				validMove = true;
			}
			else {
				validMove = false;
				break;
			}
		}
		else {
			validMove = false;
			break;
		}
	}
	if (validMove) {
		for (var i = 1; i < 5; i++) {
			allBlocks[allBlocks.length - i].sprite.position.x += BLOCK_SIZE;
		}
		HighlightBlocksBelow();
	}
}

function moveTetroDown() {
	var validMove = false;
	for (var i = 1; i < 5; i++) {

		// don't smash into blocks below
		if (allBlocks[allBlocks.length - i].getNearestBlockBelow() != undefined) {
			if (allBlocks[allBlocks.length - i].getNearestBlockBelow().sprite.position.y -
				allBlocks[allBlocks.length - i].sprite.position.y >= BLOCK_SIZE) {
				validMove = true;
			}
			else {
				validMove = false;
				break;
			}
		}
		//make sure to not go over the bottom edge
		else if (allBlocks[allBlocks.length - i].sprite.position.y + BLOCK_SIZE <= (RENDERER_Y - BLOCK_HALF)) {
			validMove = true;
		}
		else {
			validMove = false;
			break;
		}
	}
	if (validMove) {
		for (var i = 1; i < 5; i++) {
			allBlocks[allBlocks.length - i].sprite.position.y += BLOCK_SIZE;
		}
	}
}

function instantDown() {
	defaultDropSpeed = 1000;
}

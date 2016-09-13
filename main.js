"use strict";

// maintain positions of all blocks
// to determine neighbors, etc
var allBlocks = [];
var blockCount = 0;
var pivotBlock = undefined;
var defaultDropSpeed = 2;
var nextTetro = 0;

// create and return a TBlock object
// with all of its simple glory
function createBlock(image, posX, posY) {
    allBlocks.push(new TBlock(image, posX, posY));
    allBlocks[allBlocks.length - 1].id = "b" + blockCount;
    stage.addChild(allBlocks[allBlocks.length - 1].sprite);
    blockCount++;
    return blockCount;
}

// return block located at the
// given coordinate, if it exists
function getBlockAt(x, y){
    for(var i = 0; i < allBlocks.length - 4; i++){
        if(allBlocks[i].sprite.position.x == x &&
        allBlocks[i].sprite.position.y == y){
            return allBlocks[i];
        }
    }
}

// determine if there could be
// and intersection if a block was
// placed at this position
// ignoring active tetro blocks
function isIntersectingBlock(x, y) {
    //console.log("x: " + x + "\ny: " + y);
    for (var i = 0; i < allBlocks.length - 4; i++) {
        if (allBlocks[i].sprite.position.x == x &&
            Math.abs(allBlocks[i].sprite.position.y - y) <= BLOCK_SIZE) {
            return true;
        }
    }
    return false;
}

// create a random tetromino
// https://en.wikipedia.org/wiki/Tetromino
// return shape number in case we need it later
// @todo take shape as a parameter to enable pre-selection
function createTetro(nextShape) {
    // return drop speed to normal if altered for instant drop
    defaultDropSpeed = INITIAL_DROPSPEED;
    var shape = nextShape;
    var basePoint = ((Math.round(Math.random() * 10) * 2) + 1);
    pivotBlock = undefined;
    switch (shape) {
        case 0:
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            break;
        case 1:
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * basePoint, BLOCK_HALF * 7);
            pivotBlock = allBlocks[allBlocks.length - 3];
            break;
        case 2:
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 5);
            pivotBlock = allBlocks[allBlocks.length - 2];
            break;
        case 3:
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            pivotBlock = allBlocks[allBlocks.length - 3];
            break;
        case 4:
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 5);
            pivotBlock = allBlocks[allBlocks.length - 2];
            break;
        case 5:
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            pivotBlock = allBlocks[allBlocks.length - 3];
            break;
        case 6:
            createBlock("./res/sprites/m_block_purple.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_purple.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_purple.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_purple.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            pivotBlock = allBlocks[allBlocks.length - 3];
            break;
        default:
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            break;
    }
    return shape;
}

function setNextTetroImage(nextTetro){
    document.getElementById("ai-next-tetro-image").src

    switch(nextTetro){
        case 0:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/red_next_tetro.png";
            break;
        case 1:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/blue_next_tetro.png";
            break;
        case 2:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/yellow_next_tetro.png";
            break;
        case 3:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/green_next_tetro.png";
            break;
        case 4:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/pink_next_tetro.png";
            break;
        case 5:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/tangerine_next_tetro.png";
            break;
        case 6:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/purple_next_tetro.png";
            break;
        default:
            document.getElementById("ai-next-tetro-image").src = "./res/next_tetro/red_next_tetro.png";
            break;

    }
}

function HighlightBlocksBelow() {

    // un highlight previously highlighted blocks
    // for (var i = 0; i < allBlocks.length - 4; i++) {
    //     allBlocks[i].sprite.alpha = 1;
    // }

    // highlight blocks below active tetro
    // for (var i = 1; i < 5; i++) {
    //     if (allBlocks[allBlocks.length - i].getNearestBlockBelow() == undefined) {
    //         continue;
    //     }
    //     allBlocks[allBlocks.length - i].getNearestBlockBelow().sprite.alpha = 0.5;
    // }
}

// get the bottom block of a tetromino
// effectively, this is the block closest to
// another block below
// right now, not intended to handle empty space below
// needs to find bottom block closest to block below OR
// empty space below
function getBottomTetro() {

    var bottomBlock = allBlocks[allBlocks.length - 1];
    var shortDist = Infinity;

    for (var i = 1; i < 5; i++) {
        // has blocks below
        if (allBlocks[allBlocks.length - i].getNearestBlockBelow() != undefined) {
            var yDist = allBlocks[allBlocks.length - i].getNearestBlockBelow().sprite.position.y - allBlocks[allBlocks.length - i].sprite.position.y - BLOCK_SIZE;
            if (yDist < shortDist) {
                shortDist = yDist;
                bottomBlock = allBlocks[allBlocks.length - i];
            }
        }
        // only empty space below
        else {
            var yDist = RENDERER_Y - allBlocks[allBlocks.length - i].sprite.position.y - BLOCK_HALF;
            if (yDist < shortDist) {
                shortDist = yDist;
                bottomBlock = allBlocks[allBlocks.length - i];
            }
        }
    }

    // for(var i = 1; i < 5; i++){
    //  allBlocks[allBlocks.length - i].sprite.alpha = 1;
    //  }
    //  bottomBlock.sprite.alpha = 0.5;

    return bottomBlock;

}

// rotate currently falling tetro 90 degrees to the right
function rotateTetro() {
    if (pivotBlock == undefined) {
        return
    }

    var xTemp = [];
    var yTemp = [];
    for (var i = 1; i < 5; i++) {
        xTemp[i - 1] = allBlocks[allBlocks.length - i].sprite.position.x
        yTemp[i - 1] = allBlocks[allBlocks.length - i].sprite.position.y;
    }

    var xOffset = pivotBlock.sprite.position.x;
    var yOffset = pivotBlock.sprite.position.y;

    // apply offset to all tetro blocks
    // so pivot is at (0, 0)
    for (var i = 0; i < 4; i++) {
        xTemp[i] -= xOffset;
        yTemp[i] -= yOffset;
    }

    // apply rotation algorithm
    for (var i = 0; i < 4; i++) {
        var x = xTemp[i];
        var y = yTemp[i];
        xTemp[i] = (x * Math.cos(Math.PI / 2) - y * Math.sin(Math.PI / 2));
        yTemp[i] = (x * Math.sin(Math.PI / 2) + y * Math.cos(Math.PI / 2));
    }

    // re-apply offsets to bring block
    // back where it should be
    for (var i = 0; i < 4; i++) {
        xTemp[i] += xOffset;
        yTemp[i] += yOffset;
    }

    // loop through new positions after rotation
    // to check validity
    // stop function if not
    for (var i = 0; i < 4; i++) {
        if (isIntersectingBlock(xTemp[i], yTemp[i]) || xTemp[i] < BLOCK_HALF || xTemp[i] > RENDERER_X - BLOCK_HALF) {
            return
        }
    }

    //@todo make it so the pivot block changes when tetro is in violation?
    
    for (var i = 1; i < 5; i++) {
        allBlocks[allBlocks.length - i].sprite.position.x = xTemp[i - 1];
        allBlocks[allBlocks.length - i].sprite.position.y = yTemp[i - 1];
    }

    HighlightBlocksBelow();

}

// create first tetromino
createTetro(Math.round(Math.random() * 7));
nextTetro = Math.round(Math.random() * 7);
setNextTetroImage(nextTetro);

function animate() {

    // render the stage
    renderer.render(stage);

    var validMove = false;
    var dy = 0;
    var hasBlocksBelow = false;

    for (var i = 1; i < 5; i++) {
        if (allBlocks[allBlocks.length - i].getNearestBlockBelow() != undefined) {
            hasBlocksBelow = true;
            break;
        }
    }

    // there are blocks below to collide with
    if (getBottomTetro().getNearestBlockBelow() != undefined) {
        // determine if tetro can move down without intersecting another block

        // distance between bottom block of tetro and its block below
        var yDist = (getBottomTetro().getNearestBlockBelow().sprite.position.y - getBottomTetro().sprite.position.y) - BLOCK_SIZE;
        if (yDist > defaultDropSpeed) {
            dy = defaultDropSpeed;
            validMove = true;
        }
        else if (yDist != 0) {
            dy = yDist;
            validMove = true;
        }
        else {
            validMove = false;
        }
    }
    // there is empty space below to collide with
    else if (RENDERER_Y - (getBottomTetro().sprite.position.y + BLOCK_HALF) > 0) {
        // determine if tetro can move down without violating bottom
        if (RENDERER_Y - (getBottomTetro().sprite.position.y + BLOCK_HALF) >= defaultDropSpeed) {
            dy = defaultDropSpeed;
        }
        else {
            dy = (RENDERER_Y - BLOCK_HALF) - getBottomTetro().sprite.position.y;
        }
        validMove = true;
    }
    // any other conditions are absolutely haram
    else {
        validMove = false;
    }

    // if no violation, move all 4 blocks in tetro downwards by dy
    if (validMove) {
        for (var i = 1; i < 5; i++) {
            allBlocks[blockCount - i].sprite.position.y += dy;
        }
    }
    // if violation occurred, it's done moving; make a new tetro up top
    else {
        // @todo
        // set delay of 12ms to allow player to move left or right
        // at the last moment, because I'm not a dick
        // IF THIS DOESN'T END UP WORKING FOR ALL MACHINES,
        // TRY CHECKING FOR LEFT/RIGHT KEYPRESS AROUND THIS
        // POINT FOR DELAY-LESS COVERING OF THE ISSUE
        // setTimeout(function () {
        //     createTetro();
        //     HighlightBlocksBelow();
        // }, 12);
        createTetro(nextTetro);

        nextTetro = Math.round(Math.random() * 7);
        setNextTetroImage(nextTetro);

        HighlightBlocksBelow();
    }

    // scan each row on canvas for complete rows of tetrominos
    // and clear the row if condition is met

    // iterate by row
    for(var h = BLOCK_HALF; h < RENDERER_Y; h += BLOCK_SIZE) {

        var completeRow = false;

        // iterate by column in row
        for (var i = BLOCK_HALF; i < RENDERER_X; i += BLOCK_SIZE) {
            if (getBlockAt(i, h) != undefined) {
                completeRow = true;
            }
            else {
                completeRow = false;
                break;
            }
        }

        // if row complete, remove all TBlocks and associated
        // sprites for that row
        if (completeRow) {
            console.log("Row " + "" + "completed.");
            for (var i = BLOCK_HALF; i < RENDERER_X; i += BLOCK_SIZE) {
                stage.removeChild(getBlockAt(i, h).sprite);
                allBlocks.splice(allBlocks.indexOf(getBlockAt(i, h)), 1);
            }
            blockCount -= ROW_SIZE;

            // after clearing row, bring all TBlocks above down by
            // one block height, to simulate gravity
            for (var i = 0; i < allBlocks.length - 4; i++) {
                // lower all blocks above the cleared row by 1 row
                if (allBlocks[i].sprite.position.y < h) {
                    allBlocks[i].sprite.position.y += BLOCK_SIZE;
                }
            }

        }

    }

    requestAnimationFrame(animate)

}
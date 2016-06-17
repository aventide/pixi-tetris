"use strict";

// maintain positions of all blocks
// to determine neighbors, etc
var allBlocks = [];
var blockCount = 0;

function createBlock(image, posX, posY) {
    allBlocks.push(new TBlock(image, posX, posY));
    allBlocks[allBlocks.length - 1].id = "b" + blockCount;
    stage.addChild(allBlocks[allBlocks.length - 1].sprite);
    blockCount++;
    return blockCount;
}

// create a random tetromino
// https://en.wikipedia.org/wiki/Tetromino
// return shape number in case we need it later
function createTetro(){
    var shape = Math.round(Math.random() * 6);
    var basePoint = ((Math.round(Math.random() * 10) * 2) + 1);
    switch(shape){
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
            break;
        case 2:
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 5);
            break;
        case 3:
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            break;
        case 4:
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * basePoint, BLOCK_HALF);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * basePoint, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 5);
            break;
        case 5:
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * (basePoint + 2), BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * basePoint, BLOCK_HALF * 5);
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

function HighlightBlocksBelow(){

    // un highlight previously highlighted blocks
    for(var i = 0; i < allBlocks.length - 4; i++){
        allBlocks[i].sprite.alpha = 1;
    }

    // highlight blocks below active tetro
    for(var i = 1; i < 5; i++){
        if(allBlocks[allBlocks.length - i].getNearestBlockBelow() == undefined){
            continue;
        }
        allBlocks[allBlocks.length - i].getNearestBlockBelow().sprite.alpha = 0.5;
    }
}

// get the bottom block of a tetromino
// effectively, this is the block closest to
// another block below
function getBottomTetro(){

    var bottomBlock = allBlocks[allBlocks.length - 1];

    for(var i = 2; i < 5; i++){
        if(allBlocks[allBlocks.length - i].getNearestBlockBelow() == undefined){
            continue;
        }
        var yDist = allBlocks[allBlocks.length - i].getNearestBlockBelow().sprite.position.y - allBlocks[allBlocks.length - i].sprite.position.y;
        if(bottomBlock.getNearestBlockBelow() == undefined || yDist < bottomBlock.getNearestBlockBelow().sprite.position.y - bottomBlock.sprite.position.y){
            bottomBlock = allBlocks[allBlocks.length - i];
        }
    }
    //bottomBlock.sprite.alpha = 0.5;
    return bottomBlock;
}

// create first tetromino
createTetro();
function animate() {
    
    // render the stage
    renderer.render(stage);

    var validMove = false;
    var defaultDropSpeed = 2;
    var dy = 0;
    var hasBlocksBelow = false;

    for(var i = 1; i < 5; i++){
        if(allBlocks[allBlocks.length - i].getNearestBlockBelow() != undefined){
            hasBlocksBelow = true;
            break;
        }
    }

    // there are blocks below to collide with
    if(hasBlocksBelow){
        // determine if tetro can move down without intersecting another block

        // distance between bottom block of tetro and its block below
        var yDist = (getBottomTetro().getNearestBlockBelow().sprite.position.y - getBottomTetro().sprite.position.y) - BLOCK_SIZE;
        if(yDist > defaultDropSpeed){
            dy = defaultDropSpeed;
            validMove = true;
        }
        else if(yDist != 0){
            dy = yDist;
            validMove = true;
        }
        else{
            validMove = false;
        }
    }
    // there is empty space below to collide with
    else if(RENDERER_Y - (getBottomTetro().sprite.position.y + BLOCK_HALF) > 0){
        // determine if tetro can move down without violating bottom
        if(RENDERER_Y - (getBottomTetro().sprite.position.y + BLOCK_HALF) >= defaultDropSpeed){
            dy = defaultDropSpeed;
        }
        else{
            dy = (RENDERER_Y - BLOCK_HALF) - getBottomTetro().sprite.position.y;
        }
        validMove = true;
    }
    // any other conditions are absolutely haram
    else{
        validMove = false;
    }

    // if no violation, move all 4 blocks in tetro downwards by dy
    if(validMove){
        for(var i = 1; i < 5; i++){
            allBlocks[blockCount - i].sprite.position.y += dy;
        }
    }
    // if violation occurred, it's done moving; make a new tetro up top
    else{
        createTetro();
        HighlightBlocksBelow();
    }

    requestAnimationFrame(animate)


}
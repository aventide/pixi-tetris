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

createTetro();
//setInterval(function(){createTetro()}, 3000);
function animate() {
    
    // render the stage
    renderer.render(stage);

    var validMove = false;
    var dropSpeed = 2;

    // check all blocks in tetromino won't violate conditions on move
    for(var i = 1; i < 5; i++){
        if((RENDERER_Y - BLOCK_HALF) - (allBlocks[blockCount - i].sprite.position.y + dropSpeed) >= 0){
            validMove = true;
        }
        else{
            validMove = false;
            break;
        }
    }

    // if no violation, move all 4 blocks in tetro downwards
    if(validMove){
        for(var i = 1; i < 5; i++){
            allBlocks[blockCount - i].sprite.position.y += dropSpeed;
        }
    }
    // if violation occurred, it's done moving; make a new tetro up top
    else{
        createTetro();
    }

    requestAnimationFrame(animate)


}
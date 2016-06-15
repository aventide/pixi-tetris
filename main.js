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
function createTetro(){
    var shape = Math.round(Math.random() * 6);
    switch(shape){
        case 0:
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 5, BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 7, BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 5, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 7, BLOCK_HALF * 3);
            break;
        case 1:
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * 9, BLOCK_HALF);
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * 9, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * 9, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_blue.png", BLOCK_HALF * 9, BLOCK_HALF * 7);
            break;
        case 2:
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * 5, BLOCK_HALF);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * 5, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * 7, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_yellow.png", BLOCK_HALF * 7, BLOCK_HALF * 5);
            break;
        case 3:
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * 3, BLOCK_HALF);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * 3, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * 1, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_green.png", BLOCK_HALF * 1, BLOCK_HALF * 5);
            break;
        case 4:
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * 11, BLOCK_HALF);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * 11, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * 11, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_pink.png", BLOCK_HALF * 13, BLOCK_HALF * 5);
            break;
        case 5:
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * 15, BLOCK_HALF);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * 15, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * 15, BLOCK_HALF * 5);
            createBlock("./res/sprites/m_block_tangerine.png", BLOCK_HALF * 13, BLOCK_HALF * 5);
            break;
        default:
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 5, BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 7, BLOCK_HALF);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 5, BLOCK_HALF * 3);
            createBlock("./res/sprites/m_block_red.png", BLOCK_HALF * 7, BLOCK_HALF * 3);
            break;
    }

}

createTetro();

function animate() {
    
    // render the stage
    renderer.render(stage);
    
    // do stuff
    for(var i = 0; i < 4; i++){
        //allBlocks[i].sprite.position.y += BLOCK_SIZE;
        allBlocks[i].sprite.position.y += 2;
    }

    //setTimeout(function(){requestAnimationFrame(animate);}, 750);
    requestAnimationFrame(animate)


}
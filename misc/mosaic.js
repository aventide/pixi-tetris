/**
 * Created by ajsta on 9/24/2016.
 */

var blockLength = 50;
var randomOptions = 3;

function drawMosaic(divWidth, divHeight) {
    for (var x = 0; x < divWidth; x += blockLength) {
        for (var y = 0; y < divHeight; y += blockLength) {
            var block = document.createElement('img');
            var color = Math.floor(Math.random() * randomOptions);
            switch(color){
                case 0:
                    block.src = '../res/sprites/m_block_blue.png';
                    break;
                case 1:
                    block.src = '../res/sprites/m_block_lightgrey.png';
                    break;
                case 2:
                    block.src = '../res/sprites/m_block_darkgrey.png';

            }
            document.getElementById('main').appendChild(block);
        }
    }
}
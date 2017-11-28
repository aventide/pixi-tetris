/**
 * Created by ajsta on 9/24/2016.
 */

function drawMosaic(scale) {

    var blockLength = scale;
    var randomOptions = 3;
    var elem = document.querySelector("#main");

    // var img1 = document.getElementById("img1");
    // var img2 = document.getElementById("img2");
    // var img3 = document.getElementById("img3");

    var divHeight = elem.clientHeight;
    var divWidth = elem.clientWidth;

    var ctx = elem.getContext("2d");

    var block = null;

    for (var y = 0; y < divHeight; y += blockLength) {
        for (var x = 0; x < divWidth; x += blockLength) {
            var block = null;
            var color = Math.floor(Math.random() * randomOptions);

            switch(color){
                case 0:
                    block = img1;
                    break;
                case 1:
                    block = img2;
                    break;
                case 2:
                    block = img3;

            }
            block.width = blockLength;
            block.height = blockLength;

            ctx.drawImage(block, x, y);
            
        }
    }

    // for (var y = 0; y < divHeight; y += blockLength) {
    //     for (var x = 0; x < divWidth; x += blockLength) {

    //         ctx.beginPath();
    //         ctx.rect(x, y, 50, 50);
    //         ctx.fillStyle = 'yellow';
    //         ctx.fill();
    //         ctx.lineWidth = 2;
    //         ctx.strokeStyle = 'black';
    //         ctx.stroke(); 
    //     }
    // }

}

window.onload = function(){
    drawMosaic(25);
}

window.scale = 25;
window.onkeydown = function(e) {

    if (e.which == 38) {
        e.preventDefault();
        window.scale++;
    }
    if (e.which == 40 && window.scale > 2) {
        e.preventDefault();
        window.scale--;
    }
    drawMosaic(window.scale);
};

window.addEventListener("wheel", function(e){
    e.preventDefault();
    if(e.deltaY < 0){
        window.scale += 0.5;
    }
    else if(e.deltaY > 0 && window.scale > 2){
        window.scale -= 0.5;
    }
    drawMosaic(window.scale);
});
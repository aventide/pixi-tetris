// create an new instance of a pixi scene graph
var stage = new PIXI.Container();

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(RENDERER_X, RENDERER_Y);
renderer.backgroundColor = RENDERER_COLOR;

// add renderer to div where it's supposed to go
document.getElementById('ai-center').appendChild(renderer.view);

window.onload = function () {
	requestAnimationFrame(animate);
};


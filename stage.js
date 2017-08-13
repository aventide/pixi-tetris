// create an new instance of a pixi scene graph

var app = $('#app');

var RENDERER_X = app.width(),
	RENDERER_Y = app.height(),
	ROW_SIZE = 12,
	BLOCK_SIZE = RENDERER_X / ROW_SIZE,
	BLOCK_HALF = BLOCK_SIZE / 2,
	RENDERER_COLOR = 0xECF0F1,
	INITIAL_DROPSPEED = 2;

var stage = new PIXI.Container();

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(RENDERER_X, RENDERER_Y);
renderer.backgroundColor = RENDERER_COLOR;

window.onload = function () {

	// add renderer to div where it's supposed to go
	document.getElementById('app').appendChild(renderer.view);

	// start the game animation loop
	requestAnimationFrame(animate);
};


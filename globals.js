// problem here: the blocks themselves are fixed sized sprites

var app = $('#app');

var RENDERER_X = app.width(),
    RENDERER_Y = app.height(),
    ROW_SIZE = 12,
    BLOCK_SIZE = RENDERER_X / ROW_SIZE,
    BLOCK_HALF = BLOCK_SIZE / 2,
    RENDERER_COLOR = 0xA9A9A9,
    INITIAL_DROPSPEED = 2;
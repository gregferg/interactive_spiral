var DepthLine = require('./depth_line.js');
var CurlyDepthLine = require('./curly_depth_line.js');
var Circle = require('./circle.js');
var Square = require('./square.js');
var SquareSquare = require('./square_square.js');
var MouseMoveView = require('./mouse_move_view.js');
var MouseMove = require('./mouse_move.js');

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  var ctx = canvasEl.getContext("2d");
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight - 4;

  var center = [window.innerWidth / 2, window.innerHeight / 2];

  var mouseMove = new MouseMove(center, center, center, ctx);
  var mouseMoveView = new MouseMoveView(mouseMove, ctx);
  mouseMoveView.start();

  window.addEventListener("mousemove", function(e) {
    mouseMove.updatePos([e.x, e.y]);
  });

  window.addEventListener("click", function(e) {
    CurlyDepthLine.toggleCollapseRate();
  });

  var MouseWheelHandler = function(e) {
    CurlyDepthLine.changeDeltaOfCollapse(e.deltaY);
  };

	// IE9, Chrome, Safari, Opera
	canvasEl.addEventListener("mousewheel", MouseWheelHandler, false);
	// Firefox
	canvasEl.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
});

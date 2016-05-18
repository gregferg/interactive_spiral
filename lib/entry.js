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
  canvasEl.height = window.innerHeight;

  var center = [window.innerWidth / 2, window.innerHeight / 2];

  var mouseMove = new MouseMove(center, center, center, ctx);
  var mouseMoveView = new MouseMoveView(mouseMove, ctx);
  console.log(mouseMove);
  console.log(mouseMoveView);
  mouseMoveView.start();

  window.addEventListener("mousemove", function(e) {
    mouseMove.updatePos([e.x, e.y]);
    // var start = [e.x, e.y];
    // new Circle(start, center, ctx);
  });
  // window.addEventListener("mousemove", function(e) {
  //   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  //   var start = [e.x, e.y];
  //   new Circle(start, center, ctx);
  // });
});

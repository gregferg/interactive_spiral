var Circle = require('./circle');
var Util = require("./util");

var MouseMove = function(prevMove, currentMove, center, ctx) {
  this.pos = currentMove;
  this.center = center;
  this.ctx = ctx;
  this.moving = false;

  this.delta =
    Util.scale(Util.dir(
      [currentMove[0] - prevMove[0],
    currentMove[1] - prevMove[1]]
  ), 1);
};

MouseMove.prototype.updatePos = function(newPos) {
  this.delta =
    Util.scale(Util.dir(
      [newPos[0] - this.pos[0],
    newPos[1] - this.pos[1]]
  ), 1);

  this.moving = true;
  this.pos = newPos;
};

var NORMAL_FRAME_TIME_DELTA = 1000/60;
MouseMove.prototype.step = function (timeDelta) {
  if (!this.moving) {return ;}

  //timeDelta is number of milliseconds since last move
  //if the computer is busy the time delta will be larger
  //in this case the MovingObject should move farther in this frame
  //velocity of object is how far it should move in 1/60th of a second
  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.delta[0] * velocityScale,
      offsetY = this.delta[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  this.moving = false;
};


MouseMove.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  new Circle(this.pos, this.center, ctx);
};

module.exports = MouseMove;

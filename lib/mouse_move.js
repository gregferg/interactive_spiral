var Circle = require('./circle');
var Util = require("./util");

var MouseMove = function(prevMove, currentMove, center, ctx) {
  this.pos = currentMove;
  this.center = center;
  this.ctx = ctx;
  this.moving = false;
  this.targetPos = currentMove;


  this.delta =
    Util.scale(Util.dir(
      [currentMove[0] - prevMove[0],
    currentMove[1] - prevMove[1]]
  ), 2);
};

MouseMove.prototype.updatePos = function(targetPos) {
  this.targetPos = targetPos;
  this.moving = true;
};

MouseMove.prototype.step = function(timeDelta) {
  this.move(timeDelta);

  if (Util.dist(this.targetPos, this.pos) < .2) {
    this.moving = false;
  }
};

var NORMAL_FRAME_TIME_DELTA = 1000/60;
MouseMove.prototype.move = function (timeDelta) {
  if (!this.moving) {return ;}

    var scale = Math.pow(Util.dist(this.targetPos, this.pos) / 50, 2);

    if (scale > 20) { scale = 20; }
    // var scale = Math.sqrt(Util.dist(this.targetPos, this.pos)) / 3;
    console.log(scale);


    this.delta =
      Util.scale(Util.dir(
        [this.targetPos[0] - this.pos[0],
      this.targetPos[1] - this.pos[1]]
    ), scale);

  //timeDelta is number of milliseconds since last move
  //if the computer is busy the time delta will be larger
  //in this case the MovingObject should move farther in this frame
  //velocity of object is how far it should move in 1/60th of a second
  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.delta[0] * velocityScale,
      offsetY = this.delta[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
};


MouseMove.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  new Circle(this.pos, this.center, ctx);
};

module.exports = MouseMove;

var MouseMoveView = function (mouseMove, ctx) {
  this.ctx = ctx;
  this.mouseMove = mouseMove;
};


MouseMoveView.prototype.start = function () {
  this.lastTime = 0;
  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

MouseMoveView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;

  this.mouseMove.step(timeDelta);
  this.mouseMove.draw(this.ctx);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = MouseMoveView;

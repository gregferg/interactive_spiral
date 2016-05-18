var Util = require('./util');


var DepthLine = function(start, end, ctx) {
  this.start = start;
  this.end = end;
  this.ctx = ctx;

  this.draw();
};


DepthLine.prototype.draw = function() {
  var vec = Util.scale(
    [this.start[0],
    this.start[1]],
    1
  );
  
  var startingPos = vec;
  var startingRadius = 10;

  for (var i = 0; i < 7; i++) {
    this.drawNodes(startingPos, startingRadius);

    startingPos = this.nextPoint(startingPos);
    startingRadius = startingRadius * .7;
  }
};

DepthLine.prototype.nextPoint = function(prevPos) {
  return [
    (prevPos[0] - this.end[0]) * .9 + this.end[0],
    (prevPos[1] - this.end[1]) * .9 + this.end[1]
  ];
};


DepthLine.prototype.drawNodes = function(pos, radius) {
  var ctx = this.ctx;

  ctx.beginPath();
  ctx.moveTo(pos[0], pos[1]);
  ctx.arc(
    pos[0], pos[1], radius, 0, 2 * Math.PI, true
  );
  ctx.fill();

};

module.exports = DepthLine;

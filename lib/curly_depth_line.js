var Util = require('./util');


var CurlyDepthLine = function(start, end, ctx) {
  this.start = start;
  this.end = end;
  this.ctx = ctx;
  this.radius = Util.dist(start, end);
  this.startingAngle = this.calculateStartingAngle(start,end);
  this.draw();
};


CurlyDepthLine.prototype.draw = function() {
  var vec = Util.scale(
    [this.start[0],
    this.start[1]],
    1
  );
  var startingPos = vec;
  var startingAngle = this.startingAngle;
  var startingRadius = 12;
  var radius = this.radius * .9;
  var rateOfCollapse = .9;

  for (var i = 0; i < 25; i++) {
    this.drawNode(startingPos, startingRadius);

    startingAngle = this.nextAngle(startingAngle);
    startingPos = this.nextPoint(radius, startingAngle);
    radius *= rateOfCollapse;
    // rateOfCollapse -= .1;
    startingRadius = startingRadius * .9;
  }
};


CurlyDepthLine.prototype.calculateStartingAngle = function(start, end) {
  var loopAngle = start[0] - end[0];
  // if (loopAngle < 0) { loopAngle = loopAngle + Math.PI; }
  return Math.atan((start[1] - end[1]) / loopAngle);
};

CurlyDepthLine.prototype.nextAngle = function(prevAngle) {
  var newAngle = prevAngle + Math.PI / 12;
  if (newAngle > Math.PI * 2) {
    newAngle = newAngle % (Math.PI * 2);
  }

  return newAngle;
};


CurlyDepthLine.prototype.nextPoint = function(prevRadius, prevAngle) {
  // Since cos and sin can only return positive given some inputs,
  // this checks to see if the point needs to be mirrored to negative or not
  var mirror = 1;

  if (this.start[0] - this.end[0] < 0) {
    mirror = -1;
  }

  return [
    this.end[0] + prevRadius * Math.cos(prevAngle) * mirror,
    this.end[1] + prevRadius * Math.sin(prevAngle) * mirror
  ];
};


CurlyDepthLine.prototype.drawNode = function(pos, radius) {
  var ctx = this.ctx;

  ctx.beginPath();
  ctx.moveTo(pos[0], pos[1]);
  ctx.arc(
    pos[0], pos[1], radius, 0, 2 * Math.PI, true
  );
  ctx.fill();

};

module.exports = CurlyDepthLine;

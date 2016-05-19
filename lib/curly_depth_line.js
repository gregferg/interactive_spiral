var Util = require('./util');


var CurlyDepthLine = function(start, end, ctx) {
  this.start = start;
  this.end = end;
  this.ctx = ctx;
  this.radius = Util.dist(start, end);
  this.startingAngle = this.calculateStartingAngle(start,end);
  this.draw();
};

var fastCollapse = false;

var collapseRate = function(rateOfCollapse) {
  return fastCollapse ? Math.pow(rateOfCollapse, 2) : rateOfCollapse;
};

var collapseRateSizeRadius = function(rateOfCollapse) {
  return fastCollapse ? rateOfCollapse * .9 : rateOfCollapse * .9;
};

var collapseRateRadius = function(rateOfCollapse) {
  return fastCollapse ? rateOfCollapse * .96 : rateOfCollapse * .9;
};

CurlyDepthLine.toggleCollapseRate = function(){
  fastCollapse ? fastCollapse = false : fastCollapse = true;
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
  var radius = this.radius;
  var rateOfCollapse = .9;

  for (var i = 0; i < 25; i++) {
    startingAngle = this.nextAngle(startingAngle);
    startingPos = this.nextPoint(radius, startingAngle);
    radius = collapseRateRadius(radius);
    rateOfCollapse = collapseRate(rateOfCollapse);
    startingRadius = collapseRateSizeRadius(startingRadius);

    this.drawNode(startingPos, startingRadius);
  }
};


CurlyDepthLine.prototype.calculateStartingAngle = function(start, end) {
  return Math.atan((start[1] - end[1]) / (start[0] - end[0]));
};

CurlyDepthLine.prototype.nextAngle = function(prevAngle) {
  return prevAngle + Math.PI / 12;
};


CurlyDepthLine.prototype.nextPoint = function(prevRadius, prevAngle) {
  // Since cos and sin can only return positive given some inputs,
  // this checks to see if the point needs to be mirrored to negative or not
  // so that the next circles are not reflected
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

var DepthLine = require('./depth_line');
var CurlyDepthLine = require('./curly_depth_line');

var Circle = require('./circle.js');

var Helix = function(start, end, ctx) {
  this.start = start;
  this.end = end;
  this.ctx = ctx;

  this.createHelix();
};

var circlez = [
  [0,-2],
  [0,2]
];

Helix.prototype.createHelix = function() {
  var self = this;
  circlez.forEach(function(pos) {
    var startPos = [pos[0] * 50 + self.start[0], pos[1] * 50 + self.start[1]];
    var endPos = [pos[0] * 1 + self.end[0], pos[1] * 1 + self.end[1]];
    new CurlyDepthLine(startPos, endPos, self.ctx);
  });
};


module.exports = Helix;

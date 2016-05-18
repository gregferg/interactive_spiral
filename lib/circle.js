var DepthLine = require('./depth_line');
var Square = require('./square');
var CurlyDepthLine = require('./curly_depth_line');

var Circle = function(start, end, ctx) {
  this.start = start;
  // this.end = this.calculateEnd(start, end);
  this.end = end;
  this.ctx = ctx;
  this.createCircle();
};

var circlez = [];

Circle.prototype.calculateEnd = function(start, end) {
  return [
    end[0] - (start[0] - end[0]),
    end[1] - (start[1] - end[1]),
  ];
};

var calculateCirclez = function() {
  var angle = 0;
  while (angle < Math.PI * 2) {
    circlez.push(
      [
        2 * Math.cos(angle),
        2 * Math.sin(angle)
      ]
    );

    angle += Math.PI / 12;
  }
};

calculateCirclez();

Circle.prototype.createCircle = function() {
  var self = this;
  circlez.forEach(function(pos) {
    var startPos = [pos[0] * 100 + self.start[0], pos[1] * 100 + self.start[1]];
    var endPos = [pos[0] * 1 + self.end[0], pos[1] * 1 + self.end[1]];
    new CurlyDepthLine(startPos, endPos, self.ctx);
  });
};


module.exports = Circle;

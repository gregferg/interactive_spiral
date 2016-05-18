var DepthLine = require('./depth_line');
var CurlyDepthLine = require('./curly_depth_line');

var Square = function(start, end, ctx) {
  this.start = start;
  this.end = end;
  this.ctx = ctx;

  this.createSquare();
};

var squarez = [
  [-2,-2],
  [-2,-1],
  [-2,0],
  [-2,1],
  [-2,2],
  [2,-2],
  [2,-1],
  [2,0],
  [2,1],
  [2,2],
  [1,-2],
  [0,-2],
  [-1,-2],
  [1,2],
  [0,2],
  [-1,2]
];

Square.prototype.createSquare = function() {
  var self = this;
  squarez.forEach(function(pos) {
    var startPos = [pos[0] * 50 + self.start[0], pos[1] * 50 + self.start[1]];
    var endPos = [pos[0] * 1 + self.end[0], pos[1] * 1 + self.end[1]];
    new CurlyDepthLine(startPos, endPos, self.ctx);
  });
};


module.exports = Square;

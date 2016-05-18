var Square = require('./square');

var SquareSquare = function(start, end, ctx) {
  this.start = start;
  this.end = end;
  this.ctx = ctx;


  this.createSquare();
};

var squarez = [
  [-2,-2],
  [-2,2],
  [2,-2],
  [2,2]
];

SquareSquare.prototype.createSquare = function() {
  var self = this;
  squarez.forEach(function(pos) {
    var startPos = [pos[0] * 50 + self.start[0], pos[1] * 50 + self.start[1]];
    var endPos = [pos[0] * 5 + self.end[0], pos[1] * 5 + self.end[1]];

    new Square(startPos, endPos, self.ctx);
  });
};


module.exports = SquareSquare;

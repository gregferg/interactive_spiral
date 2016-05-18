/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DepthLine = __webpack_require__(1);
	var CurlyDepthLine = __webpack_require__(9);
	var Circle = __webpack_require__(10);
	var Square = __webpack_require__(7);
	var SquareSquare = __webpack_require__(8);
	var MouseMoveView = __webpack_require__(11);
	var MouseMove = __webpack_require__(12);
	
	document.addEventListener("DOMContentLoaded", function(){
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  var ctx = canvasEl.getContext("2d");
	  canvasEl.width = window.innerWidth;
	  canvasEl.height = window.innerHeight;
	
	  var center = [window.innerWidth / 2, window.innerHeight / 2];
	
	  var mouseMove = new MouseMove(center, center, center, ctx);
	  var mouseMoveView = new MouseMoveView(mouseMove, ctx);
	  console.log(mouseMove);
	  console.log(mouseMoveView);
	  mouseMoveView.start();
	
	  window.addEventListener("mousemove", function(e) {
	    mouseMove.updatePos([e.x, e.y]);
	    // var start = [e.x, e.y];
	    // new Circle(start, center, ctx);
	  });
	  // window.addEventListener("mousemove", function(e) {
	  //   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	  //   var start = [e.x, e.y];
	  //   new Circle(start, center, ctx);
	  // });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	
	
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


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	var Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir: function (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist: function (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm: function (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec : function (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale: function (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	};
	
	module.exports = Util;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var DepthLine = __webpack_require__(1);
	var CurlyDepthLine = __webpack_require__(9);
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Square = __webpack_require__(7);
	
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	
	
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var DepthLine = __webpack_require__(1);
	var Square = __webpack_require__(7);
	var CurlyDepthLine = __webpack_require__(9);
	
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


/***/ },
/* 11 */
/***/ function(module, exports) {

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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Circle = __webpack_require__(10);
	var Util = __webpack_require__(6);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
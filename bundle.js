/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Dancer = __webpack_require__(2);
const Notes = __webpack_require__(3);

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  dancer = new Dancer(stage);

  $('body').on('keydown', function(e){
    switch (e.which) {
      case 74:
        dancer.animate("slap")
        break;
      case 75:
        dancer.animate("spin")
        break;
      case 76:
        dancer.animate("baloon")
        break;
    }
  })

  notes = new Notes(stage);

  for (var i = 1; i < 5; i++) {
    notes.scroll(i);
  }

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var dancerData = {
    images: ["./assets/images/dancer_sheet.png"],
    frames: {width:110, height:128},
    animations: {
      waiting: [0, 7, "waiting"],
      pat: [8,15],
      raise: [16, 23],
      sway: [24, 31],
      slap: [32, 39, "waiting"],
      yes: [40, 47],
      spin: [48, 55, "waiting"],
      go: [56, 63],
      baloon: [64, 71, "waiting"],
      zen: [72, 79]
    },
    framerate: 12
};
  var dancerSpriteSheet = new createjs.SpriteSheet(dancerData);

class Dancer {
  constructor(stage) {
    this.stage = stage;
    this.dancerAnimation = new createjs.Sprite(dancerSpriteSheet, "waiting");
    this.dancerAnimation.x = 150;
    this.dancerAnimation.y = 100;
    this.stage.addChild(this.dancerAnimation)
  }

  animate(move){
    // dancerAnimation.gotoAndStop("go");
    this.dancerAnimation.gotoAndPlay(move);
    // this.stage.addChild(this.dancerAnimation);
  }
}

module.exports = Dancer;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var note1 = new createjs.Shape();
note1.graphics.beginFill("violet").drawRect(550, 20, 15, 10);

var note2 = new createjs.Shape();
note2.graphics.beginFill("teal").drawRect(600, 20, 15, 10);

var note3 = new createjs.Shape();
note3.graphics.beginFill("tomato").drawRect(650, 20, 15, 10);

var note4 = new createjs.Shape();
note4.graphics.beginFill("maroon").drawRect(700, 20, 15, 10);

var Note = {
  1 : note1,
  2: note2,
  3: note3,
  4: note4
}

class Notes {
  constructor(stage){
    this.stage = stage;
  }

  scroll(noteID){
    this.stage.addChild(Note[noteID])
    createjs.Tween.get(Note[noteID], { loop: true })
    .to({ y: 390 }, 1500, createjs.Ease.getPowInOut(1))
  }
}

module.exports = Notes;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
const Song = __webpack_require__(4);
const Sheet = __webpack_require__(5);

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  var background1 = new Image()
  var background2 = new Image()
  background1.src = "./assets/images/outside.png"
  background2.src = "./assets/images/sunset.png"
  var back1 = new createjs.Bitmap(background1);
  var back2 = new createjs.Bitmap(background2);
  back1.setTransform(0, -80, .16, .16)
  back2.setTransform(525, 0, .3, .3)
  stage.addChild(back1)
  stage.addChild(back2)


  var dancer = new Dancer(stage);

  var song = new Song(1);
  $('#play').click((e) => {
    sheet.reset()
    song.play()
  })

  var note = new Notes(stage)
  var sheet = new Sheet(note)

  $('body').on('keydown', (e)=>{
    switch (e.which) {
      case 74:
        sheet.strike(1)
        break;
      case 75:
        sheet.strike(2)
        break;
      case 76:
        sheet.strike(3)
        break;
      case 186:
        sheet.strike(4)
        break;
    }
  })

  var bar = new createjs.Shape();
  bar.graphics.beginFill("lightsteelblue")
              .drawRect(550, 300, 160, 10)
  stage.addChild(bar)


  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick(event){
    if (song.currentTime() > .01 && song.currentTime() < 13.02){
      sheet.setCurrentTime(song.currentTime())
      sheet.play()
    }

    stage.update(event)
  }
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const dancerData = {
    images: ["./assets/images/dancer_sheet.png"],
    frames: {width:110, height:128},
    animations: {
      waiting: [0, 7, "waiting"],
      pat: [8,15],
      raise: [16, 19, "waiting"],
      sway: [24, 31],
      slap: [32, 35, "waiting"],
      yes: [40, 47],
      spin: [48, 55, "waiting"],
      go: [56, 63],
      baloon: [64, 71, "waiting"],
      zen: [72, 79]
    },
    framerate: 16
};
  var dancerSpriteSheet = new createjs.SpriteSheet(dancerData);

class Dancer {
  constructor(stage) {
    this.stage = stage;
    this.dancerAnimation = new createjs.Sprite(dancerSpriteSheet, "waiting");
    // this.dancerAnimation.x = 235;
    // this.dancerAnimation.y = 250;
    this.dancerAnimation.setTransform(262, 138, 1.3, 1.3)
    this.stage.addChild(this.dancerAnimation);
    $('body').on('keydown', (e)=>{
      switch (e.which) {
        case 74:
          this.animate("raise")
          break;
        case 75:
          this.animate("slap")
          break;
        case 76:
          this.animate("spin")
          break;
        case 186:
          this.animate("baloon")
          break;
      }
    })
  }

  animate(move){
    this.dancerAnimation.gotoAndPlay(move);
  }
}

module.exports = Dancer;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Note = {
  1: {color: "violet", xCoord: 550},
  2: {color: "teal", xCoord: 600},
  3: {color: "tomato", xCoord: 650},
  4: {color: "maroon", xCoord: 700}
}

class Notes {
  constructor(stage){
    this.stage = stage;
  }

  scroll(noteID){
    var note = new createjs.Shape();
    let xCoord = Note[noteID].xCoord;

    note.graphics.beginFill(Note[noteID].color)
                 .drawRect(xCoord, 25, 15, 10)
    createjs.Tween.get(note, {override: true})
    .to({ y: 275 }, 1000)

    this.stage.addChild(note)
  }
}

module.exports = Notes;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Songs = {
  1: "./assets/sounds/POL-chubby-cat-short.wav"
}

class Song {
  constructor(songID){
    this.song = new Audio();
    this.song.src = Songs[songID];
  }

  play(){
    this.song.play();
    // sheet.play()
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Song1 = [
  {time: 1, noteID: 1},
  // {time: 1.5, noteID: 2},
  {time: 2, noteID: 1},
  // {time: 2.5, noteID: 2},
  {time: 3, noteID: 3},
  // {time: 3.5, noteID: 4},
  {time: 4, noteID: 2},
  {time: 5, noteID: 3},
  {time: 6, noteID: 1},
  {time: 7, noteID: 1},
  {time: 8, noteID: 3},
  {time: 9, noteID: 2},
  {time: 10, noteID: 3},
  {time: 11, noteID: 1},
  {time: 12, noteID: 2},
  {time: 13, noteID: 2},
  {time: 14, noteID: 1}
]
// const Song1 = [
//   {time: .5, noteID: 1},
//   {time: .7, noteID: 1},
//   {time: .8, noteID: 3},
//   {time: 1.2, noteID: 2},
//   {time: 1.25, noteID: 3},
//   {time: 1.5, noteID: 1},
//   {time: 2.7, noteID: 1},
//   {time: 3.8, noteID: 3},
//   {time: 5.2, noteID: 2},
//   {time: 6.25, noteID: 3},
//   {time: 9.5, noteID: 1},
//   {time: 10.7, noteID: 1}
// ]

class Sheet {
  constructor(note){
    this.note = note;
    this.i = 0
    this.j = 0
    this.currentTime = 0
  }

  setCurrentTime(currentTime){
    this.currentTime = currentTime;
    if (this.j < Song1.length) {
      if ((this.currentTime) > (Song1[this.j].time +1.1)){
        this.j += 1;
      }
    }

  }
  play(){
    if (this.i < Song1.length) {
      if (this.currentTime > Song1[this.i].time){
        this.note.scroll(Song1[this.i].noteID)
        this.i += 1;
      }
    }
  }

  strike(noteID){
    // console.log("time")
    // console.log(Song1[this.j].time)
    if(this.currentTime < ( Song1[this.j].time+1.1) && this.currentTime > (Song1[this.j].time + 0.9)){
      console.log("correct!")
    }else{
      console.log("wrong!")
    }
    console.log(this.currentTime)
    // console.log("noteID")
    // console.log(Song1[this.j].noteID)
  }


  reset(){
    this.i = 0
  }
}

module.exports = Sheet;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const dancerData = {
    images: ["./assets/images/dancer_sheet.png"],
    frames: {width:110, height:128},
    animations: {
      waiting: [0, 7, "waiting"],
      pat: [8, 15, "waiting"],
      raise: [16, 19, "waiting"],
      sway: [24, 31, "waiting"],
      slap: [32, 35, "waiting"],
      yes: [40, 47, "waiting"],
      spin: [48, 55, "waiting"],
      go: [56, 61, "waiting"],
      baloon: [64, 71, "waiting"],
      zen: [72, 79, "waiting"]
    },
    framerate: 12
};
  var dancerSpriteSheet = new createjs.SpriteSheet(dancerData);

class Dancer {
  constructor(stage) {
    this.stage = stage;
    this.dancerAnimation = new createjs.Sprite(dancerSpriteSheet, "waiting");
    this.dancerAnimation.setTransform(142, 190, 1.3, 1.3)
    this.stage.addChild(this.dancerAnimation);
    $('body').on('keydown', (e)=>{
      switch (e.which) {
        case 74:
          this.animate("go")
          break;
        case 75:
          this.animate("slap")
          break;
        case 76:
          this.animate("spin")
          break;
        case 186:
          this.animate("zen")
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
/* 1 */
/***/ (function(module, exports) {

class Feedback {
  constructor(stage){
    this.stage = stage
  }

  streak(num){
    var feed = new createjs.Text(num, "50px Arial", "yellowgreen");
    feed.x = 100
    feed.y = 150

    createjs.Tween.get(feed, {override: true})
    .to({ y: 420 }, 1500)
    this.stage.addChild(feed)

    let audiofeed = new Audio();
    audiofeed.src = "./assets/sounds/funky_AJ.m4a";
    audiofeed.play();

  }
  
  perfect(){
    var feed = new createjs.Text("PERFECT SCORE", "30px Arial", "salmon");
    feed.x = 200
    feed.y = 150

    createjs.Tween.get(feed, {override: true})
    .to({ y: 400 }, 5000)
    this.stage.addChild(feed)
  }
}

module.exports = Feedback


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Note = {
  1: {color: "#9cdaff", xCoord: 450},
  2: {color: "#c568a5", xCoord: 500},
  3: {color: "#ffd265", xCoord: 550},
  4: {color: "#bcff7c", xCoord: 600}
}

class Notes {
  constructor(stage){
    this.stage = stage;
    this.note = Note;
  }

  scroll(noteID){
    var note = new createjs.Shape();
    let xCoord = Note[noteID].xCoord;

    note.graphics.beginFill(Note[noteID].color)
                 .drawEllipse(xCoord, 25, 25, 20)
    createjs.Tween.get(note, {override: true})
    .to({ y: 325 }, 1500)
    // .to({ y: 625 }, 1000)

    this.stage.addChild(note)
  }
}

module.exports = Notes;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Song1 = [
  {time: 1.65, noteID: 1},
  {time: 2.2, noteID: 2},
  {time: 2.75, noteID: 1},
  {time: 3.3, noteID: 2},
  {time: 3.85, noteID: 1},
  {time: 4.125, noteID: 1},
  {time: 4.4, noteID: 3},
  {time: 4.95, noteID: 1},
  {time: 5.5, noteID: 2},
  {time: 6.05, noteID: 1},
  {time: 6.6, noteID: 2},
  {time: 7.7, noteID: 4},
  {time: 8.8, noteID: 1},
  {time: 9.35, noteID: 2},
  {time: 9.9, noteID: 1},
  {time: 10.45, noteID: 2},
  {time: 11, noteID: 3},
  {time: 12.1, noteID: 1},
  {time: 12.6, noteID: 2},
  {time: 13.15, noteID: 1},
  {time: 14.25, noteID: 1},
  {time: 14.8, noteID: 2},
  {time: 15.35, noteID: 1},
  {time: 16.45, noteID: 3},
  {time: 17, noteID: 3},
]

class Sheet {
  constructor(note, feedback, stage){
    this.stage = stage;
    this.note = note;
    this.feedback = feedback;
    this.i = 0;
    this.j = 0;
    this.currentTime = 0;
    this.score = 0;
    this.streak = 0;
    this.correctStrike = this.correctStrike.bind(this);
    this.wrongStrike = this.wrongStrike.bind(this);
    this.renderStrike = this.renderStrike.bind(this);
  }

  setCurrentTime(currentTime){
    this.currentTime = currentTime;
    if (this.j < Song1.length) {
      if ((this.currentTime) > (Song1[this.j].time +0.1)){
        this.j += 1;
      }
    }
  }

  play(){
    if (this.i < Song1.length) {
      if (this.currentTime > (Song1[this.i].time - 1.5) ){
        this.note.scroll(Song1[this.i].noteID)
        this.i += 1;
      }
    }
  }

  correctStrike(noteID){
    this.score += 1;
    this.streak += 1;
    $("#score").html(this.score)
    $("#streak").html(this.streak)

    this.renderStrike(noteID, "black");

    if (this.streak === 5) this.feedback.streak("5 pt streak!");
    if (this.streak === 15) this.feedback.streak("15 pt streak!");
    if (this.streak === 25) this.feedback.perfect();
  }

  wrongStrike(noteID){
    this.streak = 0;
    $("#streak").html(this.streak)

    let noFx = new Audio();
    noFx.src = "./assets/sounds/no_fx.mp3";
    noFx.volume = .2;
    noFx.play();

    this.renderStrike(noteID, "red");
  }

  renderStrike(noteID, color){
    let xCoord = this.note.note[noteID].xCoord
    var strikeNote = new createjs.Shape();
    strikeNote.graphics.beginFill(color)
                   .drawEllipse((xCoord - 2), 348, 29, 24)
    this.stage.addChild(strikeNote);

    strikeNote.alpha = (color === "red") ? 0.55 : .35;
    setTimeout(()=>this.stage.removeChild(strikeNote), 130)
  }

  strike(noteID){
    if(this.currentTime < (Song1[this.j].time+ 0.1)
    && this.currentTime > (Song1[this.j].time - 0.1)
    && noteID === Song1[this.j].noteID){
      this.correctStrike(noteID)
    }else{
      this.wrongStrike(noteID)
    }
  }

  reset(){
    this.i = 0;
    this.j = 0;
    this.score = 0;
    this.streak = 0;
    $("#score").html(0)
    $("#streak").html(0)
  }
}

module.exports = Sheet;


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
    this.song.volume = 0.3;

    this.shallWe = new Audio();
    this.shallWe.src = "./assets/sounds/shall_we_AJ.m4a";
  }

  play(){
      this.shallWe.play();
      setTimeout(()=> this.song.play(), 2000);
  }

  duration(){
    return this.song.duration
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Dancer = __webpack_require__(0);
const Notes = __webpack_require__(2);
const Song = __webpack_require__(4);
const Sheet = __webpack_require__(3);
const Feedback = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  var background1 = new Image()
  var background2 = new Image()
  background1.src = "./assets/images/outside.png"
  background2.src = "./assets/images/fragile-soft-machine.png"
  var back1 = new createjs.Bitmap(background1);
  var back2 = new createjs.Bitmap(background2);
  back1.setTransform(0, -200, .2, .2)
  back2.setTransform(415, -170, .3, .3)
  stage.addChild(back1)
  stage.addChild(back2)


  var dancer = new Dancer(stage);

  var song = new Song(1);
  $('#play').click((e) => {
    if (song.currentTime() === 0 || song.currentTime() === song.duration()){
      sheet.reset()
      song.play()
    }
  })

  var note = new Notes(stage)
  var feedback = new Feedback(stage)
  var sheet = new Sheet(note, feedback, stage)

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
  bar.graphics.beginFill("teal")
              .drawRect(460, 350, 150, 20)
  stage.addChild(bar)

  var note1 = new createjs.Shape();
  note1.graphics.beginFill("#9cdaff")
               .drawEllipse(450, 350, 25, 20)
  var note2 = new createjs.Shape();
  note2.graphics.beginFill("#c568a5")
               .drawEllipse(500, 350, 25, 20)
  var note3 = new createjs.Shape();
  note3.graphics.beginFill("#ffd265")
               .drawEllipse(550, 350, 25, 20)
  var note4 = new createjs.Shape();
  note4.graphics.beginFill("#bcff7c")
               .drawEllipse(600, 350, 25, 20)

stage.addChild(note1, note2, note3, note4)


  createjs.Ticker.setFPS(55);
  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick(event){
    if (song.currentTime() > .0001 && song.currentTime() < 17.02){
      sheet.setCurrentTime(song.currentTime())
      sheet.play()
    }
    if (song.currentTime() > 17 && song.currentTime() < 17.02) {
      let soGood = new Audio();
      soGood.src = "./assets/sounds/so_good_AJ.m4a";
      soGood.play()
    }
    stage.update(event)
  }
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
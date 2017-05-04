const Dancer = require('./dancer');
const Notes = require('./notes');

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  dancer = new Dancer(stage);
  dancer.animate("go");

  notes = new Notes(stage);

  for (var i = 1; i < 5; i++) {
    notes.scroll(i);
  }
 
  // var button = new createjs.Shape();
  // button.graphics.beginFill("red").drawRect(200, 300, 60, 30);
  // stage.addChild(button)


  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
});

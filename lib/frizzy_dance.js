const Dancer = require('./dancer');
const Notes = require('./notes');

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

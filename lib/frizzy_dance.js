const Dancer = require('./dancer');
const Notes = require('./notes');
const Song = require('./song');
const Sheet = require('./sheet');

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

const Dancer = require('./dancer');
const Notes = require('./notes');
const Song = require('./song');
const Sheet = require('./sheet');
const Feedback = require('./feedback');

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  var background1 = new Image()
  var background2 = new Image()
  background1.src = "./assets/images/outside.png"
  background2.src = "./assets/images/fragile-soft-machine.png"
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
  var feedback = new Feedback(stage)
  var sheet = new Sheet(note, feedback)

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

  var note1 = new createjs.Shape();
  note1.graphics.beginFill("violet")
               .drawRect(550, 300, 15, 10)
  var note2 = new createjs.Shape();
  note2.graphics.beginFill("teal")
               .drawRect(600, 300, 15, 10)
  var note3 = new createjs.Shape();
  note3.graphics.beginFill("tomato")
               .drawRect(650, 300, 15, 10)
  var note4 = new createjs.Shape();
  note4.graphics.beginFill("maroon")
               .drawRect(700, 300, 15, 10)

stage.addChild(note1, note2, note3, note4)


  createjs.Ticker.setFPS(55);
  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick(event){
    if (song.currentTime() > .01 && song.currentTime() < 17.02){
      sheet.setCurrentTime(song.currentTime())
      sheet.play()
    }

    stage.update(event)
  }
});

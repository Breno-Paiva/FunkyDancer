const Dancer = require('./dancer');
const Notes = require('./notes');
const Song = require('./song');

document.addEventListener('DOMContentLoaded', ()=> {

  const gameCanvas = document.getElementById('gameCanvas');
  var stage = new createjs.Stage(gameCanvas);

  var dancer = new Dancer(stage);

  var song = new Song(1);
  $('#play').click((e) => {
    song.play()
  })

  $('body').on('keydown', (e)=>{
    if (e.which === 74) {
      var note1 = new createjs.Shape();
      note1.graphics.beginFill("violet").drawRect(550, 20, 15, 10);
      createjs.Tween.get(note1, {override: true})
      .to({ y: 390 }, 1500)
      stage.addChild(note1)
    }
  })
  $('body').on('keydown', (e)=>{
    if (e.which === 75) {
      var note2 = new createjs.Shape();
      note2.graphics.beginFill("teal").drawRect(600, 20, 15, 10);
      createjs.Tween.get(note2, {override: true})
      .to({ y: 390 }, 1500)
      stage.addChild(note2)
    }
  })
  $('body').on('keydown', (e)=>{
    if (e.which === 76) {
      var note3 = new createjs.Shape();
      note3.graphics.beginFill("tomato").drawRect(650, 20, 15, 10);
      createjs.Tween.get(note3, {override: true})
      .to({ y: 390 }, 1500)
      stage.addChild(note3)
    }
  })




  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick(event){
    if (song.currentTime() > 2 && song.currentTime() < 2.05){
      console.log(song.currentTime())
      return console.log("dope")
    }
    stage.update(event)
  }
});

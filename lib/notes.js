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

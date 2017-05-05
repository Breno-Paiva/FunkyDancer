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
    .to({ y: 525 }, 1000)

    this.stage.addChild(note)
  }
}

module.exports = Notes;

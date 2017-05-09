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

  strike(noteID){
    if(this.currentTime < (Song1[this.j].time+ 0.1)
    && this.currentTime > (Song1[this.j].time - 0.1)
    && noteID === Song1[this.j].noteID){
      console.log("correct!")
      this.score += 1;
      this.streak += 1;
      $("#score").html(this.score)
      $("#streak").html(this.streak)
      // this.feedback.nice();
      let xCoord = this.note.note[noteID].xCoord
      var notez1 = new createjs.Shape();
      notez1.graphics.beginFill("black")
                   .drawEllipse((xCoord - 2), 348, 29, 24)
      notez1.alpha = 0.35;
      this.stage.addChild(notez1);
      setTimeout(()=>this.stage.removeChild(notez1), 130)


      if (this.streak === 5) this.feedback.streak("5 pt streak!");
      if (this.streak === 10) this.feedback.streak("10 pt streak!");
      if (this.streak === 15) this.feedback.streak("15 pt streak!");
      if (this.streak === 20) this.feedback.streak("20 pt streak!");
      if (this.streak === 25) this.feedback.perfect();
    }else{
      console.log("wrong!")

      let xCoord = this.note.note[noteID].xCoord
      var notez2 = new createjs.Shape();
      notez2.graphics.beginFill("red")
                   .drawEllipse((xCoord - 2), 348, 29, 24)
      this.stage.addChild(notez2);
      notez2.alpha = 0.5;
      setTimeout(()=>this.stage.removeChild(notez2), 130)
      this.streak = 0;
      $("#streak").html(this.streak)
    }
  }

  reset(){
    this.i = 0
  }
}

module.exports = Sheet;

// const this.song = [
//   {time: 1.65, noteID: 1},
//   {time: 2.2, noteID: 2},
//   {time: 2.75, noteID: 1},
//   {time: 3.3, noteID: 2},
//   {time: 3.85, noteID: 1},
//   {time: 4.125, noteID: 1},
//   {time: 4.4, noteID: 3},
//   {time: 4.95, noteID: 1},
//   {time: 5.5, noteID: 2},
//   {time: 6.05, noteID: 1},
//   {time: 6.6, noteID: 2},
//   {time: 7.7, noteID: 4},
//   {time: 8.8, noteID: 1},
//   {time: 9.35, noteID: 2},
//   {time: 9.9, noteID: 1},
//   {time: 10.45, noteID: 2},
//   {time: 11, noteID: 3},
//   {time: 12.1, noteID: 1},
//   {time: 12.6, noteID: 2},
//   {time: 13.15, noteID: 1},
//   {time: 14.25, noteID: 1},
//   {time: 14.8, noteID: 2},
//   {time: 15.35, noteID: 1},
//   {time: 16.45, noteID: 3},
//   {time: 17, noteID: 3},
// ]
//
// const Song2 = [
//   {time: 2, noteID: 1},
//   {time: 3, noteID: 1},
//   {time: 4, noteID: 1},
//   {time: 5, noteID: 1},
//   {time: 6, noteID: 1},
//   {time: 7, noteID: 1}
// ]
const SongSheet = {
  1: [
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
  ],
  2: [
    {time: 1.62, noteID: 1},
    {time: 2.16, noteID: 2},
    {time: 2.7, noteID: 1},
    {time: 3.24, noteID: 2},

    {time: 3.78, noteID: 1},
    {time: 4.32, noteID: 2},
    {time: 4.86, noteID: 1},
    {time: 5.4, noteID: 2},
    {time: 5.94, noteID: 1},
    {time: 6.48, noteID: 2},

    {time: 7.02, noteID: 3},
    {time: 7.56, noteID: 3},

    {time: 8.1, noteID: 1},
    {time: 8.64, noteID: 2},
    {time: 9.18, noteID: 1},
    {time: 9.72, noteID: 2},
    {time: 10.26, noteID: 1},
    {time: 10.8, noteID: 2},
    {time: 11.34, noteID: 3},
    {time: 11.88, noteID: 3},

    {time: 12.42, noteID: 1},
    {time: 12.96, noteID: 2},
    {time: 13.5, noteID: 1},
    {time: 14.04, noteID: 2},
    {time: 14.58, noteID: 1},
    {time: 15.12, noteID: 2},
    {time: 15.66, noteID: 3},
    {time: 16.2, noteID: 3},
  ]
}

const StreakBar = require('./streak_bar')

class Sheet {
  constructor(note, feedback, stage, songID){
    this.streakBar = new StreakBar(stage)
    this.note = note;
    this.feedback = feedback;
    this.stage = stage;
    this.song = SongSheet[songID];
    this.i = 0;
    this.j = 0;
    this.currentTime = 0;
    this.score = 0;
    this.correctStrike = this.correctStrike.bind(this);
    this.wrongStrike = this.wrongStrike.bind(this);
    this.renderStrike = this.renderStrike.bind(this);
    this.play = this.play.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
  }

  setCurrentTime(currentTime){
    this.currentTime = currentTime;
    if (this.j < this.song.length) {
      if ((this.currentTime) > (this.song[this.j].time +0.1)){
        this.j += 1;
      }
    }
  }

  play(){
    if (this.i < this.song.length) {
      if (this.currentTime > (this.song[this.i].time - 1.5) ){
        this.note.scroll(this.song[this.i].noteID)
        this.i += 1;
      }
    }
  }

  correctStrike(noteID){
    this.score += 1;
    $("#score").html(this.score)
    this.streakBar.plus()

    this.renderStrike(noteID, "black");

    // if (this.streak === 5) this.feedback.streak("5 pt streak!");
    // if (this.streak === 15) this.feedback.streak("15 pt streak!");
    // if (this.streak === 25) this.feedback.perfect();
  }

  wrongStrike(noteID){
    this.streakBar.clear();

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
    if(this.currentTime < (this.song[this.j].time+ 0.1)
    && this.currentTime > (this.song[this.j].time - 0.1)
    && noteID === this.song[this.j].noteID){
      this.correctStrike(noteID)
    }else{
      this.wrongStrike(noteID)
    }
  }

  reset(){
    this.i = 0;
    this.j = 0;
    this.score = 0;
    this.streakBar.clear()
    $("#score").html(0)
  }
}

module.exports = Sheet;

const Song1 = [
  {time: 1, noteID: 1},
  // {time: 1.5, noteID: 2},
  {time: 2, noteID: 1},
  // {time: 2.5, noteID: 2},
  {time: 3, noteID: 3},
  // {time: 3.5, noteID: 4},
  {time: 4, noteID: 2},
  {time: 5, noteID: 3},
  {time: 6, noteID: 1},
  {time: 7, noteID: 1},
  {time: 8, noteID: 3},
  {time: 9, noteID: 2},
  {time: 10, noteID: 3},
  {time: 11, noteID: 1},
  {time: 12, noteID: 2},
  {time: 13, noteID: 2},
  {time: 14, noteID: 1}
]
// const Song1 = [
//   {time: .5, noteID: 1},
//   {time: .7, noteID: 1},
//   {time: .8, noteID: 3},
//   {time: 1.2, noteID: 2},
//   {time: 1.25, noteID: 3},
//   {time: 1.5, noteID: 1},
//   {time: 2.7, noteID: 1},
//   {time: 3.8, noteID: 3},
//   {time: 5.2, noteID: 2},
//   {time: 6.25, noteID: 3},
//   {time: 9.5, noteID: 1},
//   {time: 10.7, noteID: 1}
// ]

class Sheet {
  constructor(note){
    this.note = note;
    this.i = 0
    this.j = 0
    this.currentTime = 0
  }

  setCurrentTime(currentTime){
    this.currentTime = currentTime;
    if (this.j < Song1.length) {
      if ((this.currentTime) > (Song1[this.j].time +1.1)){
        this.j += 1;
      }
    }

  }
  play(){
    if (this.i < Song1.length) {
      if (this.currentTime > Song1[this.i].time){
        this.note.scroll(Song1[this.i].noteID)
        this.i += 1;
      }
    }
  }

  strike(noteID){
    // console.log("time")
    // console.log(Song1[this.j].time)
    if(this.currentTime < ( Song1[this.j].time+1.1) && this.currentTime > (Song1[this.j].time + 0.9)){
      console.log("correct!")
    }else{
      console.log("wrong!")
    }
    console.log(this.currentTime)
    // console.log("noteID")
    // console.log(Song1[this.j].noteID)
  }


  reset(){
    this.i = 0
  }
}

module.exports = Sheet;

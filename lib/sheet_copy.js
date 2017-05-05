// const Song1 = [
//   {time: .65, noteID: 1},
//   {time: 1.2, noteID: 2},
//   {time: 1.75, noteID: 1},
//   {time: 2.3, noteID: 2},
//   {time: 2.85, noteID: 3},
//   {time: 3.4, noteID: 4},
//   {time: 3.95, noteID: 1},
//   {time: 4.5, noteID: 2},
//   {time: 5.05, noteID: 1},
//   {time: 5.6, noteID: 2},
//   {time: 6.7, noteID: 4}
// ]
//
// class Sheet {
//   constructor(note, feedback){
//     this.note = note;
//     this.feedback = feedback;
//     this.i = 0;
//     this.j = 0;
//     this.currentTime = 0;
//     this.score = 0;
//     this.streak = 0;
//   }
//
//   setCurrentTime(currentTime){
//     this.currentTime = currentTime;
//     if (this.j < Song1.length) {
//       if ((this.currentTime) > (Song1[this.j].time +1.07)){
//         this.j += 1;
//       }
//     }
//   }
//
//   play(){
//     if (this.i < Song1.length) {
//       if (this.currentTime > Song1[this.i].time){
//         this.note.scroll(Song1[this.i].noteID)
//         this.i += 1;
//       }
//     }
//   }
//
//   strike(noteID){
//     if(this.currentTime < (Song1[this.j].time+1.07)
//     && this.currentTime > (Song1[this.j].time + 0.93)
//     && noteID === Song1[this.j].noteID){
//       console.log("correct!")
//       this.score += 1;
//       this.streak += 1;
//       console.log(this.streak)
//       if (this.streak === 4) this.feedback.display("");
//     }else{
//       console.log("wrong!")
//       this.streak = 0;
//     }
//   }
//
//   reset(){
//     this.i = 0
//   }
// }
//
// module.exports = Sheet;

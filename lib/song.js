const Songs = {
  1: "./assets/sounds/POL-chubby-cat-short.wav"
}

class Song {
  constructor(songID){
    this.song = new Audio();
    this.song.src = Songs[songID];
    // $('body').on('keydown', (e)=>{
    //   if (e.which === 84) {
    //     if (this.song.currentTime > 2 && this.song.currentTime < 3) {
    //       console.log("winner")
    //     }else{
    //       console.log(this.song.currentTime);
    //       // console.log(createjs.Ticker.getTime());
    //       const tare = createjs.Ticker.getTime()
    //       console.log(tare)
    //       // console.log(song.currentTime)
    //     }
    //   }
    // })
  }

  play(){
    this.song.play();
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;

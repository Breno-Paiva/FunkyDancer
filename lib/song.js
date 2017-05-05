const Songs = {
  1: "./assets/sounds/POL-chubby-cat-short.wav"
}

class Song {
  constructor(songID){
    this.song = new Audio();
    this.song.src = Songs[songID];
  }

  play(){
    this.song.play();
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;

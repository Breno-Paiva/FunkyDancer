const Songs = {
  1: "./assets/sounds/POL-chubby-cat-short.wav"
}

class Song {
  constructor(songID){
    this.song = new Audio();
    this.song.src = Songs[songID];
    this.song.volume = 0.4;
  }

  play(){
    this.song.play();
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;

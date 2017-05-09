const Songs = {
  1: "./assets/sounds/POL-chubby-cat-short.wav"
}

class Song {
  constructor(songID){
    this.song = new Audio();
    this.song.src = Songs[songID];
    this.song.volume = 0.3;

    this.shallWe = new Audio();
    this.shallWe.src = "./assets/sounds/shall_we_AJ.m4a";
  }

  play(){
      this.shallWe.play();
      setTimeout(()=> this.song.play(), 2000);
  }

  duration(){
    return this.song.duration
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;

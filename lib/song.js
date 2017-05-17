const Songs = {
  1: "./assets/sounds/POL-chubby-cat-short.wav",
  2: "./assets/sounds/funky_song.m4a"
}

class Song {
  constructor(songID){
    this.songID = songID
    this.song = new Audio();
    this.song.src = Songs[songID];
    this.song.volume = 0.3;

    this.shallWe = new Audio();
    this.shallWe.src = "./assets/sounds/shall_we_AJ.m4a";

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  play(){
      this.shallWe.play();
      setTimeout(()=> this.song.play(), 2000);

      $(`#play`).html("||")
      $(".streak-container").css({"transition":"height 2s", "height":"25px"})
  }

  pause(){
    if(this.song.paused){
      this.song.play()
      $(`#play`).html("||")
    }else{
      this.song.pause()
      $(`#play`).html("play")
    }
  }

  duration(){
    return this.song.duration
  }

  currentTime(){
    return this.song.currentTime
  }

}

module.exports = Song;

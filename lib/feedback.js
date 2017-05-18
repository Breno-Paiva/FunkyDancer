class Feedback {
  constructor(stage){
    this.stage = stage
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.funky_text = new createjs.Bitmap("./assets/images/funky_text.png")
    this.funky_text.x = 80;
    this.funky_text.y = 50;
    this.funky_text.scaleX = .25
    this.funky_text.scaleY = .25
  }

  show(){
    let audiofeed = new Audio();
    audiofeed.src = "./assets/sounds/funky_AJ.m4a";
    audiofeed.play();

    this.stage.addChild(this.funky_text);
  }

  hide(){
    this.stage.removeChild(this.funky_text);
  }
  // streak(num){
  //   var feed = new createjs.Text(num, "50px Arial", "yellowgreen");
  //   feed.x = 100
  //   feed.y = 150
  //
  //   createjs.Tween.get(feed, {override: true})
  //   .to({ y: 420 }, 1500)
  //   this.stage.addChild(feed)
  //
  // }
  //
  // perfect(){
  //   var feed = new createjs.Text("PERFECT SCORE", "30px Arial", "salmon");
  //   feed.x = 200
  //   feed.y = 150
  //
  //   createjs.Tween.get(feed, {override: true})
  //   .to({ y: 400 }, 5000)
  //   this.stage.addChild(feed)
  // }
}

module.exports = Feedback

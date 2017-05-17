class Feedback {
  constructor(stage){
    this.stage = stage
  }

  streak(num){
    var feed = new createjs.Text(num, "50px Arial", "yellowgreen");
    feed.x = 100
    feed.y = 150

    createjs.Tween.get(feed, {override: true})
    .to({ y: 420 }, 1500)
    this.stage.addChild(feed)

    let audiofeed = new Audio();
    audiofeed.src = "./assets/sounds/funky_AJ.m4a";
    audiofeed.play();
  }

  perfect(){
    var feed = new createjs.Text("PERFECT SCORE", "30px Arial", "salmon");
    feed.x = 200
    feed.y = 150

    createjs.Tween.get(feed, {override: true})
    .to({ y: 400 }, 5000)
    this.stage.addChild(feed)
  }
}

module.exports = Feedback

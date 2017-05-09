class Feedback {
  constructor(stage){
    this.stage = stage
  }

  nice(){
    var feed = new createjs.Text("NICE!", "15px Arial", "red");
    feed.x = 600
    feed.y = 320

    createjs.Tween.get(feed, {override: true})
    .to({ y: 420 }, 1000)
    this.stage.addChild(feed)
  }

  streak(num){
    var feed = new createjs.Text(num, "20px Arial", "yellow");
    feed.x = 600
    feed.y = 350

    createjs.Tween.get(feed, {override: true})
    .to({ y: 420 }, 1500)
    this.stage.addChild(feed)

    let audiofeed = new Audio();
    audiofeed.src = "./assets/sounds/funky_AJ.m4a";
    audiofeed.play();

  }
  perfect(){
    var feed = new createjs.Text("PERFECT SCORE", "30px Arial", "salmon");
    feed.x = 400
    feed.y = 150

    createjs.Tween.get(feed, {override: true})
    .to({ y: 400 }, 5000)
    this.stage.addChild(feed)
  }
}

module.exports = Feedback

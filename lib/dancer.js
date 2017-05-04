const dancerData = {
    images: ["./assets/images/dancer_sheet.png"],
    frames: {width:110, height:128},
    animations: {
      waiting: [0, 7, "waiting"],
      pat: [8,15],
      raise: [16, 19, "waiting"],
      sway: [24, 31],
      slap: [32, 39, "waiting"],
      yes: [40, 47],
      spin: [48, 55, "waiting"],
      go: [56, 63],
      baloon: [64, 71, "waiting"],
      zen: [72, 79]
    },
    framerate: 16
};
  var dancerSpriteSheet = new createjs.SpriteSheet(dancerData);

class Dancer {
  constructor(stage) {
    this.stage = stage;
    this.dancerAnimation = new createjs.Sprite(dancerSpriteSheet, "waiting");
    this.dancerAnimation.x = 150;
    this.dancerAnimation.y = 100;
    this.stage.addChild(this.dancerAnimation);
    $('body').on('keydown', (e)=>{
      switch (e.which) {
        case 74:
          this.animate("raise")
          break;
        case 75:
          this.animate("spin")
          break;
        case 76:
          this.animate("baloon")
          break;
      }
    })
  }

  animate(move){
    // dancerAnimation.gotoAndStop("go");
    this.dancerAnimation.gotoAndPlay(move);
    // this.stage.addChild(this.dancerAnimation);
  }
}

module.exports = Dancer;

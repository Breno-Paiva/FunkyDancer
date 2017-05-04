var dancerData = {
    images: ["./assets/images/dancer_sheet.png"],
    frames: {width:110, height:128},
    animations: {
      waiting: [0, 7],
      pat: [8,15],
      raise: [16, 23],
      sway: [24, 31],
      slap: [32, 39],
      yes: [40, 47],
      spin: [48, 55],
      go: [56, 63],
      baloon: [64, 71],
      zen: [72, 79]
    },
    framerate: 12
};
  var dancerSpriteSheet = new createjs.SpriteSheet(dancerData);

class Dancer {
  constructor(stage) {
    this.stage = stage;
  }

  animate(move){
    var dancerAnimation = new createjs.Sprite(dancerSpriteSheet, move)
    dancerAnimation.x = 150
    dancerAnimation.y = 100
    this.stage.addChild(dancerAnimation);
  }
}

module.exports = Dancer;

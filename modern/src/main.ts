import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { GameplayScene } from './scenes/GameplayScene';
import { ResultsScene } from './scenes/ResultsScene';
import { Theme } from './theme';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 500,
  backgroundColor: Theme.body,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, GameplayScene, ResultsScene],
};

new Phaser.Game(config);

import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene';
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
  input: {
    activePointers: 4, // one per lane, so chords/near-simultaneous taps all register
  },
  scene: [MenuScene, GameplayScene, ResultsScene],
};

new Phaser.Game(config);

import './style.scss';
import Game from './Game';

const game = new Game();
game.addRotateListener();
game.promptShipPlacements();

import Gameboard from './modules/Gameboard';
import Ship from './modules/Ship';
import previewShipPlacement from './modules/DOM';

export default class Game {
  playerGameboard = new Gameboard();
  AIGameboard = new Gameboard();
  orientation = 'horizontal';

  promptShipPlacements() {
    this.promptCarrierPlacement();
  }

  promptShipPlacement(ship, name, callback) {
    document.querySelector('.message').innerText = `Place your ${name}.`;

    const cells = document.querySelectorAll('.gameboard--player .gameboard__cell');
    cells.forEach((cell) => {
      const { col, row } = cell.dataset;

      cell.addEventListener('mouseenter', () => {
        if (this.playerGameboard.cellAvailable(ship.length, [col, row], this.orientation)) {
          previewShipPlacement(ship.length, [col, row], this.orientation, 'lightgray');
        } else {
          previewShipPlacement(ship.length, [col, row], this.orientation, 'lightcoral');
        }
      });

      cell.addEventListener('mouseleave', () => {
        previewShipPlacement(ship.length, [col, row], this.orientation, 'white');
      });
    });
  }

  promptCarrierPlacement() {
    this.promptShipPlacement(new Ship(5), 'Carrier');
  }

  addRotateListener() {
    document.querySelector('.rotate').addEventListener('click', () => {
      this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    });
  }
}

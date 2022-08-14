import Gameboard from './modules/Gameboard';
import Ship from './modules/Ship';

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
      cell.addEventListener('mouseenter', () => {
        cell.classList.add('gameboard__cell--highlighted');
        const { col, row } = cell.dataset;
        if (this.playerGameboard.checkAvailability(ship.length, [col, row], this.orientation) === true) {
          console.log('yes');
        } else {
          console.log('no');
        }
      });

      cell.addEventListener('mouseleave', () => {
        cell.classList.remove('gameboard__cell--highlighted');
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

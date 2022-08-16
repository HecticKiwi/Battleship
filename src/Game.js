import Gameboard from './modules/Gameboard';
import Ship from './modules/Ship';
import { previewShipPlacement, addShip } from './modules/DOM';

export default class Game {
  playerGameboard = new Gameboard();
  enemyGameboard = new Gameboard();
  orientation = 'horizontal';

  promptShipPlacements() {
    this.promptCarrierPlacement();
  }

  promptShipPlacement(ship, name, callback) {
    document.querySelector('.message').innerText = `Place your ${name}.`;

    const cells = document.querySelectorAll('.gameboard--player .gameboard__cell');
    cells.forEach((cell) => {
      const { col, row } = cell.dataset;

      cell.onmouseenter = () => {
        if (this.playerGameboard.cellAvailable(ship.length, [col, row], this.orientation)) {
          previewShipPlacement(ship.length, [col, row], this.orientation, 'lightgray');
        } else {
          previewShipPlacement(ship.length, [col, row], this.orientation, 'lightcoral');
        }
      };

      cell.onmouseleave = () => {
        previewShipPlacement(ship.length, [col, row], this.orientation, '');
      };

      cell.onclick = () => {
        if (this.playerGameboard.cellAvailable(ship.length, [col, row], this.orientation)) {
          this.playerGameboard.placeShip(ship, [col, row], this.orientation);
          addShip(ship.length, [col, row], this.orientation);
          callback();
        }
      };
    });
  }

  promptCarrierPlacement() {
    this.promptShipPlacement(new Ship(5), 'Carrier', this.promptBattleshipPlacement());
  }

  promptBattleshipPlacement() {
    return () => { this.promptShipPlacement(new Ship(4), 'Battleship', this.promptCruiserPlacement()); };
  }

  promptCruiserPlacement() {
    return () => { this.promptShipPlacement(new Ship(3), 'Cruiser', this.promptSubmarinePlacement()); };
  }

  promptSubmarinePlacement() {
    return () => { this.promptShipPlacement(new Ship(3), 'Submarine', this.promptDestroyerPlacement()); };
  }

  promptDestroyerPlacement() {
    return () => { this.promptShipPlacement(new Ship(2), 'Destroyer', this.gameLoop()); };
  }

  gameLoop() {
    return () => {
      const cells = document.querySelectorAll('.gameboard--player .gameboard__cell');
      cells.forEach((cell) => {
        cell.onmouseenter = '';
        cell.onmouseleave = '';
        cell.onclick = '';
      });

      this.enemyGameboard.placeShipsRandomly();

      document.querySelector('.rotate').style.display = 'none';
      document.querySelector('.message').innerText = 'Now, click enemy tiles to attack!';

      const enemycells = document.querySelectorAll('.gameboard--enemy .gameboard__cell');
      enemycells.forEach((cell) => {
        cell.onmouseenter = () => { cell.style.backgroundColor = 'lightgray'; };
        cell.onmouseleave = () => { cell.style.backgroundColor = ''; };
        cell.onclick = () => {
          const { col, row } = cell.dataset;
          if (this.enemyGameboard.recieveAttack([col, row]) === 'hit') {
            cell.style.backgroundColor = 'lightcoral';
          } else {
            cell.style.backgroundColor = 'lightblue';
          }
          cell.onmouseenter = '';
          cell.onmouseleave = '';
          cell.onclick = '';

          if (this.enemyGameboard.allSunk()) {
            this.endGame('player');
          }

          this.enemyAttack();

          if (this.playerGameboard.allSunk()) {
            this.endGame('enemy');
          }
        };
      });
    };
  }

  endGame(victor) {
    const enemycells = document.querySelectorAll('.gameboard--enemy .gameboard__cell');
    enemycells.forEach((cell) => {
      cell.onmouseenter = '';
      cell.onmouseleave = '';
      cell.onclick = '';

      if (victor === 'player') {
        document.querySelector('.message').innerText = 'You destroyed the enemy fleet. You win!';
      } else {
        document.querySelector('.message').innerText = 'The enemy destroyed your fleet. You lose...';
        this.enemyGameboard.revealShips();
      }
    });
  }

  enemyAttack() {
    let col;
    let row;

    do {
      [col, row] = Gameboard.randomCoords();
    } while (['hit', 'miss'].includes(this.playerGameboard.board[col][row]));
    if (this.playerGameboard.recieveAttack([col, row]) === 'hit') {
      document.querySelector(`[data-col="${col}"][data-row="${row}"]`).style.backgroundColor = 'lightcoral';
    } else {
      document.querySelector(`[data-col="${col}"][data-row="${row}"]`).style.backgroundColor = 'lightblue';
    }
  }

  addRotateListener() {
    document.querySelector('.rotate').addEventListener('click', () => {
      this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    });
  }
}

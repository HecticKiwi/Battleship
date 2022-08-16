import Ship from './Ship';

export default class Gameboard {
  board = new Array(10).fill().map(() => new Array(10).fill(null));
  ships = [];

  static randomCoords() {
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);
    return [col, row];
  }

  static randomOrientation() {
    const orientation = Math.floor(Math.random() * 2) === 0 ? 'horizontal' : 'vertical';
    return orientation;
  }

  placeShip(ship, [col, row], orientation) {
    this.ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        this.board[+col + i][row] = ship;
      } else {
        this.board[col][+row + i] = ship;
      }
    }
  }

  placeShipsRandomly() {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);

    [carrier, battleship, cruiser, submarine, destroyer].forEach((ship) => {
      let col;
      let row;
      let orientation;
      do {
        [col, row] = Gameboard.randomCoords();
        orientation = Math.floor(Math.random() * 2) === 0 ? 'horizontal' : 'vertical';
      } while (!this.cellAvailable(ship.length, [col, row], orientation));
      this.placeShip(ship, [col, row], orientation);
    });
  }

  recieveAttack([col, row]) {
    if (this.board[col][row] instanceof Ship) {
      this.board[col][row].hit();
      this.board[col][row] = 'hit';
      return 'hit';
    }
    this.board[col][row] = 'miss';
    return 'miss';
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  cellAvailable(length, [col, row], orientation) {
    for (let i = 0; i < length; i++) {
      if (this.board[col]?.[row] === undefined || this.board[col][row] instanceof Ship) {
        return false;
      }

      if (orientation === 'horizontal') {
        col++;
      } else {
        row++;
      }
    }

    return true;
  }

  revealShips() {
    for (let col = 0; col < this.board.length; col++) {
      for (let row = 0; row < this.board.length; row++) {
        if (this.board[col][row] instanceof Ship) {
          document.querySelector(`.gameboard--enemy [data-col="${col}"][data-row="${row}"]`).style.backgroundColor = 'lightgray';
        } else if (this.board[col][row] === null) {
          document.querySelector(`.gameboard--enemy [data-col="${col}"][data-row="${row}"]`).style.backgroundColor = 'lightblue';
        }
      }
    }
  }
}

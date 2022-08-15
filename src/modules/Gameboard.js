import Ship from './Ship';

export default class Gameboard {
  board = new Array(10).fill().map(() => new Array(10).fill(null));
  ships = [];

  placeShip(ship, [col, row], orientation) {
    this.ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        this.board[col + i][row] = ship;
      } else {
        this.board[col][row + i] = ship;
      }
    }
  }

  recieveAttack([col, row]) {
    if (this.board[col][row] instanceof Ship) {
      this.board[col][row].hit();
      this.board[col][row] = 'hit';
    } else {
      this.board[col][row] = 'miss';
    }
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
}

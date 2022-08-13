import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('Gameboard is created', () => {
    expect(gameboard.board).toEqual(new Array(10).fill().map(() => new Array(10).fill(null)));
    expect(gameboard.ships).toEqual([]);
  });

  test('placeShip() places ship horizontally', () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, [1, 3], 'horizontal');
    const expectedBoard = new Array(10).fill().map(() => new Array(10).fill(null));
    expectedBoard[1][3] = ship;
    expectedBoard[2][3] = ship;
    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([ship]);
  });

  test('placeShip() places ship vertically', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [5, 0], 'vertical');
    const expectedBoard = new Array(10).fill().map(() => new Array(10).fill(null));
    expectedBoard[5][0] = ship;
    expectedBoard[5][1] = ship;
    expectedBoard[5][2] = ship;
    expect(gameboard.board).toEqual(expectedBoard);
    expect(gameboard.ships).toEqual([ship]);
  });

  test('recieveAttack() handles successful hit', () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.recieveAttack([0, 0]);
    expect(gameboard.board[0][0]).toBe('hit');
    expect(ship.hits).toBe(1);
  });

  test('recieveAttack() handles miss', () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.recieveAttack([0, 1]);
    expect(gameboard.board[0][1]).toBe('miss');
    expect(ship.hits).toBe(0);
  });

  test('allSunk() returns false when ships remain', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(2);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    gameboard.placeShip(ship2, [0, 1], 'horizontal');
    gameboard.recieveAttack([0, 0]);
    expect(gameboard.allSunk()).toBe(false);
  });

  test('allSunk() returns true when no ships remain', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(2);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    gameboard.placeShip(ship2, [0, 1], 'horizontal');
    gameboard.recieveAttack([0, 0]);
    gameboard.recieveAttack([0, 1]);
    gameboard.recieveAttack([1, 1]);
    expect(gameboard.allSunk()).toBe(true);
  });
});

import Ship from '../Ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(5);
  });

  test('Ship is created', () => {
    expect(ship).toEqual({
      hits: 0,
      // sunk: false,
      length: 5,
    });
  });

  test('hit() increments the hits count', () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('isSunk() returns false when hits < length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() returns true when hits = length', () => {
    for (let i = 0; i < ship.length; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});

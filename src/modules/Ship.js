export default class Ship {
  hits = 0;
  // sunk = false;

  constructor(length) {
    this.length = length;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

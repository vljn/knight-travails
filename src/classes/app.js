import DOMstuff from '../functions/DOMstuff';
import knightMoves from '../functions/board';

class App {
  constructor() {
    this.DOMstuff = DOMstuff;
    this.startSquare = null;
    this.endSquare = null;
    this.placingKnight = false;
    this.placingEnd = false;
    this.running = false;
  }

  start() {
    this.DOMstuff.pageLoad();
    this.DOMstuff.addEventListeners(this);
  }

  move() {
    if (
      !this.running &&
      this.startSquare !== null &&
      this.endSquare !== null &&
      (this.startSquare.x !== this.endSquare.x || this.startSquare.y !== this.endSquare.y)
    ) {
      const moves = knightMoves(
        this.startSquare.x,
        this.startSquare.y,
        this.endSquare.x,
        this.endSquare.y
      );
      console.log(moves);
      DOMstuff.animate(moves, this);
    }
  }

  changeStateKnight() {
    this.placingKnight = true;
    this.placingEnd = false;
  }

  changeStateEnd() {
    this.placingEnd = true;
    this.placingKnight = false;
  }

  changeStatePlacing() {
    this.placingEnd = false;
    this.placingKnight = false;
  }

  placeKnight(x, y) {
    this.startSquare = { x, y };
  }

  placeEnd(x, y) {
    this.endSquare = { x, y };
  }

  setRunning(value) {
    this.running = value;
  }
}

export default App;

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/classes/app.js":
/*!****************************!*\
  !*** ./src/classes/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _functions_DOMstuff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/DOMstuff */ "./src/functions/DOMstuff.js");
/* harmony import */ var _functions_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/board */ "./src/functions/board.js");



class App {
  constructor() {
    this.DOMstuff = _functions_DOMstuff__WEBPACK_IMPORTED_MODULE_0__["default"];
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
      const moves = (0,_functions_board__WEBPACK_IMPORTED_MODULE_1__["default"])(
        this.startSquare.x,
        this.startSquare.y,
        this.endSquare.x,
        this.endSquare.y
      );
      _functions_DOMstuff__WEBPACK_IMPORTED_MODULE_0__["default"].animate(moves, this);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);


/***/ }),

/***/ "./src/functions/DOMstuff.js":
/*!***********************************!*\
  !*** ./src/functions/DOMstuff.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _images_knight_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/knight.svg */ "./src/images/knight.svg");


const DOMstuff = (() => {
  function makeSquare(color, x, y) {
    const square = document.createElement('div');
    square.classList.add(
      'square',
      color,
      'w-10',
      'h-10',
      'md:w-14',
      'md:h-14',
      'lg:w-[4.5rem]',
      'lg:h-[4.5rem]',
      'xl:w-20',
      'xl:h-20'
    );
    square.setAttribute('data-x', x);
    square.setAttribute('data-y', y);
    return square;
  }

  function generateBoard() {
    const board = document.createElement('div');
    board.classList.add('border-2', 'border-square-black', 'md:mx-0', 'mx-auto', 'w-fit', 'h-fit');
    for (let i = 0; i < 8; i += 1) {
      const row = document.createElement('div');
      row.classList.add('flex');
      const colorArr = ['bg-square-white', 'bg-square-black'];
      let index = 0 + (i % 2 !== 0);
      for (let j = 0; j < 8; j += 1) {
        row.appendChild(makeSquare(colorArr[index], j, 7 - i));
        index += 1;
        index %= 2;
      }
      board.appendChild(row);
    }
    return board;
  }

  function generateTitle() {
    const title = document.createElement('h1');
    title.classList.add(
      'font-title',
      'text-5xl',
      'text-center',
      'text-square-black',
      'py-5',
      'md:py-0',
      'md:text-6xl',
      'xl:text-8xl',
      'md:mb-3'
    );
    title.textContent = 'Knight Travails';
    return title;
  }

  function generateButtons() {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('flex', 'justify-center', 'gap-6');

    const placeKnight = document.createElement('button');
    placeKnight.id = 'place-knight';
    placeKnight.textContent = 'Place knight';
    buttonDiv.appendChild(placeKnight);
    placeKnight.classList.add(
      'bg-square-black',
      'text-slate-300',
      'font-main',
      'px-2',
      'py-1',
      'text-xl',
      'rounded'
    );

    const placeEnd = document.createElement('button');
    placeEnd.id = 'place-end';
    placeEnd.textContent = 'Place ending';
    placeEnd.classList.add(
      'bg-square-black',
      'text-slate-300',
      'font-main',
      'px-2',
      'py-1',
      'text-xl',
      'rounded'
    );
    buttonDiv.appendChild(placeEnd);

    return buttonDiv;
  }

  function addEventListeners(app) {
    const placeKnight = document.getElementById('place-knight');
    const placeEnd = document.getElementById('place-end');
    const start = document.getElementById('start');

    start.addEventListener('click', () => {
      app.move();
      app.changeStatePlacing();
    });
    placeKnight.addEventListener('click', () => {
      app.changeStateKnight();
    });
    placeEnd.addEventListener('click', () => {
      app.changeStateEnd();
    });

    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        const { x } = square.dataset;
        const { y } = square.dataset;
        if (app.placingKnight) {
          if (app.startSquare !== null && app.startSquare !== undefined) {
            const squareWithKnight = document.querySelector(
              `.square[data-x="${app.startSquare.x}"][data-y="${app.startSquare.y}"]`
            );
            squareWithKnight.innerHTML = '';
          }
          app.placeKnight(parseInt(x, 10), parseInt(y, 10));
          const newSquareWithKnight = document.querySelector(
            `.square[data-x="${x}"][data-y="${y}"]`
          );
          const img = new Image();
          img.src = _images_knight_svg__WEBPACK_IMPORTED_MODULE_0__;
          img.style.transform = 'scale(0.8)';
          newSquareWithKnight.appendChild(img);
        }
        if (app.placingEnd) {
          if (app.endSquare !== null && app.endSquare !== undefined) {
            const endSquare = document.querySelector(
              `.square[data-x="${app.endSquare.x}"][data-y="${app.endSquare.y}"]`
            );
            endSquare.style['background-color'] = null;
          }
          app.placeEnd(parseInt(x, 10), parseInt(y, 10));
          const newEndSquare = document.querySelector(`.square[data-x="${x}"][data-y="${y}"]`);
          const overlayDiv = document.createElement('div');
          overlayDiv.classList.add('w-full', 'h-full', 'bg-red-600', 'opacity-50');
          newEndSquare.style['background-color'] = '#86211B';
        }
        app.changeStatePlacing();
      });
    });
  }

  function pageLoad() {
    const body = document.querySelector('body');
    const main = document.createElement('div');
    main.id = 'main';
    main.classList.add(
      'md:flex',
      'md:justify-between',
      'md:w-full',
      'md:h-full',
      'md:items-center',
      'md:px-8',
      'md:gap-4',
      'xl:px-32'
    );
    body.appendChild(main);

    const titleAndButtons = document.createElement('div');
    titleAndButtons.appendChild(generateTitle());
    titleAndButtons.appendChild(generateButtons());
    titleAndButtons.classList.add('mb-5', 'md:mb-0');
    main.appendChild(titleAndButtons);

    const boardDiv = document.createElement('div');
    boardDiv.classList.add('flex', 'flex-col', 'items-center', 'gap-4');
    boardDiv.appendChild(generateBoard());

    const travailButton = document.createElement('button');
    travailButton.id = 'start';
    travailButton.textContent = 'Start!';
    travailButton.classList.add(
      'font-main',
      'bg-square-black',
      'text-slate-300',
      'font-main',
      'px-2',
      'py-1',
      'text-3xl',
      'rounded'
    );
    boardDiv.appendChild(travailButton);

    main.appendChild(boardDiv);
  }

  function animate(path, app) {
    function moveKnightToSquare(x1, y1, x2, y2, p) {
      const squareWidth = parseFloat(getComputedStyle(document.querySelector('.square')).width);
      const knightSquare = document.querySelector('.square img');

      const dx = x2 - x1;
      const dy = y2 - y1;

      const xPosition = dx * squareWidth + p.x;
      const yPosition = -dy * squareWidth + p.y;

      knightSquare.style.transition = 'all 0.5s ease-in-out';
      knightSquare.style.transform = `translate(${xPosition}px, ${yPosition}px) scale(0.8)`;

      return { x: xPosition, y: yPosition };
    }

    let delay = 0;
    let p = { x: 0, y: 0 };
    const start = document.querySelector(`.square[data-x="${path[0].x}"][data-y="${path[0].y}"]`);
    const end = document.querySelector(
      `.square[data-x="${path[path.length - 1].x}"][data-y="${path[path.length - 1].y}"]`
    );
    app.setRunning(true);
    setTimeout(() => {
      end.innerHTML = start.innerHTML;
      start.innerHTML = '';
      document.querySelector('.square img').style.transform = `translate(0px, 0px) scale(0.8)`;
      app.placeKnight(path[path.length - 1].x, path[path.length - 1].y);
      app.setRunning(false);
    }, 500 * path.length);
    for (let i = 0; i < path.length; i += 1) {
      if (i < path.length - 1) {
        // eslint-disable-next-line no-loop-func
        setTimeout(() => {
          p = moveKnightToSquare(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y, p);
        }, delay);
        delay += 500;
      }
    }
  }

  return { pageLoad, addEventListeners, animate };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMstuff);


/***/ }),

/***/ "./src/functions/board.js":
/*!********************************!*\
  !*** ./src/functions/board.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function generateBoard() {
  const arr = [...new Array(8)].map(() => Array(8).fill(''));
  return arr;
}

function knightMoves(x1, y1, x2, y2) {
  const board = generateBoard();
  const queue = [];
  queue.push({ x: x1, y: y1, moves: [] });
  while (queue.length > 0) {
    const top = queue.shift();
    const [x, y] = [top.x, top.y];
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7 && board[x][y] === '') {
      const arr = [...top.moves];
      arr.push({ x, y });
      if (x === x2 && y === y2) {
        return arr;
      }
      board[x][y] = '1';
      const xMove = [2, 1, -1, -2, -2, -1, 1, 2];
      const yMove = [1, 2, 2, 1, -1, -2, -2, -1];
      for (let index = 0; index < 8; index += 1) {
        const newX = x + xMove[index];
        const newY = y + yMove[index];
        queue.push({ x: newX, y: newY, moves: arr });
      }
    }
  }

  return [];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);


/***/ }),

/***/ "./src/images/knight.svg":
/*!*******************************!*\
  !*** ./src/images/knight.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "19a2190e520c1221f44c.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/app */ "./src/classes/app.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



const app = new _classes_app__WEBPACK_IMPORTED_MODULE_0__["default"]();
app.start();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHO0FBQ25CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0Ly4vc3JjL3N0eWxlLmNzcz9mZTllIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9jbGFzc2VzL2FwcC5qcyIsIndlYnBhY2s6Ly9rbmlnaHQvLi9zcmMvZnVuY3Rpb25zL0RPTXN0dWZmLmpzIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9mdW5jdGlvbnMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgRE9Nc3R1ZmYgZnJvbSAnLi4vZnVuY3Rpb25zL0RPTXN0dWZmJztcclxuaW1wb3J0IGtuaWdodE1vdmVzIGZyb20gJy4uL2Z1bmN0aW9ucy9ib2FyZCc7XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ET01zdHVmZiA9IERPTXN0dWZmO1xyXG4gICAgdGhpcy5zdGFydFNxdWFyZSA9IG51bGw7XHJcbiAgICB0aGlzLmVuZFNxdWFyZSA9IG51bGw7XHJcbiAgICB0aGlzLnBsYWNpbmdLbmlnaHQgPSBmYWxzZTtcclxuICAgIHRoaXMucGxhY2luZ0VuZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuRE9Nc3R1ZmYucGFnZUxvYWQoKTtcclxuICAgIHRoaXMuRE9Nc3R1ZmYuYWRkRXZlbnRMaXN0ZW5lcnModGhpcyk7XHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5ydW5uaW5nICYmXHJcbiAgICAgIHRoaXMuc3RhcnRTcXVhcmUgIT09IG51bGwgJiZcclxuICAgICAgdGhpcy5lbmRTcXVhcmUgIT09IG51bGwgJiZcclxuICAgICAgKHRoaXMuc3RhcnRTcXVhcmUueCAhPT0gdGhpcy5lbmRTcXVhcmUueCB8fCB0aGlzLnN0YXJ0U3F1YXJlLnkgIT09IHRoaXMuZW5kU3F1YXJlLnkpXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgbW92ZXMgPSBrbmlnaHRNb3ZlcyhcclxuICAgICAgICB0aGlzLnN0YXJ0U3F1YXJlLngsXHJcbiAgICAgICAgdGhpcy5zdGFydFNxdWFyZS55LFxyXG4gICAgICAgIHRoaXMuZW5kU3F1YXJlLngsXHJcbiAgICAgICAgdGhpcy5lbmRTcXVhcmUueVxyXG4gICAgICApO1xyXG4gICAgICBET01zdHVmZi5hbmltYXRlKG1vdmVzLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZVN0YXRlS25pZ2h0KCkge1xyXG4gICAgdGhpcy5wbGFjaW5nS25pZ2h0ID0gdHJ1ZTtcclxuICAgIHRoaXMucGxhY2luZ0VuZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlU3RhdGVFbmQoKSB7XHJcbiAgICB0aGlzLnBsYWNpbmdFbmQgPSB0cnVlO1xyXG4gICAgdGhpcy5wbGFjaW5nS25pZ2h0ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTdGF0ZVBsYWNpbmcoKSB7XHJcbiAgICB0aGlzLnBsYWNpbmdFbmQgPSBmYWxzZTtcclxuICAgIHRoaXMucGxhY2luZ0tuaWdodCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VLbmlnaHQoeCwgeSkge1xyXG4gICAgdGhpcy5zdGFydFNxdWFyZSA9IHsgeCwgeSB9O1xyXG4gIH1cclxuXHJcbiAgcGxhY2VFbmQoeCwgeSkge1xyXG4gICAgdGhpcy5lbmRTcXVhcmUgPSB7IHgsIHkgfTtcclxuICB9XHJcblxyXG4gIHNldFJ1bm5pbmcodmFsdWUpIHtcclxuICAgIHRoaXMucnVubmluZyA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwO1xyXG4iLCJpbXBvcnQga25pZ2h0SW1hZ2UgZnJvbSAnLi4vaW1hZ2VzL2tuaWdodC5zdmcnO1xyXG5cclxuY29uc3QgRE9Nc3R1ZmYgPSAoKCkgPT4ge1xyXG4gIGZ1bmN0aW9uIG1ha2VTcXVhcmUoY29sb3IsIHgsIHkpIHtcclxuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdzcXVhcmUnLFxyXG4gICAgICBjb2xvcixcclxuICAgICAgJ3ctMTAnLFxyXG4gICAgICAnaC0xMCcsXHJcbiAgICAgICdtZDp3LTE0JyxcclxuICAgICAgJ21kOmgtMTQnLFxyXG4gICAgICAnbGc6dy1bNC41cmVtXScsXHJcbiAgICAgICdsZzpoLVs0LjVyZW1dJyxcclxuICAgICAgJ3hsOnctMjAnLFxyXG4gICAgICAneGw6aC0yMCdcclxuICAgICk7XHJcbiAgICBzcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCB4KTtcclxuICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIHkpO1xyXG4gICAgcmV0dXJuIHNxdWFyZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlQm9hcmQoKSB7XHJcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLXNxdWFyZS1ibGFjaycsICdtZDpteC0wJywgJ214LWF1dG8nLCAndy1maXQnLCAnaC1maXQnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICByb3cuY2xhc3NMaXN0LmFkZCgnZmxleCcpO1xyXG4gICAgICBjb25zdCBjb2xvckFyciA9IFsnYmctc3F1YXJlLXdoaXRlJywgJ2JnLXNxdWFyZS1ibGFjayddO1xyXG4gICAgICBsZXQgaW5kZXggPSAwICsgKGkgJSAyICE9PSAwKTtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqICs9IDEpIHtcclxuICAgICAgICByb3cuYXBwZW5kQ2hpbGQobWFrZVNxdWFyZShjb2xvckFycltpbmRleF0sIGosIDcgLSBpKSk7XHJcbiAgICAgICAgaW5kZXggKz0gMTtcclxuICAgICAgICBpbmRleCAlPSAyO1xyXG4gICAgICB9XHJcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZVRpdGxlKCkge1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2ZvbnQtdGl0bGUnLFxyXG4gICAgICAndGV4dC01eGwnLFxyXG4gICAgICAndGV4dC1jZW50ZXInLFxyXG4gICAgICAndGV4dC1zcXVhcmUtYmxhY2snLFxyXG4gICAgICAncHktNScsXHJcbiAgICAgICdtZDpweS0wJyxcclxuICAgICAgJ21kOnRleHQtNnhsJyxcclxuICAgICAgJ3hsOnRleHQtOHhsJyxcclxuICAgICAgJ21kOm1iLTMnXHJcbiAgICApO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnS25pZ2h0IFRyYXZhaWxzJztcclxuICAgIHJldHVybiB0aXRsZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlQnV0dG9ucygpIHtcclxuICAgIGNvbnN0IGJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYnV0dG9uRGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnLCAnanVzdGlmeS1jZW50ZXInLCAnZ2FwLTYnKTtcclxuXHJcbiAgICBjb25zdCBwbGFjZUtuaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgcGxhY2VLbmlnaHQuaWQgPSAncGxhY2Uta25pZ2h0JztcclxuICAgIHBsYWNlS25pZ2h0LnRleHRDb250ZW50ID0gJ1BsYWNlIGtuaWdodCc7XHJcbiAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQocGxhY2VLbmlnaHQpO1xyXG4gICAgcGxhY2VLbmlnaHQuY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2JnLXNxdWFyZS1ibGFjaycsXHJcbiAgICAgICd0ZXh0LXNsYXRlLTMwMCcsXHJcbiAgICAgICdmb250LW1haW4nLFxyXG4gICAgICAncHgtMicsXHJcbiAgICAgICdweS0xJyxcclxuICAgICAgJ3RleHQteGwnLFxyXG4gICAgICAncm91bmRlZCdcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcGxhY2VFbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHBsYWNlRW5kLmlkID0gJ3BsYWNlLWVuZCc7XHJcbiAgICBwbGFjZUVuZC50ZXh0Q29udGVudCA9ICdQbGFjZSBlbmRpbmcnO1xyXG4gICAgcGxhY2VFbmQuY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2JnLXNxdWFyZS1ibGFjaycsXHJcbiAgICAgICd0ZXh0LXNsYXRlLTMwMCcsXHJcbiAgICAgICdmb250LW1haW4nLFxyXG4gICAgICAncHgtMicsXHJcbiAgICAgICdweS0xJyxcclxuICAgICAgJ3RleHQteGwnLFxyXG4gICAgICAncm91bmRlZCdcclxuICAgICk7XHJcbiAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQocGxhY2VFbmQpO1xyXG5cclxuICAgIHJldHVybiBidXR0b25EaXY7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyhhcHApIHtcclxuICAgIGNvbnN0IHBsYWNlS25pZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLWtuaWdodCcpO1xyXG4gICAgY29uc3QgcGxhY2VFbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2UtZW5kJyk7XHJcbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG5cclxuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBhcHAubW92ZSgpO1xyXG4gICAgICBhcHAuY2hhbmdlU3RhdGVQbGFjaW5nKCk7XHJcbiAgICB9KTtcclxuICAgIHBsYWNlS25pZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBhcHAuY2hhbmdlU3RhdGVLbmlnaHQoKTtcclxuICAgIH0pO1xyXG4gICAgcGxhY2VFbmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGFwcC5jaGFuZ2VTdGF0ZUVuZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcclxuICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IHggfSA9IHNxdWFyZS5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IHsgeSB9ID0gc3F1YXJlLmRhdGFzZXQ7XHJcbiAgICAgICAgaWYgKGFwcC5wbGFjaW5nS25pZ2h0KSB7XHJcbiAgICAgICAgICBpZiAoYXBwLnN0YXJ0U3F1YXJlICE9PSBudWxsICYmIGFwcC5zdGFydFNxdWFyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZVdpdGhLbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7YXBwLnN0YXJ0U3F1YXJlLnh9XCJdW2RhdGEteT1cIiR7YXBwLnN0YXJ0U3F1YXJlLnl9XCJdYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzcXVhcmVXaXRoS25pZ2h0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXBwLnBsYWNlS25pZ2h0KHBhcnNlSW50KHgsIDEwKSwgcGFyc2VJbnQoeSwgMTApKTtcclxuICAgICAgICAgIGNvbnN0IG5ld1NxdWFyZVdpdGhLbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICBgLnNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICBpbWcuc3JjID0ga25pZ2h0SW1hZ2U7XHJcbiAgICAgICAgICBpbWcuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDAuOCknO1xyXG4gICAgICAgICAgbmV3U3F1YXJlV2l0aEtuaWdodC5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXBwLnBsYWNpbmdFbmQpIHtcclxuICAgICAgICAgIGlmIChhcHAuZW5kU3F1YXJlICE9PSBudWxsICYmIGFwcC5lbmRTcXVhcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbmRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7YXBwLmVuZFNxdWFyZS54fVwiXVtkYXRhLXk9XCIke2FwcC5lbmRTcXVhcmUueX1cIl1gXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGVuZFNxdWFyZS5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFwcC5wbGFjZUVuZChwYXJzZUludCh4LCAxMCksIHBhcnNlSW50KHksIDEwKSk7XHJcbiAgICAgICAgICBjb25zdCBuZXdFbmRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc3F1YXJlW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xyXG4gICAgICAgICAgY29uc3Qgb3ZlcmxheURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgb3ZlcmxheURpdi5jbGFzc0xpc3QuYWRkKCd3LWZ1bGwnLCAnaC1mdWxsJywgJ2JnLXJlZC02MDAnLCAnb3BhY2l0eS01MCcpO1xyXG4gICAgICAgICAgbmV3RW5kU3F1YXJlLnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSAnIzg2MjExQic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5jaGFuZ2VTdGF0ZVBsYWNpbmcoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1haW4uaWQgPSAnbWFpbic7XHJcbiAgICBtYWluLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdtZDpmbGV4JyxcclxuICAgICAgJ21kOmp1c3RpZnktYmV0d2VlbicsXHJcbiAgICAgICdtZDp3LWZ1bGwnLFxyXG4gICAgICAnbWQ6aC1mdWxsJyxcclxuICAgICAgJ21kOml0ZW1zLWNlbnRlcicsXHJcbiAgICAgICdtZDpweC04JyxcclxuICAgICAgJ21kOmdhcC00JyxcclxuICAgICAgJ3hsOnB4LTMyJ1xyXG4gICAgKTtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQobWFpbik7XHJcblxyXG4gICAgY29uc3QgdGl0bGVBbmRCdXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aXRsZUFuZEJ1dHRvbnMuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVUaXRsZSgpKTtcclxuICAgIHRpdGxlQW5kQnV0dG9ucy5hcHBlbmRDaGlsZChnZW5lcmF0ZUJ1dHRvbnMoKSk7XHJcbiAgICB0aXRsZUFuZEJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnbWItNScsICdtZDptYi0wJyk7XHJcbiAgICBtYWluLmFwcGVuZENoaWxkKHRpdGxlQW5kQnV0dG9ucyk7XHJcblxyXG4gICAgY29uc3QgYm9hcmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkRGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnLCAnZmxleC1jb2wnLCAnaXRlbXMtY2VudGVyJywgJ2dhcC00Jyk7XHJcbiAgICBib2FyZERpdi5hcHBlbmRDaGlsZChnZW5lcmF0ZUJvYXJkKCkpO1xyXG5cclxuICAgIGNvbnN0IHRyYXZhaWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRyYXZhaWxCdXR0b24uaWQgPSAnc3RhcnQnO1xyXG4gICAgdHJhdmFpbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdGFydCEnO1xyXG4gICAgdHJhdmFpbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnZm9udC1tYWluJyxcclxuICAgICAgJ2JnLXNxdWFyZS1ibGFjaycsXHJcbiAgICAgICd0ZXh0LXNsYXRlLTMwMCcsXHJcbiAgICAgICdmb250LW1haW4nLFxyXG4gICAgICAncHgtMicsXHJcbiAgICAgICdweS0xJyxcclxuICAgICAgJ3RleHQtM3hsJyxcclxuICAgICAgJ3JvdW5kZWQnXHJcbiAgICApO1xyXG4gICAgYm9hcmREaXYuYXBwZW5kQ2hpbGQodHJhdmFpbEJ1dHRvbik7XHJcblxyXG4gICAgbWFpbi5hcHBlbmRDaGlsZChib2FyZERpdik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlKHBhdGgsIGFwcCkge1xyXG4gICAgZnVuY3Rpb24gbW92ZUtuaWdodFRvU3F1YXJlKHgxLCB5MSwgeDIsIHkyLCBwKSB7XHJcbiAgICAgIGNvbnN0IHNxdWFyZVdpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcXVhcmUnKSkud2lkdGgpO1xyXG4gICAgICBjb25zdCBrbmlnaHRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3F1YXJlIGltZycpO1xyXG5cclxuICAgICAgY29uc3QgZHggPSB4MiAtIHgxO1xyXG4gICAgICBjb25zdCBkeSA9IHkyIC0geTE7XHJcblxyXG4gICAgICBjb25zdCB4UG9zaXRpb24gPSBkeCAqIHNxdWFyZVdpZHRoICsgcC54O1xyXG4gICAgICBjb25zdCB5UG9zaXRpb24gPSAtZHkgKiBzcXVhcmVXaWR0aCArIHAueTtcclxuXHJcbiAgICAgIGtuaWdodFNxdWFyZS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzIGVhc2UtaW4tb3V0JztcclxuICAgICAga25pZ2h0U3F1YXJlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt4UG9zaXRpb259cHgsICR7eVBvc2l0aW9ufXB4KSBzY2FsZSgwLjgpYDtcclxuXHJcbiAgICAgIHJldHVybiB7IHg6IHhQb3NpdGlvbiwgeTogeVBvc2l0aW9uIH07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRlbGF5ID0gMDtcclxuICAgIGxldCBwID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICBjb25zdCBzdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zcXVhcmVbZGF0YS14PVwiJHtwYXRoWzBdLnh9XCJdW2RhdGEteT1cIiR7cGF0aFswXS55fVwiXWApO1xyXG4gICAgY29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYC5zcXVhcmVbZGF0YS14PVwiJHtwYXRoW3BhdGgubGVuZ3RoIC0gMV0ueH1cIl1bZGF0YS15PVwiJHtwYXRoW3BhdGgubGVuZ3RoIC0gMV0ueX1cIl1gXHJcbiAgICApO1xyXG4gICAgYXBwLnNldFJ1bm5pbmcodHJ1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZW5kLmlubmVySFRNTCA9IHN0YXJ0LmlubmVySFRNTDtcclxuICAgICAgc3RhcnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcXVhcmUgaW1nJykuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgwcHgsIDBweCkgc2NhbGUoMC44KWA7XHJcbiAgICAgIGFwcC5wbGFjZUtuaWdodChwYXRoW3BhdGgubGVuZ3RoIC0gMV0ueCwgcGF0aFtwYXRoLmxlbmd0aCAtIDFdLnkpO1xyXG4gICAgICBhcHAuc2V0UnVubmluZyhmYWxzZSk7XHJcbiAgICB9LCA1MDAgKiBwYXRoLmxlbmd0aCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKGkgPCBwYXRoLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9vcC1mdW5jXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBwID0gbW92ZUtuaWdodFRvU3F1YXJlKHBhdGhbaV0ueCwgcGF0aFtpXS55LCBwYXRoW2kgKyAxXS54LCBwYXRoW2kgKyAxXS55LCBwKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgZGVsYXkgKz0gNTAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBwYWdlTG9hZCwgYWRkRXZlbnRMaXN0ZW5lcnMsIGFuaW1hdGUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERPTXN0dWZmO1xyXG4iLCJmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKCkge1xyXG4gIGNvbnN0IGFyciA9IFsuLi5uZXcgQXJyYXkoOCldLm1hcCgoKSA9PiBBcnJheSg4KS5maWxsKCcnKSk7XHJcbiAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuZnVuY3Rpb24ga25pZ2h0TW92ZXMoeDEsIHkxLCB4MiwgeTIpIHtcclxuICBjb25zdCBib2FyZCA9IGdlbmVyYXRlQm9hcmQoKTtcclxuICBjb25zdCBxdWV1ZSA9IFtdO1xyXG4gIHF1ZXVlLnB1c2goeyB4OiB4MSwgeTogeTEsIG1vdmVzOiBbXSB9KTtcclxuICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc3QgdG9wID0gcXVldWUuc2hpZnQoKTtcclxuICAgIGNvbnN0IFt4LCB5XSA9IFt0b3AueCwgdG9wLnldO1xyXG4gICAgaWYgKHggPj0gMCAmJiB4IDw9IDcgJiYgeSA+PSAwICYmIHkgPD0gNyAmJiBib2FyZFt4XVt5XSA9PT0gJycpIHtcclxuICAgICAgY29uc3QgYXJyID0gWy4uLnRvcC5tb3Zlc107XHJcbiAgICAgIGFyci5wdXNoKHsgeCwgeSB9KTtcclxuICAgICAgaWYgKHggPT09IHgyICYmIHkgPT09IHkyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgfVxyXG4gICAgICBib2FyZFt4XVt5XSA9ICcxJztcclxuICAgICAgY29uc3QgeE1vdmUgPSBbMiwgMSwgLTEsIC0yLCAtMiwgLTEsIDEsIDJdO1xyXG4gICAgICBjb25zdCB5TW92ZSA9IFsxLCAyLCAyLCAxLCAtMSwgLTIsIC0yLCAtMV07XHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA4OyBpbmRleCArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgbmV3WCA9IHggKyB4TW92ZVtpbmRleF07XHJcbiAgICAgICAgY29uc3QgbmV3WSA9IHkgKyB5TW92ZVtpbmRleF07XHJcbiAgICAgICAgcXVldWUucHVzaCh7IHg6IG5ld1gsIHk6IG5ld1ksIG1vdmVzOiBhcnIgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQga25pZ2h0TW92ZXM7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgQXBwIGZyb20gJy4vY2xhc3Nlcy9hcHAnO1xyXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuYXBwLnN0YXJ0KCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
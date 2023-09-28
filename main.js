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
  }

  start() {
    this.DOMstuff.pageLoad();
    this.DOMstuff.addEventListeners(this);
  }

  move() {
    console.log(this);
    if (this.startSquare !== null && this.endSquare !== null) {
      const moves = (0,_functions_board__WEBPACK_IMPORTED_MODULE_1__["default"])(
        this.startSquare.x,
        this.startSquare.y,
        this.endSquare.x,
        this.endSquare.y
      );
      console.log(moves);
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
    console.log('aaaaa1');
    console.log(this.startSquare);
  }

  placeEnd(x, y) {
    this.endSquare = { x, y };
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
          console.log(app);
          if (app.startSquare !== null && app.startSquare !== undefined) {
            console.log('a');
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
          newSquareWithKnight.appendChild(img);
        }
        if (app.placingEnd) {
          app.placeEnd(parseInt(x, 10), parseInt(y, 10));
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
      'font-title',
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

  return { pageLoad, addEventListeners };
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

module.exports = __webpack_require__.p + "d5b8bfcc9bc42b45a748.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7VUNoQzNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7O0FDbEJnQztBQUNYO0FBQ3JCO0FBQ0EsZ0JBQWdCLG9EQUFHO0FBQ25CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0Ly4vc3JjL3N0eWxlLmNzcz9mZTllIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9jbGFzc2VzL2FwcC5qcyIsIndlYnBhY2s6Ly9rbmlnaHQvLi9zcmMvZnVuY3Rpb25zL0RPTXN0dWZmLmpzIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9mdW5jdGlvbnMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgRE9Nc3R1ZmYgZnJvbSAnLi4vZnVuY3Rpb25zL0RPTXN0dWZmJztcclxuaW1wb3J0IGtuaWdodE1vdmVzIGZyb20gJy4uL2Z1bmN0aW9ucy9ib2FyZCc7XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ET01zdHVmZiA9IERPTXN0dWZmO1xyXG4gICAgdGhpcy5zdGFydFNxdWFyZSA9IG51bGw7XHJcbiAgICB0aGlzLmVuZFNxdWFyZSA9IG51bGw7XHJcbiAgICB0aGlzLnBsYWNpbmdLbmlnaHQgPSBmYWxzZTtcclxuICAgIHRoaXMucGxhY2luZ0VuZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLkRPTXN0dWZmLnBhZ2VMb2FkKCk7XHJcbiAgICB0aGlzLkRPTXN0dWZmLmFkZEV2ZW50TGlzdGVuZXJzKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgaWYgKHRoaXMuc3RhcnRTcXVhcmUgIT09IG51bGwgJiYgdGhpcy5lbmRTcXVhcmUgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbW92ZXMgPSBrbmlnaHRNb3ZlcyhcclxuICAgICAgICB0aGlzLnN0YXJ0U3F1YXJlLngsXHJcbiAgICAgICAgdGhpcy5zdGFydFNxdWFyZS55LFxyXG4gICAgICAgIHRoaXMuZW5kU3F1YXJlLngsXHJcbiAgICAgICAgdGhpcy5lbmRTcXVhcmUueVxyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZyhtb3Zlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTdGF0ZUtuaWdodCgpIHtcclxuICAgIHRoaXMucGxhY2luZ0tuaWdodCA9IHRydWU7XHJcbiAgICB0aGlzLnBsYWNpbmdFbmQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVN0YXRlRW5kKCkge1xyXG4gICAgdGhpcy5wbGFjaW5nRW5kID0gdHJ1ZTtcclxuICAgIHRoaXMucGxhY2luZ0tuaWdodCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlU3RhdGVQbGFjaW5nKCkge1xyXG4gICAgdGhpcy5wbGFjaW5nRW5kID0gZmFsc2U7XHJcbiAgICB0aGlzLnBsYWNpbmdLbmlnaHQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBsYWNlS25pZ2h0KHgsIHkpIHtcclxuICAgIHRoaXMuc3RhcnRTcXVhcmUgPSB7IHgsIHkgfTtcclxuICAgIGNvbnNvbGUubG9nKCdhYWFhYTEnKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhcnRTcXVhcmUpO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VFbmQoeCwgeSkge1xyXG4gICAgdGhpcy5lbmRTcXVhcmUgPSB7IHgsIHkgfTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDtcclxuIiwiaW1wb3J0IGtuaWdodEltYWdlIGZyb20gJy4uL2ltYWdlcy9rbmlnaHQuc3ZnJztcclxuXHJcbmNvbnN0IERPTXN0dWZmID0gKCgpID0+IHtcclxuICBmdW5jdGlvbiBtYWtlU3F1YXJlKGNvbG9yLCB4LCB5KSB7XHJcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnc3F1YXJlJyxcclxuICAgICAgY29sb3IsXHJcbiAgICAgICd3LTEwJyxcclxuICAgICAgJ2gtMTAnLFxyXG4gICAgICAnbWQ6dy0xNCcsXHJcbiAgICAgICdtZDpoLTE0JyxcclxuICAgICAgJ2xnOnctWzQuNXJlbV0nLFxyXG4gICAgICAnbGc6aC1bNC41cmVtXScsXHJcbiAgICAgICd4bDp3LTIwJyxcclxuICAgICAgJ3hsOmgtMjAnXHJcbiAgICApO1xyXG4gICAgc3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XHJcbiAgICBzcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcclxuICAgIHJldHVybiBzcXVhcmU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKCkge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1zcXVhcmUtYmxhY2snLCAnbWQ6bXgtMCcsICdteC1hdXRvJywgJ3ctZml0JywgJ2gtZml0Jyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcclxuICAgICAgY29uc3QgY29sb3JBcnIgPSBbJ2JnLXNxdWFyZS13aGl0ZScsICdiZy1zcXVhcmUtYmxhY2snXTtcclxuICAgICAgbGV0IGluZGV4ID0gMCArIChpICUgMiAhPT0gMCk7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaiArPSAxKSB7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKG1ha2VTcXVhcmUoY29sb3JBcnJbaW5kZXhdLCBqLCA3IC0gaSkpO1xyXG4gICAgICAgIGluZGV4ICs9IDE7XHJcbiAgICAgICAgaW5kZXggJT0gMjtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVUaXRsZSgpIHtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdmb250LXRpdGxlJyxcclxuICAgICAgJ3RleHQtNXhsJyxcclxuICAgICAgJ3RleHQtY2VudGVyJyxcclxuICAgICAgJ3RleHQtc3F1YXJlLWJsYWNrJyxcclxuICAgICAgJ3B5LTUnLFxyXG4gICAgICAnbWQ6cHktMCcsXHJcbiAgICAgICdtZDp0ZXh0LTZ4bCcsXHJcbiAgICAgICd4bDp0ZXh0LTh4bCcsXHJcbiAgICAgICdtZDptYi0zJ1xyXG4gICAgKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0tuaWdodCBUcmF2YWlscyc7XHJcbiAgICByZXR1cm4gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZUJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKCdmbGV4JywgJ2p1c3RpZnktY2VudGVyJywgJ2dhcC02Jyk7XHJcblxyXG4gICAgY29uc3QgcGxhY2VLbmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHBsYWNlS25pZ2h0LmlkID0gJ3BsYWNlLWtuaWdodCc7XHJcbiAgICBwbGFjZUtuaWdodC50ZXh0Q29udGVudCA9ICdQbGFjZSBrbmlnaHQnO1xyXG4gICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHBsYWNlS25pZ2h0KTtcclxuICAgIHBsYWNlS25pZ2h0LmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdiZy1zcXVhcmUtYmxhY2snLFxyXG4gICAgICAndGV4dC1zbGF0ZS0zMDAnLFxyXG4gICAgICAnZm9udC1tYWluJyxcclxuICAgICAgJ3B4LTInLFxyXG4gICAgICAncHktMScsXHJcbiAgICAgICd0ZXh0LXhsJyxcclxuICAgICAgJ3JvdW5kZWQnXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHBsYWNlRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBwbGFjZUVuZC5pZCA9ICdwbGFjZS1lbmQnO1xyXG4gICAgcGxhY2VFbmQudGV4dENvbnRlbnQgPSAnUGxhY2UgZW5kaW5nJztcclxuICAgIHBsYWNlRW5kLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdiZy1zcXVhcmUtYmxhY2snLFxyXG4gICAgICAndGV4dC1zbGF0ZS0zMDAnLFxyXG4gICAgICAnZm9udC1tYWluJyxcclxuICAgICAgJ3B4LTInLFxyXG4gICAgICAncHktMScsXHJcbiAgICAgICd0ZXh0LXhsJyxcclxuICAgICAgJ3JvdW5kZWQnXHJcbiAgICApO1xyXG4gICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHBsYWNlRW5kKTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9uRGl2O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoYXBwKSB7XHJcbiAgICBjb25zdCBwbGFjZUtuaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1rbmlnaHQnKTtcclxuICAgIGNvbnN0IHBsYWNlRW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLWVuZCcpO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuXHJcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgYXBwLm1vdmUoKTtcclxuICAgICAgYXBwLmNoYW5nZVN0YXRlUGxhY2luZygpO1xyXG4gICAgfSk7XHJcbiAgICBwbGFjZUtuaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgYXBwLmNoYW5nZVN0YXRlS25pZ2h0KCk7XHJcbiAgICB9KTtcclxuICAgIHBsYWNlRW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBhcHAuY2hhbmdlU3RhdGVFbmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XHJcbiAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB4IH0gPSBzcXVhcmUuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IHkgfSA9IHNxdWFyZS5kYXRhc2V0O1xyXG4gICAgICAgIGlmIChhcHAucGxhY2luZ0tuaWdodCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYXBwKTtcclxuICAgICAgICAgIGlmIChhcHAuc3RhcnRTcXVhcmUgIT09IG51bGwgJiYgYXBwLnN0YXJ0U3F1YXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2EnKTtcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlV2l0aEtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgICAgYC5zcXVhcmVbZGF0YS14PVwiJHthcHAuc3RhcnRTcXVhcmUueH1cIl1bZGF0YS15PVwiJHthcHAuc3RhcnRTcXVhcmUueX1cIl1gXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNxdWFyZVdpdGhLbmlnaHQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhcHAucGxhY2VLbmlnaHQocGFyc2VJbnQoeCwgMTApLCBwYXJzZUludCh5LCAxMCkpO1xyXG4gICAgICAgICAgY29uc3QgbmV3U3F1YXJlV2l0aEtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgIGltZy5zcmMgPSBrbmlnaHRJbWFnZTtcclxuICAgICAgICAgIG5ld1NxdWFyZVdpdGhLbmlnaHQuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFwcC5wbGFjaW5nRW5kKSB7XHJcbiAgICAgICAgICBhcHAucGxhY2VFbmQocGFyc2VJbnQoeCwgMTApLCBwYXJzZUludCh5LCAxMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAuY2hhbmdlU3RhdGVQbGFjaW5nKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwYWdlTG9hZCgpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtYWluLmlkID0gJ21haW4nO1xyXG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnbWQ6ZmxleCcsXHJcbiAgICAgICdtZDpqdXN0aWZ5LWJldHdlZW4nLFxyXG4gICAgICAnbWQ6dy1mdWxsJyxcclxuICAgICAgJ21kOmgtZnVsbCcsXHJcbiAgICAgICdtZDppdGVtcy1jZW50ZXInLFxyXG4gICAgICAnbWQ6cHgtOCcsXHJcbiAgICAgICdtZDpnYXAtNCcsXHJcbiAgICAgICd4bDpweC0zMidcclxuICAgICk7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlQW5kQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGl0bGVBbmRCdXR0b25zLmFwcGVuZENoaWxkKGdlbmVyYXRlVGl0bGUoKSk7XHJcbiAgICB0aXRsZUFuZEJ1dHRvbnMuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVCdXR0b25zKCkpO1xyXG4gICAgdGl0bGVBbmRCdXR0b25zLmNsYXNzTGlzdC5hZGQoJ21iLTUnLCAnbWQ6bWItMCcpO1xyXG4gICAgbWFpbi5hcHBlbmRDaGlsZCh0aXRsZUFuZEJ1dHRvbnMpO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBib2FyZERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4JywgJ2ZsZXgtY29sJywgJ2l0ZW1zLWNlbnRlcicsICdnYXAtNCcpO1xyXG4gICAgYm9hcmREaXYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVCb2FyZCgpKTtcclxuXHJcbiAgICBjb25zdCB0cmF2YWlsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0cmF2YWlsQnV0dG9uLmlkID0gJ3N0YXJ0JztcclxuICAgIHRyYXZhaWxCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQhJztcclxuICAgIHRyYXZhaWxCdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2ZvbnQtdGl0bGUnLFxyXG4gICAgICAnYmctc3F1YXJlLWJsYWNrJyxcclxuICAgICAgJ3RleHQtc2xhdGUtMzAwJyxcclxuICAgICAgJ2ZvbnQtbWFpbicsXHJcbiAgICAgICdweC0yJyxcclxuICAgICAgJ3B5LTEnLFxyXG4gICAgICAndGV4dC0zeGwnLFxyXG4gICAgICAncm91bmRlZCdcclxuICAgICk7XHJcbiAgICBib2FyZERpdi5hcHBlbmRDaGlsZCh0cmF2YWlsQnV0dG9uKTtcclxuXHJcbiAgICBtYWluLmFwcGVuZENoaWxkKGJvYXJkRGl2KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHBhZ2VMb2FkLCBhZGRFdmVudExpc3RlbmVycyB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRE9Nc3R1ZmY7XHJcbiIsImZ1bmN0aW9uIGdlbmVyYXRlQm9hcmQoKSB7XHJcbiAgY29uc3QgYXJyID0gWy4uLm5ldyBBcnJheSg4KV0ubWFwKCgpID0+IEFycmF5KDgpLmZpbGwoJycpKTtcclxuICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBrbmlnaHRNb3Zlcyh4MSwgeTEsIHgyLCB5Mikge1xyXG4gIGNvbnN0IGJvYXJkID0gZ2VuZXJhdGVCb2FyZCgpO1xyXG4gIGNvbnN0IHF1ZXVlID0gW107XHJcbiAgcXVldWUucHVzaCh7IHg6IHgxLCB5OiB5MSwgbW92ZXM6IFtdIH0pO1xyXG4gIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zdCB0b3AgPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgY29uc3QgW3gsIHldID0gW3RvcC54LCB0b3AueV07XHJcbiAgICBpZiAoeCA+PSAwICYmIHggPD0gNyAmJiB5ID49IDAgJiYgeSA8PSA3ICYmIGJvYXJkW3hdW3ldID09PSAnJykge1xyXG4gICAgICBjb25zdCBhcnIgPSBbLi4udG9wLm1vdmVzXTtcclxuICAgICAgYXJyLnB1c2goeyB4LCB5IH0pO1xyXG4gICAgICBpZiAoeCA9PT0geDIgJiYgeSA9PT0geTIpIHtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICB9XHJcbiAgICAgIGJvYXJkW3hdW3ldID0gJzEnO1xyXG4gICAgICBjb25zdCB4TW92ZSA9IFsyLCAxLCAtMSwgLTIsIC0yLCAtMSwgMSwgMl07XHJcbiAgICAgIGNvbnN0IHlNb3ZlID0gWzEsIDIsIDIsIDEsIC0xLCAtMiwgLTIsIC0xXTtcclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4ICs9IDEpIHtcclxuICAgICAgICBjb25zdCBuZXdYID0geCArIHhNb3ZlW2luZGV4XTtcclxuICAgICAgICBjb25zdCBuZXdZID0geSArIHlNb3ZlW2luZGV4XTtcclxuICAgICAgICBxdWV1ZS5wdXNoKHsgeDogbmV3WCwgeTogbmV3WSwgbW92ZXM6IGFyciB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFtdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBrbmlnaHRNb3ZlcztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBBcHAgZnJvbSAnLi9jbGFzc2VzL2FwcCc7XHJcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xyXG5hcHAuc3RhcnQoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
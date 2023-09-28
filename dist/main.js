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
      console.log(moves);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0Isb0RBQUc7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHQvLi9zcmMvc3R5bGUuY3NzP2ZlOWUiLCJ3ZWJwYWNrOi8va25pZ2h0Ly4vc3JjL2NsYXNzZXMvYXBwLmpzIiwid2VicGFjazovL2tuaWdodC8uL3NyYy9mdW5jdGlvbnMvRE9Nc3R1ZmYuanMiLCJ3ZWJwYWNrOi8va25pZ2h0Ly4vc3JjL2Z1bmN0aW9ucy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9rbmlnaHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25pZ2h0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rbmlnaHQvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9rbmlnaHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbmlnaHQvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8va25pZ2h0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBET01zdHVmZiBmcm9tICcuLi9mdW5jdGlvbnMvRE9Nc3R1ZmYnO1xyXG5pbXBvcnQga25pZ2h0TW92ZXMgZnJvbSAnLi4vZnVuY3Rpb25zL2JvYXJkJztcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLkRPTXN0dWZmID0gRE9Nc3R1ZmY7XHJcbiAgICB0aGlzLnN0YXJ0U3F1YXJlID0gbnVsbDtcclxuICAgIHRoaXMuZW5kU3F1YXJlID0gbnVsbDtcclxuICAgIHRoaXMucGxhY2luZ0tuaWdodCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wbGFjaW5nRW5kID0gZmFsc2U7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5ET01zdHVmZi5wYWdlTG9hZCgpO1xyXG4gICAgdGhpcy5ET01zdHVmZi5hZGRFdmVudExpc3RlbmVycyh0aGlzKTtcclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJ1bm5pbmcgJiZcclxuICAgICAgdGhpcy5zdGFydFNxdWFyZSAhPT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLmVuZFNxdWFyZSAhPT0gbnVsbCAmJlxyXG4gICAgICAodGhpcy5zdGFydFNxdWFyZS54ICE9PSB0aGlzLmVuZFNxdWFyZS54IHx8IHRoaXMuc3RhcnRTcXVhcmUueSAhPT0gdGhpcy5lbmRTcXVhcmUueSlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBtb3ZlcyA9IGtuaWdodE1vdmVzKFxyXG4gICAgICAgIHRoaXMuc3RhcnRTcXVhcmUueCxcclxuICAgICAgICB0aGlzLnN0YXJ0U3F1YXJlLnksXHJcbiAgICAgICAgdGhpcy5lbmRTcXVhcmUueCxcclxuICAgICAgICB0aGlzLmVuZFNxdWFyZS55XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1vdmVzKTtcclxuICAgICAgRE9Nc3R1ZmYuYW5pbWF0ZShtb3ZlcywgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTdGF0ZUtuaWdodCgpIHtcclxuICAgIHRoaXMucGxhY2luZ0tuaWdodCA9IHRydWU7XHJcbiAgICB0aGlzLnBsYWNpbmdFbmQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVN0YXRlRW5kKCkge1xyXG4gICAgdGhpcy5wbGFjaW5nRW5kID0gdHJ1ZTtcclxuICAgIHRoaXMucGxhY2luZ0tuaWdodCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlU3RhdGVQbGFjaW5nKCkge1xyXG4gICAgdGhpcy5wbGFjaW5nRW5kID0gZmFsc2U7XHJcbiAgICB0aGlzLnBsYWNpbmdLbmlnaHQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBsYWNlS25pZ2h0KHgsIHkpIHtcclxuICAgIHRoaXMuc3RhcnRTcXVhcmUgPSB7IHgsIHkgfTtcclxuICB9XHJcblxyXG4gIHBsYWNlRW5kKHgsIHkpIHtcclxuICAgIHRoaXMuZW5kU3F1YXJlID0geyB4LCB5IH07XHJcbiAgfVxyXG5cclxuICBzZXRSdW5uaW5nKHZhbHVlKSB7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDtcclxuIiwiaW1wb3J0IGtuaWdodEltYWdlIGZyb20gJy4uL2ltYWdlcy9rbmlnaHQuc3ZnJztcclxuXHJcbmNvbnN0IERPTXN0dWZmID0gKCgpID0+IHtcclxuICBmdW5jdGlvbiBtYWtlU3F1YXJlKGNvbG9yLCB4LCB5KSB7XHJcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnc3F1YXJlJyxcclxuICAgICAgY29sb3IsXHJcbiAgICAgICd3LTEwJyxcclxuICAgICAgJ2gtMTAnLFxyXG4gICAgICAnbWQ6dy0xNCcsXHJcbiAgICAgICdtZDpoLTE0JyxcclxuICAgICAgJ2xnOnctWzQuNXJlbV0nLFxyXG4gICAgICAnbGc6aC1bNC41cmVtXScsXHJcbiAgICAgICd4bDp3LTIwJyxcclxuICAgICAgJ3hsOmgtMjAnXHJcbiAgICApO1xyXG4gICAgc3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS14JywgeCk7XHJcbiAgICBzcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXknLCB5KTtcclxuICAgIHJldHVybiBzcXVhcmU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKCkge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1zcXVhcmUtYmxhY2snLCAnbWQ6bXgtMCcsICdteC1hdXRvJywgJ3ctZml0JywgJ2gtZml0Jyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ2ZsZXgnKTtcclxuICAgICAgY29uc3QgY29sb3JBcnIgPSBbJ2JnLXNxdWFyZS13aGl0ZScsICdiZy1zcXVhcmUtYmxhY2snXTtcclxuICAgICAgbGV0IGluZGV4ID0gMCArIChpICUgMiAhPT0gMCk7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaiArPSAxKSB7XHJcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKG1ha2VTcXVhcmUoY29sb3JBcnJbaW5kZXhdLCBqLCA3IC0gaSkpO1xyXG4gICAgICAgIGluZGV4ICs9IDE7XHJcbiAgICAgICAgaW5kZXggJT0gMjtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVUaXRsZSgpIHtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdmb250LXRpdGxlJyxcclxuICAgICAgJ3RleHQtNXhsJyxcclxuICAgICAgJ3RleHQtY2VudGVyJyxcclxuICAgICAgJ3RleHQtc3F1YXJlLWJsYWNrJyxcclxuICAgICAgJ3B5LTUnLFxyXG4gICAgICAnbWQ6cHktMCcsXHJcbiAgICAgICdtZDp0ZXh0LTZ4bCcsXHJcbiAgICAgICd4bDp0ZXh0LTh4bCcsXHJcbiAgICAgICdtZDptYi0zJ1xyXG4gICAgKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0tuaWdodCBUcmF2YWlscyc7XHJcbiAgICByZXR1cm4gdGl0bGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZUJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKCdmbGV4JywgJ2p1c3RpZnktY2VudGVyJywgJ2dhcC02Jyk7XHJcblxyXG4gICAgY29uc3QgcGxhY2VLbmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHBsYWNlS25pZ2h0LmlkID0gJ3BsYWNlLWtuaWdodCc7XHJcbiAgICBwbGFjZUtuaWdodC50ZXh0Q29udGVudCA9ICdQbGFjZSBrbmlnaHQnO1xyXG4gICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHBsYWNlS25pZ2h0KTtcclxuICAgIHBsYWNlS25pZ2h0LmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdiZy1zcXVhcmUtYmxhY2snLFxyXG4gICAgICAndGV4dC1zbGF0ZS0zMDAnLFxyXG4gICAgICAnZm9udC1tYWluJyxcclxuICAgICAgJ3B4LTInLFxyXG4gICAgICAncHktMScsXHJcbiAgICAgICd0ZXh0LXhsJyxcclxuICAgICAgJ3JvdW5kZWQnXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHBsYWNlRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBwbGFjZUVuZC5pZCA9ICdwbGFjZS1lbmQnO1xyXG4gICAgcGxhY2VFbmQudGV4dENvbnRlbnQgPSAnUGxhY2UgZW5kaW5nJztcclxuICAgIHBsYWNlRW5kLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdiZy1zcXVhcmUtYmxhY2snLFxyXG4gICAgICAndGV4dC1zbGF0ZS0zMDAnLFxyXG4gICAgICAnZm9udC1tYWluJyxcclxuICAgICAgJ3B4LTInLFxyXG4gICAgICAncHktMScsXHJcbiAgICAgICd0ZXh0LXhsJyxcclxuICAgICAgJ3JvdW5kZWQnXHJcbiAgICApO1xyXG4gICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHBsYWNlRW5kKTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9uRGl2O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoYXBwKSB7XHJcbiAgICBjb25zdCBwbGFjZUtuaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1rbmlnaHQnKTtcclxuICAgIGNvbnN0IHBsYWNlRW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLWVuZCcpO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuXHJcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgYXBwLm1vdmUoKTtcclxuICAgICAgYXBwLmNoYW5nZVN0YXRlUGxhY2luZygpO1xyXG4gICAgfSk7XHJcbiAgICBwbGFjZUtuaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgYXBwLmNoYW5nZVN0YXRlS25pZ2h0KCk7XHJcbiAgICB9KTtcclxuICAgIHBsYWNlRW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBhcHAuY2hhbmdlU3RhdGVFbmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XHJcbiAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB4IH0gPSBzcXVhcmUuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IHkgfSA9IHNxdWFyZS5kYXRhc2V0O1xyXG4gICAgICAgIGlmIChhcHAucGxhY2luZ0tuaWdodCkge1xyXG4gICAgICAgICAgaWYgKGFwcC5zdGFydFNxdWFyZSAhPT0gbnVsbCAmJiBhcHAuc3RhcnRTcXVhcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVXaXRoS25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgICBgLnNxdWFyZVtkYXRhLXg9XCIke2FwcC5zdGFydFNxdWFyZS54fVwiXVtkYXRhLXk9XCIke2FwcC5zdGFydFNxdWFyZS55fVwiXWBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc3F1YXJlV2l0aEtuaWdodC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFwcC5wbGFjZUtuaWdodChwYXJzZUludCh4LCAxMCksIHBhcnNlSW50KHksIDEwKSk7XHJcbiAgICAgICAgICBjb25zdCBuZXdTcXVhcmVXaXRoS25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgYC5zcXVhcmVbZGF0YS14PVwiJHt4fVwiXVtkYXRhLXk9XCIke3l9XCJdYFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgaW1nLnNyYyA9IGtuaWdodEltYWdlO1xyXG4gICAgICAgICAgaW1nLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZSgwLjgpJztcclxuICAgICAgICAgIG5ld1NxdWFyZVdpdGhLbmlnaHQuYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFwcC5wbGFjaW5nRW5kKSB7XHJcbiAgICAgICAgICBpZiAoYXBwLmVuZFNxdWFyZSAhPT0gbnVsbCAmJiBhcHAuZW5kU3F1YXJlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZW5kU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgICBgLnNxdWFyZVtkYXRhLXg9XCIke2FwcC5lbmRTcXVhcmUueH1cIl1bZGF0YS15PVwiJHthcHAuZW5kU3F1YXJlLnl9XCJdYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBlbmRTcXVhcmUuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhcHAucGxhY2VFbmQocGFyc2VJbnQoeCwgMTApLCBwYXJzZUludCh5LCAxMCkpO1xyXG4gICAgICAgICAgY29uc3QgbmV3RW5kU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNxdWFyZVtkYXRhLXg9XCIke3h9XCJdW2RhdGEteT1cIiR7eX1cIl1gKTtcclxuICAgICAgICAgIGNvbnN0IG92ZXJsYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIG92ZXJsYXlEaXYuY2xhc3NMaXN0LmFkZCgndy1mdWxsJywgJ2gtZnVsbCcsICdiZy1yZWQtNjAwJywgJ29wYWNpdHktNTAnKTtcclxuICAgICAgICAgIG5ld0VuZFNxdWFyZS5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gJyM4NjIxMUInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAuY2hhbmdlU3RhdGVQbGFjaW5nKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwYWdlTG9hZCgpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtYWluLmlkID0gJ21haW4nO1xyXG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnbWQ6ZmxleCcsXHJcbiAgICAgICdtZDpqdXN0aWZ5LWJldHdlZW4nLFxyXG4gICAgICAnbWQ6dy1mdWxsJyxcclxuICAgICAgJ21kOmgtZnVsbCcsXHJcbiAgICAgICdtZDppdGVtcy1jZW50ZXInLFxyXG4gICAgICAnbWQ6cHgtOCcsXHJcbiAgICAgICdtZDpnYXAtNCcsXHJcbiAgICAgICd4bDpweC0zMidcclxuICAgICk7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlQW5kQnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGl0bGVBbmRCdXR0b25zLmFwcGVuZENoaWxkKGdlbmVyYXRlVGl0bGUoKSk7XHJcbiAgICB0aXRsZUFuZEJ1dHRvbnMuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVCdXR0b25zKCkpO1xyXG4gICAgdGl0bGVBbmRCdXR0b25zLmNsYXNzTGlzdC5hZGQoJ21iLTUnLCAnbWQ6bWItMCcpO1xyXG4gICAgbWFpbi5hcHBlbmRDaGlsZCh0aXRsZUFuZEJ1dHRvbnMpO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBib2FyZERpdi5jbGFzc0xpc3QuYWRkKCdmbGV4JywgJ2ZsZXgtY29sJywgJ2l0ZW1zLWNlbnRlcicsICdnYXAtNCcpO1xyXG4gICAgYm9hcmREaXYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVCb2FyZCgpKTtcclxuXHJcbiAgICBjb25zdCB0cmF2YWlsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0cmF2YWlsQnV0dG9uLmlkID0gJ3N0YXJ0JztcclxuICAgIHRyYXZhaWxCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQhJztcclxuICAgIHRyYXZhaWxCdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2ZvbnQtbWFpbicsXHJcbiAgICAgICdiZy1zcXVhcmUtYmxhY2snLFxyXG4gICAgICAndGV4dC1zbGF0ZS0zMDAnLFxyXG4gICAgICAnZm9udC1tYWluJyxcclxuICAgICAgJ3B4LTInLFxyXG4gICAgICAncHktMScsXHJcbiAgICAgICd0ZXh0LTN4bCcsXHJcbiAgICAgICdyb3VuZGVkJ1xyXG4gICAgKTtcclxuICAgIGJvYXJkRGl2LmFwcGVuZENoaWxkKHRyYXZhaWxCdXR0b24pO1xyXG5cclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoYm9hcmREaXYpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZShwYXRoLCBhcHApIHtcclxuICAgIGZ1bmN0aW9uIG1vdmVLbmlnaHRUb1NxdWFyZSh4MSwgeTEsIHgyLCB5MiwgcCkge1xyXG4gICAgICBjb25zdCBzcXVhcmVXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3F1YXJlJykpLndpZHRoKTtcclxuICAgICAgY29uc3Qga25pZ2h0U3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNxdWFyZSBpbWcnKTtcclxuXHJcbiAgICAgIGNvbnN0IGR4ID0geDIgLSB4MTtcclxuICAgICAgY29uc3QgZHkgPSB5MiAtIHkxO1xyXG5cclxuICAgICAgY29uc3QgeFBvc2l0aW9uID0gZHggKiBzcXVhcmVXaWR0aCArIHAueDtcclxuICAgICAgY29uc3QgeVBvc2l0aW9uID0gLWR5ICogc3F1YXJlV2lkdGggKyBwLnk7XHJcblxyXG4gICAgICBrbmlnaHRTcXVhcmUuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICAgIGtuaWdodFNxdWFyZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eFBvc2l0aW9ufXB4LCAke3lQb3NpdGlvbn1weCkgc2NhbGUoMC44KWA7XHJcblxyXG4gICAgICByZXR1cm4geyB4OiB4UG9zaXRpb24sIHk6IHlQb3NpdGlvbiB9O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWxheSA9IDA7XHJcbiAgICBsZXQgcCA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc3F1YXJlW2RhdGEteD1cIiR7cGF0aFswXS54fVwiXVtkYXRhLXk9XCIke3BhdGhbMF0ueX1cIl1gKTtcclxuICAgIGNvbnN0IGVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7cGF0aFtwYXRoLmxlbmd0aCAtIDFdLnh9XCJdW2RhdGEteT1cIiR7cGF0aFtwYXRoLmxlbmd0aCAtIDFdLnl9XCJdYFxyXG4gICAgKTtcclxuICAgIGFwcC5zZXRSdW5uaW5nKHRydWUpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVuZC5pbm5lckhUTUwgPSBzdGFydC5pbm5lckhUTUw7XHJcbiAgICAgIHN0YXJ0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3F1YXJlIGltZycpLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoMHB4LCAwcHgpIHNjYWxlKDAuOClgO1xyXG4gICAgICBhcHAucGxhY2VLbmlnaHQocGF0aFtwYXRoLmxlbmd0aCAtIDFdLngsIHBhdGhbcGF0aC5sZW5ndGggLSAxXS55KTtcclxuICAgICAgYXBwLnNldFJ1bm5pbmcoZmFsc2UpO1xyXG4gICAgfSwgNTAwICogcGF0aC5sZW5ndGgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmIChpIDwgcGF0aC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgcCA9IG1vdmVLbmlnaHRUb1NxdWFyZShwYXRoW2ldLngsIHBhdGhbaV0ueSwgcGF0aFtpICsgMV0ueCwgcGF0aFtpICsgMV0ueSwgcCk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgIGRlbGF5ICs9IDUwMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgcGFnZUxvYWQsIGFkZEV2ZW50TGlzdGVuZXJzLCBhbmltYXRlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBET01zdHVmZjtcclxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVCb2FyZCgpIHtcclxuICBjb25zdCBhcnIgPSBbLi4ubmV3IEFycmF5KDgpXS5tYXAoKCkgPT4gQXJyYXkoOCkuZmlsbCgnJykpO1xyXG4gIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtuaWdodE1vdmVzKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgY29uc3QgYm9hcmQgPSBnZW5lcmF0ZUJvYXJkKCk7XHJcbiAgY29uc3QgcXVldWUgPSBbXTtcclxuICBxdWV1ZS5wdXNoKHsgeDogeDEsIHk6IHkxLCBtb3ZlczogW10gfSk7XHJcbiAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnN0IHRvcCA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBbdG9wLngsIHRvcC55XTtcclxuICAgIGlmICh4ID49IDAgJiYgeCA8PSA3ICYmIHkgPj0gMCAmJiB5IDw9IDcgJiYgYm9hcmRbeF1beV0gPT09ICcnKSB7XHJcbiAgICAgIGNvbnN0IGFyciA9IFsuLi50b3AubW92ZXNdO1xyXG4gICAgICBhcnIucHVzaCh7IHgsIHkgfSk7XHJcbiAgICAgIGlmICh4ID09PSB4MiAmJiB5ID09PSB5Mikge1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmRbeF1beV0gPSAnMSc7XHJcbiAgICAgIGNvbnN0IHhNb3ZlID0gWzIsIDEsIC0xLCAtMiwgLTIsIC0xLCAxLCAyXTtcclxuICAgICAgY29uc3QgeU1vdmUgPSBbMSwgMiwgMiwgMSwgLTEsIC0yLCAtMiwgLTFdO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgODsgaW5kZXggKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1ggPSB4ICsgeE1vdmVbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG5ld1kgPSB5ICsgeU1vdmVbaW5kZXhdO1xyXG4gICAgICAgIHF1ZXVlLnB1c2goeyB4OiBuZXdYLCB5OiBuZXdZLCBtb3ZlczogYXJyIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gW107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGtuaWdodE1vdmVzO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IEFwcCBmcm9tICcuL2NsYXNzZXMvYXBwJztcclxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XHJcbmFwcC5zdGFydCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
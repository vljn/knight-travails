import knightImage from '../images/knight.svg';

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
          img.src = knightImage;
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

export default DOMstuff;

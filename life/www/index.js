import { Universe, Cell } from "life";
import { memory } from "life/life_bg";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#000000";
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#CCCCCC";

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("life");
const ctx = canvas.getContext("2d");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const getIndex = (row, column) => {
  return row * width + column
}

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // vertical
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // horizontal
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0                          , j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  // Alive cells
  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      if (cells[idx] !== Cell.Alive) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  // Dead cells
  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      if (cells[idx] !== Cell.Dead) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

let animationId = null;

const renderLoop = () => {
  drawGrid();
  drawCells();

  for (let i = 0; i < 1; i++) {
    universe.tick();
  }

  animationId = requestAnimationFrame(renderLoop);
}

const isPaused = () => {
  return animationId === null;
}

const play = () => {
  renderLoop();
}

const pause = () => {
  cancelAnimationFrame(animationId);
  animationId = null;
}

window.onkeypress = e => {
  let ch = e.which;
  if (ch === 13) {
    if (isPaused()) {
      play();
    } else {
      pause();
    }
  }
};

// canvas.addEventListener("click", event => {
//   const boundingRect = canvas.getBoundingClientRect();

//   const scaleX = canvas.width / boundingRect.width;
//   const scaleY = canvas.height / boundingRect.height;

//   const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
//   const canvasTop = (event.clientY - boundingRect.top) * scaleY;

//   const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
//   const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

//   universe.toggle_cell(row, col);

//   drawGrid();
//   drawCells();
// });

play();

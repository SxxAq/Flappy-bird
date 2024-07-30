//--------------------board-------------
let board;
let ctx;
const boardHeight = 640;
const boardWidth = 360;

// bird
const birdWidth = 34;
const birdHeight = 24;
let birdX = boardWidth / 15;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  ctx = board.getContext("2d");

  // drawing bird
//   ctx.fillStyle = "green";
//   ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // birdImg load
  birdImg = new Image();
  birdImg.src = "./assets/bluebird-midflap.png";
  birdImg.onload = function () {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
};

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
// pipe
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 520;
let pipeX = boardWidth;
let pipeY = 0;

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

  topPipeImg = new Image();
  topPipeImg.src = "./assets/toppipe.png";

  botPipeImg = new Image();
  botPipeImg.src = "./assets/bottompipe.png";
  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
};

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, board.width, board.height);
  // bird
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  //pipes
  for (i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  }
}

function placePipes() {
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: pipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);
}

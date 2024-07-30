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

// game physics
let velocityX = -4; // pipe moving speed
let velocityY = 0; // bird jump speed
let gravity = 0.4;
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
  document.addEventListener("keydown", moveBird);
  document.addEventListener("click", moveBird);
};

function update() {
  requestAnimationFrame(update);
  if (checkCollisions()) {
    return;
  }
  ctx.clearRect(0, 0, board.width, board.height);
  // bird
  velocityY += gravity;
  //   bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); //limit the bird to jump top of canvas
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (checkCollisions()) {
    return;
  }

  //pipes
  for (i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    
  }
}

function placePipes() {
  if (checkCollisions()) {
    return;
  }
  let randPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openSpace = board.height / 4;
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let botPipe = {
    img: botPipeImg,
    x: pipeX,
    y: randPipeY + pipeHeight + openSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(botPipe);
}

function moveBird(e) {
  if (
    e.type === "keydown" &&
    (e.code === "Space" ||
      e.code === "ArrowUp" ||
      e.code === "KeyX" ||
      e.code === "Click")
  ) {
    //jump
    velocityY = -6;
  } else if (e.type === "click") {
    velocityY = -6;
  }
}

function checkCollisions() {
  // Check if bird hits the ground or top
  if (bird.y + bird.height > boardHeight || bird.y < 0) {
    return true;
  }

  // Check if bird hits any pipe
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      bird.y < pipe.y + pipe.height &&
      bird.y + bird.height > pipe.y
    ) {
      return true;
    }
  }
  return false;
}

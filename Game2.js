let xCandy;
let yCandy;
let candyLeeway;
let candyWidthAfterDiv;
let candyHeightAfterDiv;
let MAZEDIVCONSTANT;
let CANDYDIVCONSTANT;
let NAMIDIVCONSTANT;
let isMoving;

function game2Setup() {
  currGame = 2;
  MAZEDIVCONSTANT = 1472 / screenWidth;
  CANDYDIVCONSTANT = 6400 / screenWidth;
  NAMIDIVCONSTANT = 9;
  removeElements();
  background(252, 205, 221);
  fill("white");
  textSize(screenHeight / 20);
  textStyle(BOLD);
  
  xCandy = (screenWidth - maze.width / MAZEDIVCONSTANT) / 2 - (screenWidth / 28);
  yCandy = (screenHeight - maze.height / MAZEDIVCONSTANT) / 2 + (screenHeight / 16);
  candyLeeway = screenHeight / 48;
  candyWidthAfterDiv = candy.width / CANDYDIVCONSTANT;
  candyHeightAfterDiv = candy.height / CANDYDIVCONSTANT;
  start = false;
  isMoving = false;
  
  mainMenuButton();
  feedStart();
  mazeInstructions();
}

function game2Draw() {
  if(start) {
    background(255, 204, 220);
    makeMaze();
    makeSecondCandy();
    makeNami();
    
    if(isMoving &&
      (color(get(mouseX + candyWidthAfterDiv / 2 - candyLeeway, mouseY)).toString() ==
        color("black").toString() ||
        color(get(mouseX - candyWidthAfterDiv / 2 + candyLeeway, mouseY)).toString() ==
          color("black").toString() ||
        color(get(mouseX, mouseY + candyHeightAfterDiv / 2 - candyLeeway)).toString() ==
          color("black").toString() ||
        color(get(mouseX, mouseY - candyHeightAfterDiv / 2 + candyLeeway)).toString() ==
          color("black").toString())
    ) {
        g2fail.play();
        mazeLose();
    }
    
    cheatCheck();
    
    if(isMoving && mouseX >= ((screenWidth - maze.width / MAZEDIVCONSTANT) / 2) && mouseX <= ((screenWidth - maze.width / MAZEDIVCONSTANT) / 2) + (nami.width / NAMIDIVCONSTANT) && mouseY >= ((screenHeight - maze.height / MAZEDIVCONSTANT) / 2) + (maze.height / MAZEDIVCONSTANT) - (screenHeight / 16) && mouseY <= ((screenHeight - maze.height / MAZEDIVCONSTANT) / 2) + (maze.height / MAZEDIVCONSTANT) - (screenHeight / 16) + (nami.height / NAMIDIVCONSTANT)) {
      mazeWon();
    }
  }
}

function feedStart() {
  feedStartButton = createButton("Start");
  feedStartButton.addClass("start-button");
  feedStartButton.center("horizontal");
  feedStartButton.position((screenWidth / 2) - (feedStartButton.width / 2), 400);
  feedStartButton.mousePressed(() => {
    start = true;
    feedStartButton.style("opacity", 0);
  });
}

function makeMaze() {
  imageMode(CORNER);
  image(
    maze,
    (screenWidth - maze.width / MAZEDIVCONSTANT) / 2,
    (screenHeight - maze.height / MAZEDIVCONSTANT) / 2,
    maze.width / MAZEDIVCONSTANT,
    maze.height / MAZEDIVCONSTANT
  );
}

function makeSecondCandy() {
  imageMode(CENTER);
  image(
    candy,
    xCandy,
    yCandy,
    candy.width / CANDYDIVCONSTANT,
    candy.height / CANDYDIVCONSTANT
  );
}

function makeNami() {
  imageMode(CENTER);
  image(
    nami,
    ((screenWidth - maze.width / MAZEDIVCONSTANT) / 2),
    ((screenHeight - maze.height / MAZEDIVCONSTANT) / 2) + (maze.height / MAZEDIVCONSTANT) - (screenHeight / 16),
    nami.width / NAMIDIVCONSTANT,
    nami.height / NAMIDIVCONSTANT
  );
}

function cheatCheck() {
    if(mouseX >= 0 && mouseX <= (screenWidth - maze.width / MAZEDIVCONSTANT) / 2 && mouseY >= (screenHeight / 2) - 20 && mouseY <= (screenHeight / 2) + 20) {
        mazeLose();
    }
    
    if(mouseX >= ((screenWidth - maze.width / MAZEDIVCONSTANT) / 2) + (maze.width / MAZEDIVCONSTANT) && mouseX <= screenWidth && mouseY >= (screenHeight / 2) - 20 && mouseY <= (screenHeight / 2) + 20) {
        mazeLose();
      }
}

function mouseDragged() {
  if (
    mouseX > xCandy - candyWidthAfterDiv / 2 &&
    mouseX < xCandy + candyWidthAfterDiv / 2
  ) {
    if (
      (mouseY > yCandy - candyHeightAfterDiv) / 2 &&
      mouseY < yCandy + candyHeightAfterDiv / 2
    ) {
      xCandy = mouseX;
      yCandy = mouseY;
      isMoving = true;
    }
  }
}

function mouseReleased() {
  if (
    mouseX > xCandy - candyWidthAfterDiv / 2 &&
    mouseX < xCandy + candyWidthAfterDiv / 2
  ) {
    if (
      (mouseY > yCandy - candyHeightAfterDiv) / 2 &&
      mouseY < yCandy + candyHeightAfterDiv / 2
    ) {
      isMoving = false;
    }
  }
}

function mazeInstructions() {
  textAlign(CENTER);
  text("Drag the candy through the maze to Nami!", screenWidth / 2, 200)
}

function mazeLose() {
  xCandy = (screenWidth - maze.width / MAZEDIVCONSTANT) / 2 - (screenWidth / 28);
  yCandy = (screenHeight - maze.height / MAZEDIVCONSTANT) / 2 + (screenHeight / 16);
  isMoving = false;
}

function mazeWon() {
  passed.play();
  console.log("completed");
  start = false;
  nextGame(game3Setup);
}
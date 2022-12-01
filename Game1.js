let candyX;
let candyY;
let ySpeed;
let fallStarted;
let fallScore;
let fallGoal;

function game1Setup() {
  currGame = 1
  removeElements();
  background(252, 205, 221);
  fill('white');
  textAlign(CENTER);
  textSize(screenHeight / 20);
  textStyle(BOLD);
  
  candyX = 100;
  candyY = -100;
  ySpeed = 5;
  fallingCandy(candyX, candyY);
  fallStarted = false;
  fallScore = 0;
  fallGoal = 20;
  
  mainMenuButton();
  fallStart();
  fallInstructions();
}

function game1Draw() {
  if(fallStarted) {
    background(252, 205, 221);
    text("Score: " + fallScore, screenWidth / 2, screenHeight - 20);
    
    fallingCandy(candyX, candyY);
    
    if(over(candyX, candyY, fallcandy, 8)) {
      fallCaught();
    }

    if(candyY >= screenHeight) {
      fallLose();
    }
    
    candyY += ySpeed;
  }
}

function makeCandy() {
  candyY = -100;
  candyX = random(100, screenWidth - 100);
}

function fallingCandy(xPos, yPos) {
  imageMode(CORNER);
  image(fallcandy, xPos, yPos, fallcandy.width / 8, fallcandy.height / 8);
}

function fallStart () {
  fallStartButton = createButton("Start");
  fallStartButton.addClass("start-button");
  fallStartButton.center('horizontal');
  fallStartButton.position((screenWidth / 2) - (fallStartButton.width / 2), 400);
  fallStartButton.mousePressed(() => {
    fallStarted = true;
    fallStartButton.style("opacity", 0);
    
  });
}

function fallInstructions() {
  textAlign(CENTER);
  text("Catch the candy and meet the goal of " + fallGoal + " caught candy!", screenWidth / 2, 200)
}

function fallWon() {
  passed.play();
  fallStarted = false;
  console.log("completed");
  background(252, 205, 221);
  text("Score: " + fallScore, screenWidth / 2, screenHeight - 20);
  nextGame(game2Setup);
}

function fallLose() {
  if(fallScore < 10) fallScore = 0;
  else fallScore -= 10;
  makeCandy();
  if(fallScore != 0) ySpeed /= 2;
}

function fallCaught() {
  eat.play();
  fallScore += 1;
  makeCandy();
  if(fallScore % 10 == 0) {
    ySpeed *= 2;
  }
  if(fallScore == fallGoal) {
    fallWon();
  }
}
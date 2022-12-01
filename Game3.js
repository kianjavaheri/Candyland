let matchStarted;
let currCandy;
let correctCandy;
let correctX;
let correctY;
let currX;
let currY;
let correctCandyImg;
let matchTicks;
let matchScore;
let matchGoal;
let MATCHCANDYDIVCONSTANT;
let MATCHCANDYAFTERDIV;

function game3Setup() {
  currGame = 3;
  correctX = (screenWidth / 4);
  correctY = (screenHeight / 2);
  currX = (screenWidth * 3 / 4);
  currY = (screenHeight / 2);
  removeElements();
  background(252, 205, 221);
  fill('white');
  textAlign(CENTER);
  textSize(screenHeight / 20);
  textStyle(BOLD);
  
  matchStarted = false;
  matchTicks = 1;
  currCandy = round(random(2));
  matchScore = 0;
  matchGoal = 10;
  correctCandy = 0;
  correctCandyImg = matchcandy1;
  MATCHCANDYDIVCONSTANT = 5;
  MATCHCANDYAFTERDIV = matchcandy1.width / MATCHCANDYDIVCONSTANT;
  
  mainMenuButton();
  matchStart();
  matchInstructions();
}

function game3Draw() {
  if(matchStarted) {
    background(252, 205, 221);
    text("Score: " + matchScore, screenWidth / 2, screenHeight - 20);
    
    makeMatchCandy(correctCandyImg, correctX, correctY);
    
    switch(currCandy) {
        case(0):
          makeMatchCandy(matchcandy1, currX, currY);
          break;
        case(1):
          makeMatchCandy(matchcandy2, currX, currY);
          break;
        case(2):
          makeMatchCandy(matchcandy3, currX, currY);
          break;
    }
    
    if(matchTicks % 30 == 0) {
      currCandy = round(random(0, 2));
    }
    
  }
  matchTicks += 1;

}

function mousePressed() {
  if(mouseX >= currX - (MATCHCANDYAFTERDIV / 2)&& mouseX <= currX + (MATCHCANDYAFTERDIV / 2)) {
    if(mouseY >= currY - (MATCHCANDYAFTERDIV / 2) && mouseY<= currY + (MATCHCANDYAFTERDIV / 2)) {
      if(currCandy == correctCandy) {
        matchWon()
      } else {
        matchLose();
      }
    }
  }
}

function makeMatchCandy(img, x, y) {
  imageMode(CENTER);
  image(
    img,
    x,
    y,
    MATCHCANDYAFTERDIV,
    MATCHCANDYAFTERDIV
  );
}

function matchStart () {
  matchStartButton = createButton("Start");
  matchStartButton.addClass("start-button");
  matchStartButton.center('horizontal');
  matchStartButton.position((screenWidth / 2) - (matchStartButton.width / 2), 400);
  matchStartButton.mousePressed(() => {
    matchStarted = true;
    matchStartButton.style("opacity", 0);
  });
}

function matchInstructions() {
  textAlign(CENTER);
  text("Click on the candy on the right when it matches the candy on the left!", screenWidth / 2, 200)
  text("Do this " + matchGoal + " times!", screenWidth / 2, 250)
   
}

function matchWon() {
  eat.play();
  matchScore += 1;
  correctCandy = round(random(2));
  if(correctCandy == 0) {
    correctCandyImg = matchcandy1;
  } else if(correctCandy == 1) {
    correctCandyImg = matchcandy2;
  } else {
    correctCandyImg = matchcandy3;
  }
  if(matchScore == matchGoal) {
    passed.play();
    console.log("completed");
    matchStarted = false;
    background(252, 205, 221);
    text("Score: " + matchScore, screenWidth / 2, screenHeight - 20);
  }
}

function matchLose() {
  if(matchScore > 0) {
    matchScore -= 1;  
  }
}
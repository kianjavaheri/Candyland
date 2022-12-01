let currGame = 0;
let menuButton;
let menuButton1;
let menuButton2;
let menuButton3;

let lollipop;
let title;
let fallcandy;
let maze;
let candy;
let nami;
let matchcandy1;
let matchcandy2;
let matchcandy3;

// let screenWidth = 852;
// let screenHeight = 480;
let screenWidth = 1280;
let screenHeight = 720;


function preload() {
  lollipop = loadImage("MenuAssets/lollipop.png");
  title = loadImage("MenuAssets/candylandtitle.png")
  
  fallcandy = loadImage("Game1Assets/candy.png")
  
  maze = loadImage("Game2Assets/maze.png");
  candy = loadImage("Game2Assets/mazecandy.png");
  nami = loadImage("Game2Assets/nami.png"); 
  g2fail = loadSound("Game2Assets/g2fail.ogg");
  
  matchcandy1 = loadImage("Game3Assets/matchcandy1.png");
  matchcandy2 = loadImage("Game3Assets/matchcandy2.png");
  matchcandy3 = loadImage("Game3Assets/matchcandy3.png");
  
  passed = loadSound("MenuAssets/levelpassed.ogg");
  eat = loadSound("MenuAssets/eat.ogg");
}

function setup() {
  removeElements();
  currGame = 0;
  createCanvas(screenWidth, screenHeight);
  background(252, 205, 221);
  lolli()
  titleText();
  buttons();
}

function mainMenu() {
  
}

function titleText() {
  imageMode(CORNER);
  image(title, 0, 0, screenWidth, screenHeight);
}

function buttons() {
  menuButton1 = createButton("Falling Canes");
  menuButton1.addClass("menu-button");
  menuButton1.mousePressed(game1Setup);
  menuButton1.size(screenWidth / 5, 100);
  menuButton1.style("font-size", screenHeight / 20 + "px");
  menuButton1.position((screenWidth * 2 / 9) - (menuButton1.width / 2), screenHeight * 0.6);

  menuButton2 = createButton("Feed Nami");
  menuButton2.addClass("menu-button");
  menuButton2.mousePressed(game2Setup);
  menuButton2.size(screenWidth / 5, 100);
  menuButton2.style("font-size", screenHeight / 20 + "px");
  menuButton2.position((screenWidth / 2) - (menuButton2.width / 2), screenHeight * 0.6);
  
  menuButton3 = createButton("Match Candy");
  menuButton3.addClass("menu-button");
  menuButton3.mousePressed(game3Setup);
  menuButton3.size(screenWidth / 5, 100);
  menuButton3.style("font-size", screenHeight / 20 + "px");
  menuButton3.position((screenWidth * 7 / 9) -  (menuButton3.width / 2), screenHeight * 0.6);
  
  
  res1 = createButton("720p");
  res1.addClass("corner-button");
  res1.position(screenWidth * 0.8, 10);
  res1.mousePressed(() => {
    screenWidth = 1280;
    screenHeight = 720;
    setup();
  });
  
  res2 = createButton("480p");
  res2.addClass("corner-button");
  res2.position(screenWidth * 0.9, 10);
  res2.mousePressed(() => {
    screenWidth = 852;
    screenHeight = 480;
    setup();
  });
  
}

function lolli() {
  imageMode(CENTER);
  image(lollipop, screenWidth / 8, screenWidth / 8, lollipop.width / 3, lollipop.height / 3);
}

function mainMenuButton() {
  menu = createButton("Menu");
  menu.addClass("corner-button");
  menu.position(10, 10);
  menu.mousePressed(setup);
}

function nextGame(nextExer) {
  nextButton = createButton("Next");
  nextButton.addClass("corner-button");
  nextButton.position(screenWidth - 80, 10);
  nextButton.mousePressed(nextExer);
}

function over(x, y, img, div) {
  if(mouseX >= x && mouseX <= (img.width/div) + x && mouseY >= y && mouseY <= (img.height/div) + y) return true;
  return false;
}

function draw() {
  switch(currGame) {
    case 0: 
      mainMenu();
      break;
    case 1: 
      game1Draw();
      break;
    case 2: 
      game2Draw();
      break;
    case 3: 
      game3Draw();
      break;
  }
}

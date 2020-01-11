//Declare Global Variables
let world; //world data
let worldHeight;
let worldWidth;
let worldLength;
const resolution = 30;
let drawToggle = true;
let minNeighbors = 3; //min number of neighbors to survive
let maxNeighbors = 5; //max number of neighbors to survive
let repNeighbors = 5; //number of neighbors necessary to come to life
let seedDensity = 7;

//Makes game space
function make3DArray(x, y, z){
  let grid = new Array(x);
  for(let i = 0; i < grid.length; i++){
    grid[i] = new Array(y);
    for(let j = 0; j < grid[i].length; j++){
      grid[i][j] = new Array(z);
    }
  }
  return grid;
}

//takes the world grid position and selects a color
function colorPicker(x, y, z){
  const scale = 10;
  return([abs((x*scale)%255-255), abs((y*scale)%255-255), abs((z*scale)%255-255)]);
}

//Seeds array with living or dead pixels
function seed3DArray(grid){
  const density = seedDensity/200 + 0.5;
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      for(let k = 0; k < grid[i][j].length; k++){
        grid[i][j][k] = [Math.round(Math.random()*density), colorPicker(i, j, k)];
      }
    }
  }
  return grid;
}

//Counts neighbors of cell
function countNeighbors(grid, x, y, z){
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++){
        sum += grid[abs(x+i)%worldHeight][abs(y+j)%worldLength][abs(z+k)%worldWidth][0];
      }
    }
  }
  sum -= grid[x][y][z][0];
  console.log(sum);
  return sum;
}



//run the game of life algorithm returning a new world grid
function updateWorld(grid){
  let next = make3DArray(worldHeight, worldLength, worldWidth);
  let sum;

  for(let i = 0; i < world.length; i++){
    for(let j = 0; j < world[i].length; j++){
      for(let k = 0; k < world[i][j].length; k++){
        sum = countNeighbors(grid, i, j, k);
        if(grid[i][j][k][0] == 1){ //if alive
          if(sum < minNeighbors || sum > maxNeighbors){
            next[i][j][k] = [0, colorPicker(i, j, k)];
          } else {
            next[i][j][k] = [1, colorPicker(i, j, k)];
          }
        } else { //if dead
          if(sum == repNeighbors){
            next[i][j][k] = [1, colorPicker(i, j, k)];
          } else {
            next[i][j][k] = [0, colorPicker(i, j, k)];
          }
        }
      }
    }
  }
  return next;
}

//UI Stuff
function reset(){
    world = make3DArray(worldHeight, worldLength, worldWidth);
    world = seed3DArray(world);
    redraw(1);
}

function startDraw(){
  const startButton = document.getElementById("start");
  if(startButton.innerHTML == "Start"){
    startButton.innerHTML = "Stop";
    loop();
  } else {
    startButton.innerHTML = "Start";
    noLoop();
  }
}

function drawWorld(){
  for(let i = 0; i < world.length; i++){
    for(let j = 0; j < world[i].length; j++){
      for(let k = 0; k < world[i][j].length; k++){
        let x = i* resolution;
        let y = j* resolution;
        let z = k* resolution;
        if(world[i][j][k][0] == 1){
          push();
          translate(x-width/2, y-height/2, z-width);
          fill(world[i][j][k][1]);
          stroke(0);
          strokeWeight(3);
          box(resolution);
          pop();
        }
      }
    }
  }
}

function renderUpdatedWorld(update){
  if(update === true){
    drawWorld();
    world = updateWorld(world);
  } else{
    loop();
    drawWorld();
  }
}

function changeMinNeighbors(){
  minNeighbors = document.getElementById("min-neighbors").value;
}

function changeMaxNeighbors(){
  maxNeighbors = document.getElementById("max-neighbors").value;
}

function changeRepNeighbors(){
  repNeighbors = document.getElementById("rep-neighbors").value;
}

function setSeedDensity(){
  seedDensity = document.getElementById("seed-density").value;
}

//Visualization
function setup(){
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('game');
  //Assign values to global variables
  worldHeight = height/resolution;
  worldLength = width/resolution;
  worldWidth  = width/resolution;
  world = make3DArray(worldHeight, worldLength, worldWidth);
  world = seed3DArray(world);
  noLoop();
}

function draw(){
  background(168, 230, 26, 0.733);
  frameRate(5);
  orbitControl();
  if(document.getElementById("start").innerHTML == "Start"){
    renderUpdatedWorld(false);
  } else{
    renderUpdatedWorld(true);
  }
}

setup();
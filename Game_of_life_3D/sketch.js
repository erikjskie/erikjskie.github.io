//Declare Global Variables
let world;
let worldHeight;
let worldWidth;
let worldLength;
const resolution = 25;
let drawToggle = true;

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

//Seeds array with living or dead pixels
function seed3DArray(grid){
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      for(let k = 0; k < grid[i][j].length; k++){
        grid[i][j][k] = Math.round(Math.random()*0.6);
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
        sum += grid[abs(x+i)%worldHeight][abs(y+j)%worldLength][abs(z+k)%worldWidth];
      }
    }
  }
  sum -= grid[x][y][z];
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
        if(grid[i][j][k] == 1){ //if alive
          if(sum < 4 || sum > 5){
            next[i][j][k] = 0;
          } else {
            next[i][j][k] = 1;
          }
        } else { //if dead
          if(sum == 5){
            next[i][j][k] = 1;
          } else {
            next[i][j][k] = 0;
          }
        }
      }
    }
  }
  return next;
}

//UI Stuff
function mousePressed(){
  if(drawToggle){
    drawToggle = false;
    loop();
  } else{
    drawToggle = true;
    noLoop();
  }
}

//Visualization
function setup(){
  createCanvas(600, 600, WEBGL);
  //Assign values to global variables
  worldHeight = height/resolution;
  worldLength = width/resolution;
  worldWidth  = width/resolution;
  world = make3DArray(worldHeight, worldLength, worldWidth);
  world = seed3DArray(world);
}

function draw(){
  background(255);
  frameRate(1);
  orbitControl();
  for(let i = 0; i < world.length; i++){
    for(let j = 0; j < world[i].length; j++){
      for(let k = 0; k < world[i][j].length; k++){
        let x = i* resolution;
        let y = j* resolution;
        let z = k* resolution;
        if(world[i][j][k] == 1){
          push();
          translate(x-width/2, y-height/2, z-width);
          fill(0);
          stroke(100);
          box(resolution);
          pop();
        }
      }
    }
  }
  world = updateWorld(world);
}

setup();
function seed2DArray(array){
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++){
      array[i][j] = floor(random(0, 2));
    }
  }
  return array;
}

function make2DArray(cols, rows, seeded = true){
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  if(seeded){
    arr = seed2DArray(arr);
  }
  return arr;
}

function countNeighbors(grid, x, y){
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[abs(x+i)%cols][abs(y+j)%rows];
    }
  }
  sum -= grid[x][y];
  return sum;
}


function updateGrid(grid){
  let next = make2DArray(cols, rows, false);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let sum = countNeighbors(grid, i, j);
      if(grid[i][j] == 1){
        if(sum > 3 || sum < 2){
          next[i][j] = 0;
        }
        else{
          next[i][j] = 1;
        }
      } else {
        if(sum == 3){
          next[i][j] = 1;
        } else{
          next[i][j] = 0;
        }
      }
    }
  }
  return next;
}

//Global Variables
let grid;
let cols;
let rows;
const resolution = 10;

function setup(){
  let canvas = createCanvas(100, 100);
  canvas.parent('2DGame');
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
}

function draw(){
  background(0);
  frameRate(30);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i*resolution;
      let y = j*resolution;
      if(grid[i][j] == 1){
        fill(255);
        stroke(255);
        rect(x,y,resolution,resolution);
      }
    }
  }

  grid = updateGrid(grid);
}

setup();
import { Board } from "./sample_algorithm.mjs";

const s = ( sketch ) => {

  let sketchWidth = 600;
  let sketchHeight = 600;
  let resolution = 20;
  let board = new Board(sketchWidth/resolution, sketchHeight/resolution, [0,0], [10,10]);

  function updateNeighboringCells(board, pathArray, position){ //updates all 4 neighboring cells of cell for with appropriate path length if they are valid cells
    const positionX = pathArray[position][0];
    const positionY = pathArray[position][1];
    const currentPathValue = board.board[positionX][positionY].path;
    let neighborCellValue;
    let neighboringCellArray = [[positionX+1, positionY], [positionX+1, positionY+1],[positionX, positionY + 1], [positionX-1, positionY+1],[positionX-1, positionY], [positionX-1, positionY-1],[positionX, positionY-1]]; //top cell, right cell, bottom cell, left cell
    for(let i = 0; i < neighboringCellArray.length; i++){
      if(board.checkNotBorderOrWall(neighboringCellArray[i])){
        neighborCellValue = board.board[neighboringCellArray[i][0]][neighboringCellArray[i][1]].path;
        if(neighborCellValue > currentPathValue+1 || neighborCellValue == null){
          board.board[neighboringCellArray[i][0]][neighboringCellArray[i][1]].path = currentPathValue+1;
          pathArray.push([neighboringCellArray[i][0], neighboringCellArray[i][1], currentPathValue+1]);
          if(board.board[neighboringCellArray[i][0]][neighboringCellArray[i][1]].state === "start"){
            console.log("Found it!")
            return true; //if it is the start exits the function, and return 1 kills the searching in the parent function
          }
        }
      }
    }
  }
  
  function sampleSearch(board){ //Sample Searching Algorithm
    let pathArray = [[board.end[0], board.end[1], 0]]; //tracks the path by appending as it expands the search first position is the board space row value, second is the column value, and third is the distance from the end
    //traversing the pathArray
    for(let i = 0; i < pathArray.length; i++){
      //updating neighboring cells of current pathArray cell
      if(updateNeighboringCells(board, pathArray, i)){ //returns true if it finds the start
        return true; //temp to wait to implement the backsearch;
      }
    }
  }

  sketch.setup = () => {
    sketch.frameRate(1);
    sketch.createCanvas(600, 600);
    sampleSearch(board);
    console.table(board.board);
  };

  sketch.draw = () => {
    sketch.background(0);
    let x;
    let y;
    for(let i = 0; i < board.board.length; i++){
      for(let j = 0; j < board.board[i].length; j++){
        x = i*resolution;
        y = j*resolution;
        if(board.board[i][j].state == "start"){
          sketch.fill(0,0,255);
          sketch.rect(x, y, resolution, resolution);
        } else if(board.board[i][j].state == "end"){
          sketch.fill(0,255,0);
          sketch.rect(x, y, resolution, resolution);
        } else if(board.board[i][j].path !== null){
          sketch.fill(255%(board.board[i][j].path*15), 255%(board.board[i][j].path*15), 255%(board.board[i][j].path*15));
          sketch.rect(x, y, resolution, resolution);
        }
      }
    }
  };
};

let myp5 = new p5(s);
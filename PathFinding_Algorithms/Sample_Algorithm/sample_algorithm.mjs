class Cell{ //class for storing information on the board cells
  constructor(state){
    try{
      if(state !== "start" && state !== "end" && state !== "wall" && state !== "open") throw "Error: cell state must be of string 'start', 'end', or 'wall'";
      this.state = state; //Four states, "start", "end", "wall", "open";
      if(this.state === "end"){
        this.path = 0;
      } else{
        this.path = null; //stores the distance from end
      }
    }
    catch(err){
      console.log(err);
    }
  }
  setPathValue(value){
    this.path = value;
  }
  setState(state){
    this.state = state;
  }
}

class Board{
  constructor(rows, cols, start, end, walls=[]){
    this.rows = rows;
    this.cols = cols;
    this.start = start;
    this.end = end;
    this.walls = walls;

    //builds empty board 2D Array
    this.board = new Array(rows);
    for(let i = 0; i < this.board.length; i++){
      this.board[i] = new Array(cols);
    }

    //sets default values for board spaces
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[i].length; j++){
        this.board[i][j] = new Cell("open");
      }
    }

    //sets start and end position
    this.board[this.start[0]][this.start[1]] = new Cell("start");
    this.board[this.end[0]][this.end[1]] = new Cell("end");
  }
  checkNotBorderOrWall(cellPosition){ //checks if a cell in the board is out of the bounds of the array,input is an [x, y] array
    if(cellPosition[0] >= 0 && cellPosition[0] < this.rows && cellPosition[1] >= 0 && cellPosition[1] < this.cols && this.board[cellPosition[0]][cellPosition[1]].state !== "wall"){
      return true;
    }
    return false;
  }
  setWalls(walls){ //takes an array of arrays containing the cell position of the walls to be added to the game board, adds valid walls to the board
    for(let i = 0; i < walls.length; i++){
      if(this.checkNotBorderOrWall(walls[i])){
        this.board[walls[i][0]][walls[i][1]].setState("wall");
        this.walls.push(walls[i]);
      }
    }
  }
}

export {Board, Cell};
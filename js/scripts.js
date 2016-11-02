var arrayOfPositions = [];

// Constructor for each location in a game board
function Position() {
  this.occupied = false;
  this.mark = "";
  this.clickable = true;
}
// Constructor for players
function Player(mark) {
  this.mark = mark;
  this.turn = false;
}
// Game board creator
function board() {
  for(idx = 0; idx < 3 ; idx++) {
    arrayOfPositions[idx] = [];
    for(idx2 = 0; idx2 < 3; idx2++) {
      arrayOfPositions[idx][idx2] = new Position();
    }
  }
}

$(function() {
  var player1 = new Player("X");
  var player2 = new Player("O");
});

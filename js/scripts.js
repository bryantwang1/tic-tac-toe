var arrayOfPositions = [];
var flatArrayOfPositions = [];

// Constructor for each location in a game board
function Position() {
  this.occupied = false;
  this.mark = "";
  this.clickable = true;
  this.name = "";
}
// Constructor for players
function Player(mark) {
  this.mark = mark;
  this.turn = false;
}
// Game board creator
function positionCreator() {
  for(idx = 0; idx < 9; idx++) {
    flatArrayOfPositions[idx] = new Position();
    flatArrayOfPositions[idx].name = "position-" + (idx + 1);
  }
}

function boardCreator() {
  for(idx = 0; idx < 3 ; idx++) {
    arrayOfPositions[idx] = [];
    for(idx2 = 0; idx2 < 3; idx2++) {
      arrayOfPositions[idx].push(flatArrayOfPositions[0]);
      flatArrayOfPositions.shift();
    }
  }
}

$(function() {
  var player1 = new Player("X");
  var player2 = new Player("O");

  positionCreator();
  boardCreator();

  $(".col-borders").click(function() {
    alert(this.id);
    this.append("X");
    for(idx = 0; idx < 3; idx++) {
      for(idx2 = 0; idx2 < 3; idx2++) {
        if(this.id === arrayOfPositions[idx][idx2].name) {
          arrayOfPositions[idx][idx2].mark = "X";
          arrayOfPositions[idx][idx2].occupied = true;
          arrayOfPositions[idx][idx2].clickable = false;
        }
      }
    }
  });

});

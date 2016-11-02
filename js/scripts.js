var arrayOfPositions = [];
var flatArrayOfPositions = [];

// Constructor for each location in a game board
function Position() {
  this.occupied = false;
  this.mark = "";
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

// UI below this line.

$(function() {
  var player1 = new Player("X");
  var player2 = new Player("O");
  player1.turn = true;
  console.log(player1.turn + ", " + player2.turn);

  function turnSwitcher() {
    if(player1.turn) {
      player1.turn = false;
      player2.turn = true;
    } else {
      player2.turn = false;
      player1.turn = true;
    }
  }

  positionCreator();
  boardCreator();


  $(".col-borders").click(function() {
    for(idx = 0; idx < 3; idx++) {
      for(idx2 = 0; idx2 < 3; idx2++) {
        if(this.id === arrayOfPositions[idx][idx2].name) {
          if(arrayOfPositions[idx][idx2].occupied === false) {
            if(player1.turn) {
              arrayOfPositions[idx][idx2].mark = player1.mark;
              this.append(player1.mark);
            } else {
              arrayOfPositions[idx][idx2].mark = player2.mark;
              this.append(player2.mark);
            }
            arrayOfPositions[idx][idx2].occupied = true;
            turnSwitcher();
          }
        }
      }
    }
  });

});

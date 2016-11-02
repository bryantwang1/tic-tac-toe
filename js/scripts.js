var positions = [];
var flatPositions = [];
var player1 = new Player("X");
var player2 = new Player("O");
// Constructor for each location in a game board.
function Position() {
  this.occupied = false;
  this.mark = "-";
  this.name = "";
}
// Constructor for players
function Player(mark) {
  this.mark = mark;
  this.turn = false;
  this.score = 0;
}
// Fills flatPositions, intended for use by boardCreator.
function positionCreator() {
  flatPositions = [];
  for(idx = 0; idx < 9; idx++) {
    flatPositions[idx] = new Position();
    flatPositions[idx].name = "position-" + (idx + 1);
  }
}
// Creates a 3 by 3 board filled with Position objects.
function boardCreator() {
  for(idx = 0; idx < 3 ; idx++) {
    positions[idx] = [];
    for(idx2 = 0; idx2 < 3; idx2++) {
      positions[idx].push(flatPositions[0]);
      flatPositions.shift();
    }
  }
}
// Checks if someone has won.
function winChecker() {
  // Tests horizontal winning possibilities.
  for(idx = 0; idx < 3; idx++) {
    var rowTest = "" + positions[idx][0].mark + positions[idx][1].mark + positions[idx][2].mark;

    if(rowTest === "XXX") {
      $("#winner").text("Player 1 Wins This Round!");
      player1.score++;
      $("#player1-score").text(player1.score);
      $("#play-again").show();
    }

    if(rowTest ==="OOO") {
      $("#winner").text("Player 2 Wins This Round!");
      player2.score++;
      $("#player2-score").text(player2.score);
      $("#play-again").show();
    }
  }
  // Tests vertical winning possibilities.
  for(idx = 0; idx < 3; idx++) {
    var columnTest = "" + positions[0][idx].mark + positions[1][idx].mark + positions[2][idx].mark;

    if(columnTest === "XXX") {
      $("#winner").text("Player 1 Wins This Round!");
      player1.score++;
      $("#player1-score").text(player1.score);
      $("#play-again").show();
    }

    if(columnTest === "OOO") {
      $("#winner").text("Player 2 Wins This Round!");
      player2.score++;
      $("#player2-score").text(player2.score);
      $("#play-again").show();
    }
  }

  // Tests diagonal winning possibilities.
  var crossTest = "" + positions[0][0].mark + positions[2][2].mark + positions[1][1].mark + positions[0][2].mark + positions[2][0].mark;

  if(crossTest.includes("XXX") || crossTest.includes("OOO")) {
    var testIndexX = crossTest.lastIndexOf("XXX");
    var testIndexO = crossTest.lastIndexOf("OOO");

    if(testIndexX === 1 || testIndexO === 1) {
    } else {
      if(crossTest.includes("XXX")) {
        $("#winner").text("Player 1 Wins This Round!");
        player1.score++;
        $("#player1-score").text(player1.score);
        $("#play-again").show();
      }
      if(crossTest.includes("OOO")) {
        $("#winner").text("Player 2 Wins This Round!");
        player2.score++;
        $("#player2-score").text(player2.score);
        $("#play-again").show();
      }
    }
  }
  // Counts to check how many spaces are occupied, and tells the players that it's a draw once it reaches 9 and no player has been determined.
  var occupationCounter = 0;
  for(idx = 0; idx < 3; idx++) {
    for(idx2 = 0; idx2 < 3; idx2++) {
      if(positions[idx][idx2].occupied) {
        occupationCounter++;
      }
    }
  }

  if(occupationCounter >= 9) {
    alert("Draw!");
    $("#play-again").show();
  }
}

// UI below this line.

$(function() {

  player1.turn = true;

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
        if(this.id === positions[idx][idx2].name) {
          if(positions[idx][idx2].occupied === false) {
            if(player1.turn) {
              positions[idx][idx2].mark = player1.mark;
              this.append(player1.mark);
            } else {
              positions[idx][idx2].mark = player2.mark;
              this.append(player2.mark);
            }
            positions[idx][idx2].occupied = true;
            turnSwitcher();
            winChecker();
          }
        }
      }
    }
  });

  $("#play-again").click(function() {
    $("#play-again").hide();
    positionCreator();
    boardCreator();
    player1.turn = true;
    player2.turn = false;
    $("#winner").text("");
    $(".col-borders").empty();
  });
});

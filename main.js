let theGrid = [], snakeSize = 3, snakePositions = [], snakeMovement = 500;
let initialRow = 9, initialCol = 9, rowIndexMod = 0, colIndexMod = 1, direction = "right";

function startGame() {
  document.getElementById('start').style.display = "none";
  document.getElementById('gameBoard').style.display = "block";
  createGameBoard();
  document.onkeydown = verifyKey;
  moveSnake();
  updateFood();
}

function createGameBoard() {
  const gameBoard = document.getElementById('gameBoard');
  for (let i = 0; i < 20; ++i) {
    theGrid[i] = [];
    let row = document.createElement('div');
    row.className = 'row';
    gameBoard.append(row);
    for (let j = 0; j < 20; ++j) {
      let cell = document.createElement('div');
      cell.className = 'col-sm cell';
      cell.id = i * 100  + j;
      row.append(cell);
      theGrid[i][j] = i * 100  + j;
    }
  }
  for (let i = snakeSize; i >= 1; --i) {
    document.getElementById(theGrid[initialRow][(initialCol + 1) - i]).className = "col-sm snake";
    snakePositions[i] = theGrid[initialRow][(initialCol + 1)  - i];
  }
}

function verifyKey(e) {
    if (e.keyCode == '38' && direction != "down") { // up arrow
      rowIndexMod = (-1);
      colIndexMod = 0;
      direction = "up";
    }
    else if (e.keyCode == '40' && direction != "up") {  // down arrow
        rowIndexMod = 1;
        colIndexMod = 0;
        direction = "down";
    }
    else if (e.keyCode == '37' && direction != "right") { // left arrow
        colIndexMod = (-1);
        rowIndexMod = 0;
        direction = "left";
    }
    else if (e.keyCode == '39' && direction != "left") { // right arrow
        colIndexMod = 1;
        rowIndexMod = 0;
        direction = "right";
    }
  }

  function checkGameStatus() {
    if (rowIndexMod + initialRow < 0 || rowIndexMod + initialRow == 20 || colIndexMod + initialCol < 0 || colIndexMod + initialCol == 20) {
      gameOver();
    }
    if (document.getElementById(theGrid[initialRow + rowIndexMod][initialCol + colIndexMod]).className == "col-sm snake") {
      gameOver()
    }
  }

  function gameOver() {
    let message = document.getElementById("message");
    message.innerHTML = "You lost :(";
    message.style.background
    message.style.color = "red";
    setTimeout(function(){
       window.location.reload(1);
    }, 1000);
  }

  function moveSnake() {
    checkGameStatus();
    if (document.getElementById(theGrid[initialRow + rowIndexMod][initialCol + colIndexMod]).className == "col-sm food") {
      updateFood();
      snakePositions[snakeSize + 1] =  snakePositions[snakeSize++];
    } else {
      document.getElementById(snakePositions[snakeSize]).className = "col-sm cell";
    }
    document.getElementById(theGrid[initialRow + rowIndexMod][initialCol + colIndexMod]).className = "col-sm snake";

    for (let i = snakeSize; i > 1; --i) {
      snakePositions[i] = snakePositions[i - 1];
    }
    snakePositions[1] = theGrid[initialRow + rowIndexMod][initialCol + colIndexMod];
    initialRow += rowIndexMod;
    initialCol += colIndexMod;
    if (snakeMovement > 100) {
      snakeMovement -= 2;
    }
    setTimeout(moveSnake, snakeMovement);
  }

  function updateFood() {
    let findClearSpot = false;
    let x, y;
    while (findClearSpot == false) {
      findClearSpot = true;
      x = Math.floor(Math.random() * 20);
      y = Math.floor(Math.random() * 20);
      for (let i = 1; i <= snakeSize; ++i) {
        if (snakePositions[i] == theGrid[x][y]) {
          findClearSpot = false;
        }
      }
    }
    document.getElementById(theGrid[x][y]).className = "col-sm food";
  }

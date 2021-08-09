let cellId = [], snakeSize = 3, snakePositions = [], snakeMovement = 500;
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
    cellId[i] = [];
    let row = document.createElement('div');
    row.className = 'row';
    gameBoard.append(row);
    for (let j = 0; j < 20; ++j) {
      let cell = document.createElement('div');
      cell.className = 'col-sm cell';
      cell.id = i * 100  + j;
      row.append(cell);
      cellId[i][j] = i * 100  + j;
    }
  }
  for (let i = snakeSize; i >= 1; --i) {
    drawSnake(initialRow, 0, (initialCol + 1), (i * (-1)));
    snakePositions[i] = cellId[initialRow][(initialCol + 1)  - i];
  }
}

function drawSnake(row, rowMod, col, colMod) {
  document.getElementById(cellId[row + rowMod][col + colMod]).className = "col-sm snake";
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
    if (isOutside(initialRow, rowIndexMod, initialCol, colIndexMod)) {
      gameOver();
    }
    if (document.getElementById(cellId[initialRow + rowIndexMod][initialCol + colIndexMod]).className == "col-sm snake") {
      gameOver();
    }
  }

  function isOutside(row, rowMod, col, colMod) {
    if (row + rowMod < 0 || row + rowMod == 20)  {
      return true;
    }
    if (col + colMod < 0 || col + colMod == 20) {
      return true;
    }
    return false;
  }

  function gameOver() {
    let message = document.getElementById("message");
    message.innerHTML = "You lost :(";
    message.style.color = "red";
    setTimeout(function(){
       window.location.reload(1);
    }, 1000);
  }

  function moveSnake() {
    checkGameStatus();
    if (document.getElementById(cellId[initialRow + rowIndexMod][initialCol + colIndexMod]).className == "col-sm food") {
      updateFood();
      snakePositions[snakeSize + 1] =  snakePositions[snakeSize++];
    } else {
      document.getElementById(snakePositions[snakeSize]).className = "col-sm cell";
    }

    drawSnake(initialRow, rowIndexMod, initialCol, colIndexMod);
    for (let i = snakeSize; i > 1; --i) {
      snakePositions[i] = snakePositions[i - 1];
    }
    snakePositions[1] = cellId[initialRow + rowIndexMod][initialCol + colIndexMod];
    initialRow += rowIndexMod;
    initialCol += colIndexMod;
    if (snakeMovement > 100) {
      snakeMovement -= 2;
    }
    setTimeout(moveSnake, snakeMovement);
  }

  function updateFood() {
    let coordinates = findFreeSpot();
    let row = coordinates[0], column = coordinates[1];
    document.getElementById(cellId[row][column]).className = "col-sm food";
  }

  function findFreeSpot() {
    let freeSpot = false;
    let row, column;
    while (freeSpot == false) {
      freeSpot = true;
      row = Math.floor(Math.random() * 20);
      column = Math.floor(Math.random() * 20);
      if (snakePositions.includes(cellId[row][column])) {
          freeSpot = false;
      }
    }
    return [row, column];
  }


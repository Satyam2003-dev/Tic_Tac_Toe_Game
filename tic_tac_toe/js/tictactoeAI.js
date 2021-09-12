function l(obj) {
  console.log(obj);
}

var AI = {
  EvaluateBoard: function (pureBoard, aiCharacter) {
    for (var row = 0; row < 3; row++) {
      if (
        pureBoard[row][0] == pureBoard[row][1] &&
        pureBoard[row][1] == pureBoard[row][2] &&
        pureBoard[row][2] != false
      ) {
        if (pureBoard[row][0] == aiCharacter) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    for (var col = 0; col < 3; col++) {
      if (
        pureBoard[0][col] == pureBoard[1][col] &&
        pureBoard[1][col] == pureBoard[2][col] &&
        pureBoard[2][col] != false
      ) {
        if (pureBoard[0][col] == aiCharacter) {
          return 1;
        } else {
          return -1;
        }
      }
    }

    if (
      pureBoard[0][0] == pureBoard[1][1] &&
      pureBoard[1][1] == pureBoard[2][2] &&
      pureBoard[2][2] != false
    ) {
      if (pureBoard[1][1] == aiCharacter) {
        return 1;
      } else {
        return -1;
      }
    }
    if (
      pureBoard[2][0] == pureBoard[1][1] &&
      pureBoard[1][1] == pureBoard[0][2] &&
      pureBoard[0][2] != false
    ) {
      if (pureBoard[1][1] == aiCharacter) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  },

  MovesLeft: function (pureBoard) {
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (pureBoard[y][x] == "" || pureBoard[y][x] == " ") {
          return true;
        }
      }
    }
    return false;
  },

  //A Minimax function
  MoveValue: function (
    xCord,
    yCord,
    pureBoard,
    aiCharacter,
    playerCharacter,
    depth,
    isAITurn
  ) {
    if (isAITurn == undefined) {
      isAITurn = true;
    }
    if (depth == undefined) {
      depth = 0;
    }

    var previousCharacter = pureBoard[yCord][xCord];

    if (isAITurn == true) {
      pureBoard[yCord][xCord] = aiCharacter;
    } else {
      pureBoard[yCord][xCord] = playerCharacter;
    }

    var moveValue = this.EvaluateBoard(pureBoard, aiCharacter);
    if (moveValue != 0) {
      pureBoard[yCord][xCord] = previousCharacter;
      return moveValue;
    }
    if (this.MovesLeft(pureBoard) == false) {
      pureBoard[yCord][xCord] = previousCharacter;
      return 0;
    }

    //Forces the algorithm to select a max or min value besides the default 0
    if (isAITurn) {
      moveValue = 1000;
    } else {
      moveValue = -1000;
    }

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (pureBoard[y][x] == "") {
          if (isAITurn) {
            moveValue = Math.min(
              moveValue,
              this.MoveValue(
                x,
                y,
                pureBoard,
                aiCharacter,
                playerCharacter,
                depth + 1,
                !isAITurn
              )
            );
          } else {
            moveValue = Math.max(
              moveValue,
              this.MoveValue(
                x,
                y,
                pureBoard,
                aiCharacter,
                playerCharacter,
                depth + 1,
                !isAITurn
              )
            );
          }
        }
      }
    }

    pureBoard[yCord][xCord] = previousCharacter;
    return moveValue;
  },

  GetAIMove: function (pureBoard, aiCharacter, playerCharacter) {
    var bestMoveValue = -1000;
    var currentMoveValue = -1000;
    var bestMove = {
      x: -1,
      y: -1,
    };

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (pureBoard[y][x] == "" || pureBoard[y][x] == " ") {
          var d = false;
          if (x == 2 && y == 0) {
            d = true;
          }
          currentMoveValue = this.MoveValue(
            x,
            y,
            pureBoard,
            aiCharacter,
            playerCharacter,
            0,
            true,
            d
          );

          if (currentMoveValue > bestMoveValue) {
            bestMoveValue = currentMoveValue;
            bestMove.x = x;
            bestMove.y = y;
          }
        }
      }
    }

    return bestMove;
  },
};

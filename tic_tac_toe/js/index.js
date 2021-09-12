var gameInfo = {
  //If playerCount is 1, then player2 is considered the AI
  player1Shape: "X",
  player2Shape: "O",
  player1Score: 0,
  player2Score: 0,
  playerCount: 1,
  currentPlayer: 1,
  gameOver: false,

  SetPlayerCount: function (count) {
    if (count < 1 || count > 2) {
      count = 1;
    }
    this.playerCount = count;
  },
  SetPlayerShape: function (shape) {
    if (shape != "X" && shape != "O") {
      console.log("Shape has no value");
      shape = "X";
    }
    if (shape == "X") {
      this.player2Shape = "O";
    } else if (shape == "O") {
      this.player2Shape = "X";
    }
    this.player1Shape = shape;
  },
  Reset: function () {
    this.player1Shape = "X";
    this.player2Shape = "O";
    this.player1Score = 0;
    this.player2Score = 0;
    this.playerCount = 1;
    this.currentPlayer = 1;
    this.gameOver = false;
  },
};
var screens = {
  startScreen: undefined,
  countScreen: undefined,
  shapeScreen: undefined,
  playScreen: undefined,

  InitializeScreens: function () {
    this.startScreen = document.getElementById("StartScreen");
    this.countScreen = document.getElementById("CountScreen");
    this.shapeScreen = document.getElementById("ShapeScreen");
    this.playScreen = document.getElementById("PlayScreen");
  },
  DisableAll: function () {
    this.startScreen.style.display = "none";
    this.countScreen.style.display = "none";
    this.shapeScreen.style.display = "none";
    this.playScreen.style.display = "none";
  },
  EnableStartScreen: function () {
    this.DisableAll();
    this.startScreen.style.display = "block";
  },
  EnableCountScreen: function () {
    this.DisableAll();
    this.countScreen.style.display = "block";
  },
  EnableShapeScreen: function () {
    this.DisableAll();
    this.shapeScreen.style.display = "block";
  },
  EnablePlayScreen: function () {
    this.DisableAll();
    this.playScreen.style.display = "block";
  },
  Reset: function () {
    this.DisableAll();
    this.EnableStartScreen();
  },
};
var gameBoard = new (function () {
  this.board = [[], [], []];

  this.InitializeBoard = function () {
    this.board = [[], [], []];

    var trNodes = document
      .getElementById("PlayScreen")
      .getElementsByTagName("table")[0]
      .getElementsByTagName("tr");
    var tdNodes = [];

    tdNodes.push(trNodes[0].getElementsByTagName("td"));
    tdNodes.push(trNodes[1].getElementsByTagName("td"));
    tdNodes.push(trNodes[2].getElementsByTagName("td"));

    for (var i = 0; i < 3; i++) {
      for (var x = 0; x < 3; x++) {
        this.board[i].push(tdNodes[i][x]);
      }
    }

    console.log(this.board);
  };

  this.MakeMove = function (moveX, moveY, moveShape) {
    if (moveX >= 3 || moveY >= 3) {
      return;
    }
    this.board[moveY][moveX].textContent = moveShape;
  };

  this.GetPureBoard = function () {
    var pureBoard = [[], [], []];

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        pureBoard[y].push(this.board[y][x].textContent);
      }
    }

    return pureBoard;
  };

  this.MovesLeft = function () {
    var pureBoard = this.GetPureBoard();
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (pureBoard[y][x] == "") {
          return true;
        }
      }
    }
    return false;
  };

  this.GetWinningShape = function () {
    var pureBoard = this.GetPureBoard();

    for (var row = 0; row < 3; row++) {
      if (
        pureBoard[row][0] == pureBoard[row][1] &&
        pureBoard[row][1] == pureBoard[row][2]
      ) {
        return pureBoard[row][0];
      }
    }
    for (var col = 0; col < 3; col++) {
      if (
        pureBoard[0][col] == pureBoard[1][col] &&
        pureBoard[1][col] == pureBoard[2][col]
      ) {
        return pureBoard[0][col];
      }
    }

    if (
      pureBoard[0][0] == pureBoard[1][1] &&
      pureBoard[1][1] == pureBoard[2][2]
    ) {
      return pureBoard[1][1];
    }
    if (
      pureBoard[2][0] == pureBoard[1][1] &&
      pureBoard[1][1] == pureBoard[0][2]
    ) {
      return pureBoard[1][1];
    }
    return "";
  };

  this.Reset = function () {
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        this.board[y][x].textContent = "";
      }
    }
  };
})();

//------------------------------------------------------------------
//------------------------------------------------------------------

function Reset() {
  gameInfo.Reset();
  screens.Reset();
  gameBoard.Reset();
  ResetEndMessage();
}
function PlayAgain() {
  gameBoard.Reset();
  ResetEndMessage();
}
function UpdateScoreUI() {
  var player1Label = document.getElementById("Player1ScoreLabel");
  var player2Label = document.getElementById("Player2ScoreLabel");

  var player1Score1 = document.getElementById("Player1Score");
  var player2Score = document.getElementById("Player2Score");

  if (gameInfo.playerCount == 1) {
    player1Label.firstChild.textContent = "Player: ";
    player2Label.firstChild.textContent = "AI: ";
  } else {
    player1Label.firstChild.textContent = "Player 1: ";
    player2Label.firstChild.textContent = "Player 2: ";
  }

  player1Score1.textContent = gameInfo.player1Score;
  player2Score.textContent = gameInfo.player2Score;
}

function ActivateEndMessage(messageText) {
  var endGameContainer = document.getElementById("EndGameMessage");
  var endGameMessage = endGameContainer.getElementsByTagName("p")[0];
  endGameContainer.style.display = "block";
  endGameMessage.innerText = messageText;
  gameInfo.gameOver = true;
}
function ResetEndMessage() {
  var endGameContainer = document.getElementById("EndGameMessage");
  endGameContainer.style.display = "none";
  gameInfo.gameOver = false;
}

function GameWinCheck() {
  var winningShape = gameBoard.GetWinningShape();
  if (winningShape == gameInfo.player1Shape) {
    gameInfo.player1Score += 1;
    UpdateScoreUI();
    ActivateEndMessage("Player 1 Has Won");
    return true;
  } else if (winningShape == gameInfo.player2Shape) {
    gameInfo.player2Score += 1;
    UpdateScoreUI();
    if (gameInfo.playerCount == 1) {
      ActivateEndMessage("The AI Has Won");
    } else {
      ActivateEndMessage("Player 2 Has Won");
    }
    return true;
  } else if (gameBoard.MovesLeft() == false) {
    ActivateEndMessage("Draw");
    return true;
  }
  return false;
}

function PlayBoxClick(boxNode) {
  if (gameInfo.gameOver == true) {
    return;
  }
  if (boxNode.textContent == "") {
    if (gameInfo.currentPlayer == 1) {
      //Player 1 has made a move
      boxNode.textContent = gameInfo.player1Shape;
      if (gameInfo.playerCount == 1) {
        //Now allow AI to make a move
        if (GameWinCheck()) {
          return;
        }
        var aiMove = AI.GetAIMove(
          gameBoard.GetPureBoard(),
          gameInfo.player2Shape,
          gameInfo.player1Shape
        );
        gameBoard.MakeMove(aiMove.x, aiMove.y, gameInfo.player2Shape);
      } else {
        gameInfo.currentPlayer = 2;
      }
    } //Player 2 has made a move
    else {
      boxNode.textContent = gameInfo.player2Shape;
      gameInfo.currentPlayer = 1;
    }
  }
  GameWinCheck();
}

window.onload = GeneralSetup;
function GeneralSetup() {
  screens.InitializeScreens();
  gameBoard.InitializeBoard();
}

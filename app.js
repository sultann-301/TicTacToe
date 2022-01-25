"use strict;";

const gameBoard = (() => {
  const gameContainer = document.querySelector(".container");
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push(" ");
  }

  const renderGameBoard = () => {
    const gameBoard = document.createElement("div");
    gameBoard.classList.add("gameBoard");
    for (let i = 0; i < 9; i++) {
      const gameTile = document.createElement("div");
      gameTile.classList.add("game-tile");

      gameBoard.appendChild(gameTile);
    }
    gameContainer.appendChild(gameBoard);
  };
  renderGameBoard();
  const renderEndGameScreen = (...args) => {
    if (args[0]) {
      let currentName = args[0].playerName;
      const winnerDiv = document.createElement("div");
      winnerDiv.classList.add("end-div");
      const winnerText = document.createElement("p");
      winnerText.innerText = `${currentName} won the game!`;
      winnerDiv.append(winnerText);
      document.body.append(winnerDiv);
    } else {
      const drawDiv = document.createElement("div");
      drawDiv.classList.add("end-div");
      const drawText = document.createElement("p");
      drawText.innerText = `The game ended with a draw!`;
      drawDiv.append(drawText);
      document.body.append(drawDiv);
    }
  };

  return { board, renderEndGameScreen };
})();

const player = (name, sign) => {
  let playerName = name;
  let playerSign = sign;

  // console.log(`${playerName} has entered the game!`);
  return { playerSign, playerName };
};

const gameController = (() => {
  const toggleTurn = (p1, p2) => {
    currentPlayer = p2;
    otherPlayer = p1;
    // console.log("switched turns!");
  };

  const isDraw = () => {
    const result = gameBoard.board.every((elem) =>
      elem == "X" || elem == "O" ? true : false
    );
    return result;
  };
  const checkWinner = () => {
    const solutionSheet = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let solution of solutionSheet) {
      //iterate over each possible solution DONE
      let selectedSolution = solution;

      let markedBoard =
        gameBoard.board[selectedSolution[0]] +
        gameBoard.board[selectedSolution[1]] +
        gameBoard.board[selectedSolution[2]];

      if (markedBoard === "XXX" || markedBoard === "OOO") {
        return true;
      } else {
      }
    }
  };
  return { toggleTurn, checkWinner, isDraw };
})();

const player1 = player("hebab", "X");
const player2 = player("neela", "O");
let currentPlayer = player1;
let otherPlayer = player2;
function playRound() {}

const gameTiles = document.querySelectorAll(".game-tile");
let isGameOver = false;
for (let [index, gameTile] of gameTiles.entries()) {
  gameTile.addEventListener(
    "click",
    () => {
      gameTile.innerText = currentPlayer.playerSign;
      gameBoard.board[index] = currentPlayer.playerSign;
      // console.log(gameBoard.board);

      const isWinnerFound = gameController.checkWinner();
      const isDrawFound = gameController.isDraw();
      if (!isWinnerFound) {
        if (isDrawFound) {
          console.log("the game ended with a draw");
          gameBoard.renderEndGameScreen();
          gameEnd = true;
          return gameEnd;
        } else {
          gameController.toggleTurn(currentPlayer, otherPlayer);
        }
      } else {
        gameBoard.renderEndGameScreen(currentPlayer);
        gameEnd = true;
        return gameEnd;
      }
    },
    { once: true }
  );
}

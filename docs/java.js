const Game = (function () {
  // Add Players //

  const players = [];
  let noOfTurn = 0;
  const Player = function (name, mark) {
    const player = name;
    const marker = mark;
    let turn = "";
    if (players.length === 0) {
      turn = true;
    } else {
      turn = false;
    }
    if (players.length < 2) {
      players.push({ player, marker, turn });
    }
  };

  const init = function () {
    bindEvents();
    gameBoard.removeChild(board);
    gameBoard.removeChild(playerInfo);
    gameBoard.removeChild(announcement);
    selectVersus.classList.toggle("hidden");
    playerInfo.classList.toggle("hidden");
    board.classList.toggle("hidden");
    announcement.classList.toggle("hidden");
  };

  // cache DOM//
  const gameBoard = document.querySelector("main#gameboard");
  const board = gameBoard.querySelector("div#board");
  const grids = board.querySelectorAll("p.mark");
  const oBtn = gameBoard.querySelector("button#O");
  const xBTn = gameBoard.querySelector("button#X");
  const playerInfo = gameBoard.querySelector("div#info");
  const selectPlayers = gameBoard.querySelector("div#players");
  const selectVersus = gameBoard.querySelector("div#versus");
  const PVPBtn = gameBoard.querySelector("#vsPlayer");
  const playerForm = playerInfo.querySelector("form#player-info");
  const markerO = playerForm.querySelector("button#O");
  const markerX = playerForm.querySelector("button#X");
  const nameInput = playerForm.querySelector("input#name");
  const markerList = playerForm.querySelector("ul#selectList");
  const userLabel = playerForm.querySelector("label#userName");
  const listMarkerO = markerList.querySelector("li#markerO");
  const listMarkerX = markerList.querySelector("li#markerX");
  const indicator = gameBoard.querySelector("h2#indication");
  const row1 = Array.from(board.querySelectorAll("p.row1"));
  const row2 = Array.from(board.querySelectorAll("p.row2"));
  const row3 = Array.from(board.querySelectorAll("p.row3"));
  const col1 = Array.from(board.querySelectorAll("p.col1"));
  const col2 = Array.from(board.querySelectorAll("p.col2"));
  const col3 = Array.from(board.querySelectorAll("p.col3"));
  const diag1 = Array.from(board.querySelectorAll("p.diag1"));
  const diag2 = Array.from(board.querySelectorAll("p.diag2"));
  const announcement = gameBoard.querySelector("section#announce");
  const restartBtn = announcement.querySelector("button#restart");
  const winnerText = announcement.querySelector("h2#winner");

  const bindEvents = function () {
    PVPBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      gameBoard.removeChild(selectVersus);
      gameBoard.appendChild(playerInfo);
    });
    grids.forEach((grid) => {
      grid.addEventListener("click", playerMarks.bind(grid));
    });
    playerForm.addEventListener("submit", (e) => {
      event.preventDefault();
    });
    markerO.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nameInput.value) {
        inputPlayers(nameInput.value, markerO);
      }
    });
    markerX.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nameInput.value) {
        inputPlayers(nameInput.value, markerX);
      }
    });
    restartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.reload();
    });
  };

  const inputPlayers = function (name, marker) {
    if (players.length === 0) {
      Player(name, marker.value);
      userLabel.textContent = "Player Two:";
      nameInput.value = "";
      if (marker.value === "O") {
        markerList.removeChild(listMarkerO);
      } else if (marker.value === "X") {
        markerList.removeChild(listMarkerX);
      }
    } else if (players.length === 1) {
      Player(name, marker.value);
      gameBoard.removeChild(playerInfo);
      gameBoard.appendChild(board);
      event.preventDefault();

      players.forEach((player) => {
        if (player.turn === true) {
          indicator.textContent = `Player ${player.player}'s turn`;
        }
      });
    }
  };

  const playerMarks = function () {
    event.stopPropagation();
    if (Boolean(this.textContent) === false) {
      this.textContent = `${playerTurn()}`;
      checkBoard(this);
    }
  };

  const playerTurn = function () {
    let marker;
    let name;
    players.map((user) => {
      if (user.turn === true) {
        marker = user.marker;
        user.turn = false;
      } else if (user.turn === false) {
        user.turn = true;
        name = user.player;
      }
    });
    indicator.textContent = `Player ${name}'s turn`;

    return marker;
  };

  const checkBoard = function () {
    switch (true) {
      case row1.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case row1.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case row2.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case row2.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case row3.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case row3.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case col1.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case col1.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case col2.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case col2.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case col3.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case col3.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case diag1.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case diag1.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      case diag2.every((grid) => grid.textContent === "X"):
        console.log("winner");
        announceWinner("X");
        break;
      case diag2.every((grid) => grid.textContent === "O"):
        console.log("winner");
        announceWinner("O");
        break;
      default:
        noOfTurn++;
        if (noOfTurn === 9) {
          announceWinner("draw");
        }
    }
  };

  const announceWinner = function (mark) {
    let winner;
    indicator.textContent = '';
    if (mark !== "draw") {
      players.forEach((player) => {
        if (player.marker === mark) {
          winner = player.player;
        }
        gameBoard.appendChild(announcement);
        winnerText.textContent = `The winner is ${winner}`;
      });
    } else {
      gameBoard.appendChild(announcement);
      winnerText.textContent = `It's a draw!`;
    }
  };
  init();
})();

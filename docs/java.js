const Game = (function () {
  // Add Players //

  const players = [];
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
    selectVersus.classList.toggle("hidden");
    playerInfo.classList.toggle("hidden");
    board.classList.toggle("hidden");
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
  // const listLabel = playerForm.querySelector('label[for=selectList]');
  const markerList = playerForm.querySelector("ul#selectList");
  const userLabel = playerForm.querySelector("label#userName");
  const listMarkerO = markerList.querySelector("li#markerO");
  const listMarkerX = markerList.querySelector("li#markerX");
  const indicator = gameBoard.querySelector("h2#indication");

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

  init();
})();

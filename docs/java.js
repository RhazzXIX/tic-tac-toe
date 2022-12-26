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
  };

  // cache DOM//
  const gameBoard = document.querySelector("main#gameboard");
  const board = gameBoard.querySelector("div#board");
  const grids = board.querySelectorAll("p.mark");
  const oBtn = gameBoard.querySelector("button#O");
  const xBTn = gameBoard.querySelector("button#X");
  const selectMarker = gameBoard.querySelector("div#marker");
  const selectPlayers = gameBoard.querySelector("div#players");
  const selectVersus = gameBoard.querySelector('div#versus')

  const bindEvents = function () {
    grids.forEach((grid) => {
      grid.addEventListener("click", playerMarks.bind(grid));
    });
  };

  const playerMarks = function () {
    event.stopPropagation();
    const player = players;
    console.log(playerTurn());
    this.textContent = "X";
  };

  const playerTurn = function () {
    console.log(players);
  };

  Player("Next", "X");
  Player("Roan", "O");

  init();
  gameBoard.removeChild(board);
  gameBoard.removeChild(selectMarker);
  gameBoard.removeChild(selectVersus);

  return { players, Player, init, bindEvents, playerMarks, playerTurn };
})();

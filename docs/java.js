(function () {
  // Cache DOM //
  const DOM = (function () {
    const gameBoard = document.querySelector("main#gameboard");
    const board = gameBoard.querySelector('div#board');
    const oBtn = gameBoard.querySelector("button#O");
    const xBtn = gameBoard.querySelector("button#X");
    const playerInfo = gameBoard.querySelector("div#info");
    const selectPlayers = gameBoard.querySelector("div#players");
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
    const announcement = gameBoard.querySelector("section#announce");
    const restartBtn = announcement.querySelector("button#restart");
    const winnerText = announcement.querySelector("h2#winner");
    const selectVersus = gameBoard.querySelector("div#versus");

    return {
      gameBoard, 
      board,
      oBtn, 
      xBtn, 
      selectPlayers, 
      PVPBtn,
      markerO,
      markerX,
      playerInfo,
      announcement,
      nameInput,
      userLabel,
      listMarkerO,
      listMarkerX,
      indicator,
      restartBtn,
      winnerText,
      selectVersus,
      playerForm,
      markerList,
      }

  }) ();

  // Create GameBoard //
  
  const GameBoard = (function () {
    const panels = [];
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const col1 = [];
    const col2 = [];
    const col3 = [];
    const diag1 = [];
    const diag2 = [];
    for (let i = 1; i <= 9; i+= 1) {
      const panel = document.createElement('div')
      switch (i) {
        case 1: 
          row1.push(panel);
          col1.push(panel);
          diag1.push(panel);
          panel.setAttribute('data-row', 1);
          panel.setAttribute('data-col', 1);
          panel.setAttribute('data-diag', 1);
          break
        case 2: 
          row1.push(panel);
          col2.push(panel);
          panel.setAttribute('data-row', 1);
          panel.setAttribute('data-col', 2);
          break
        case 3:
          row1.push(panel);
          col3.push(panel);
          diag2.push(panel);
          panel.setAttribute('data-row', 1);
          panel.setAttribute('data-col', 3);
          panel.setAttribute('data-diag', 2);
          break
        case 4:
          row2.push(panel);
          col1.push(panel);
          panel.setAttribute('data-row', 2);
          panel.setAttribute('data-col', 1);          
          break
        case 5:
          row2.push(panel);
          col2.push(panel);
          diag1.push(panel);
          diag2.push(panel);
          panel.setAttribute('data-row', 2);
          panel.setAttribute('data-col', 2);
          panel.setAttribute('data-diag', 3);
          break;
        case 6:
          row2.push(panel);
          col3.push(panel);
          panel.setAttribute('data-row', 2);
          panel.setAttribute('data-col', 3);
          break;
        case 7:
          row3.push(panel);
          col1.push(panel);
          diag2.push(panel);
          panel.setAttribute('data-row', 3);
          panel.setAttribute('data-col', 1);
          panel.setAttribute('data-diag', 2);
          break;
        case 8:
          row3.push(panel);
          col2.push(panel);
          panel.setAttribute('data-row', 3);
          panel.setAttribute('data-col', 2);
          break;
        default:
          row3.push(panel);
          col3.push(panel);
          diag1.push(panel);
          panel.setAttribute('data-row', 3);
          panel.setAttribute('data-col', 3);
          panel.setAttribute('data-diag', 2);
          break;
      }
      panel.classList.add('mark');
      panels.push(panel);
    };
    const mat = document.createElement('div');
    mat.setAttribute('id', 'grid')
    DOM.board.appendChild(mat);
    panels.forEach((panel) => {
      mat.appendChild(panel);
    })
    return  { panels, row1, row2, row3, col1, col2, col3, diag1, diag2, } ;
  }) ();

  

  // Create Gamers //
  const users = (function () {
    const players = [];
    const Player = function (name, marker) {
      let turn = "";
      if (players.length === 0) {
        turn = true;
      } else {
        turn = false;
      }
      if (players.length < 2) {
        players.push({ name, marker, turn });
      }
    };
    return {players, Player}
  }) () ;
  
  // Game Mechanism //

  const Game = (function() {

    let noOfTurn = 0;
    
    const init = function () {
      bindEvents();
      DOM.gameBoard.removeChild(DOM.board);
      DOM.gameBoard.removeChild(DOM.playerInfo);
      DOM.gameBoard.removeChild(DOM.announcement);
      DOM.selectVersus.classList.toggle("hidden");
      DOM.playerInfo.classList.toggle("hidden");
      DOM.board.classList.toggle("hidden");
      DOM.announcement.classList.toggle("hidden");
    };
  
  
  
    const bindEvents = function () {
      DOM.PVPBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        DOM.gameBoard.removeChild(DOM.selectVersus);
        DOM.gameBoard.appendChild(DOM.playerInfo);
      });
      GameBoard.panels.forEach((panel) => {
        panel.addEventListener("click", playerMarks.bind(panel));
      });
      DOM.playerForm.addEventListener("submit", (e) => {
        e.stopPropagation();
        event.preventDefault();
      });
      DOM.markerO.addEventListener("click", (e) => {
        e.stopPropagation();
        if (DOM.nameInput.value) {
          inputPlayers(DOM.nameInput.value, DOM.markerO);
        }
      });
      DOM.markerX.addEventListener("click", (e) => {
        e.stopPropagation();
        if (DOM.nameInput.value) {
          inputPlayers(DOM.nameInput.value, DOM.markerX);
        }
      });
      DOM.restartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.location.reload();
      });
    };
  
    const inputPlayers = function (name, marker) {
      if (users.players.length === 0) {
        users.Player(name, marker.value);
        DOM.userLabel.textContent = "Player Two:";
        DOM.nameInput.value = "";
        if (marker.value === "O") {
          DOM.markerList.removeChild(DOM.listMarkerO);
        } else if (marker.value === "X") {
          DOM.markerList.removeChild(DOM.listMarkerX);
        }
      } else if (users.players.length === 1) {
        users.Player(name, marker.value);
        DOM.gameBoard.removeChild(DOM.playerInfo);
        DOM.gameBoard.appendChild(DOM.board);
        event.preventDefault();
  
        users.players.forEach((player) => {
          if (player.turn === true) {
            DOM.indicator.textContent = `Player ${player.name}'s turn`;
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
      users.players.map((user) => {
        const gamer = user;
        if (gamer.turn === true) {
          marker = gamer.marker;
          gamer.turn = false;
        } else if (gamer.turn === false) {
          gamer.turn = true;
          name = gamer.name;
        }
        
      });
      DOM.indicator.textContent = `Player ${name}'s turn`;
  
      return marker;
    };
  
    const checkBoard = function () {
      switch (true) {
        case GameBoard.row1.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.row1.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.row2.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.row2.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.row3.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.row3.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.col1.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.col1.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.col2.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.col2.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.col3.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.col3.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.diag1.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.diag1.every((grid) => grid.textContent === "O"):
          announceWinner("O");
          break;
        case GameBoard.diag2.every((grid) => grid.textContent === "X"):
          announceWinner("X");
          break;
        case GameBoard.diag2.every((grid) => grid.textContent === "O"):
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
      DOM.indicator.textContent = '';
      if (mark !== "draw") {
        users.players.forEach((player) => {
          if (player.marker === mark) {
            winner = player.name;
          }
          DOM.gameBoard.appendChild(DOM.announcement);
          DOM.winnerText.textContent = `The winner is ${winner}`;
        });
      } else {
        DOM.gameBoard.appendChild(DOM.announcement);
        DOM.winnerText.textContent = `It's a draw!`;
      }
    };
    return  init() ;
  }) ();

})();

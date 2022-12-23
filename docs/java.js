(function () {
  const Game = {
    const players = [];
    Player() {
      const player = "";
      const marker = "";
      return { player, marker };
    },

    init() {
      this.cacheDom();
      this.render();
      this.bindEvents();
    },

    cacheDom() {
      this.gameBoard = document.querySelector("main#gameboard");
      this.board = this.gameBoard.querySelector("div#board");
      this.grids = this.board.querySelectorAll("p.mark");
      this.oBtn = this.gameBoard.querySelector("button#O");
      this.xBTn = this.gameBoard.querySelector('button#X')
    },

    bindEvents() {
      this.grids.forEach((grid) => {
        grid.addEventListener('click', this.playerMarks.bind(this, grid));
      });
    },

    playerMarks (grid) {
      grid.textContent = "X";
    },

    render() {
      
    },
  };

  Game.init();
})();

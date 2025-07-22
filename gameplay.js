import { Player } from "./player.js";

// 0 - Initialize players
const player = new Player('Player');
const computerPlayer = new Player('Computer');

// 1 - Initialize boards
const board1 = document.getElementById('gameboard1');
const board2 = document.getElementById('gameboard2');

// 2 - Render boards
player.gameboard.renderGameboard(board1);
computerPlayer.gameboard.renderGameboard(board2);


// 3 - Enable click events to cells

// 4 - Place ships

// 5 - Handle turns

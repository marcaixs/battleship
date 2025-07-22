import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const player = new Player('Player');
const computerPlayer = new Player('Computer');

const board1 = document.getElementById('gameboard1');
const board2 = document.getElementById('gameboard2');

player.gameboard.renderGameboard(player.type, board1);
computerPlayer.gameboard.renderGameboard(computerPlayer.type, board2);



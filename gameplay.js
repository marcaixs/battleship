import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";

const player = new Player('Player');
const computerPlayer = new Player('Computer');

const board1 = document.getElementById('gameboard1');
const board2 = document.getElementById('gameboard2');

function fillGameboard(type, board){
    for(let i = 0; i<10; i++){
        for(let j=0; j<10; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell'+type);
            cell.classList.add(i+''+j);
            board.appendChild(cell);
        }
    }    
}

fillGameboard(player.type, board1);
fillGameboard(computerPlayer.type, board2);



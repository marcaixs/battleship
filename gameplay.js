import { Player } from "./player.js";

// 1 - Initialize boards and start button 
const board1 = document.getElementById('gameboard1');
const board2 = document.getElementById('gameboard2');
const startButton = document.getElementById('start')

// 0 - Initialize players
const player = new Player('Player', board1);
const computerPlayer = new Player('Computer', board2);

// 2 - Render boards
player.gameboard.renderGameboard();
computerPlayer.gameboard.renderGameboard();


// 3 - add function to change direction buttons
player.gameboard.changeShipDirection(); 

//call initiatePlacement for each ship on the array
player.gameboard.initiatePlacement(player.gameboard.ships);

// 4 - initiate cells to recive attacks on start button click
startButton.addEventListener('click', ()=>{
    player.gameboard.initiateCells();
})

// 5 - Handle turns

import { Player } from "./player.js";



// 1 - Initialize boards
const board1 = document.getElementById('gameboard1');
const board2 = document.getElementById('gameboard2');

// 0 - Initialize players
const player = new Player('Player', board1);
const computerPlayer = new Player('Computer', board2);

// 2 - Render boards
player.gameboard.renderGameboard();
computerPlayer.gameboard.renderGameboard();


// 3 - Place ships
const buttonVertical = document.getElementById('vertical')
const buttonHorizontal = document.getElementById('horizontal')

//call initiatePlacement for each ship on the array
player.gameboard.ships.map((ship)=>{
   
})


// 4 - initiat cells to recive attacks 

// 5 - Handle turns

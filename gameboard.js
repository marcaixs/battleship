import { Ship } from './ship.js'
import { Cell } from './cell.js';

export class Gameboard {
    constructor(player){
        this.grid = []; // Array to hold all the cells (board)
        this.player =  player
        // !!!!!------------- Ships hardcoded. This can be removed.
        const ship1 = new Ship(3,false, ["1-1", "2-1", "3-1"]);
        // const ship2 = new Ship(5,false, []);
        // const ship3 = new Ship(5,false, []);
        this.ships = [ship1];
        // !!!!!------------- Ships hardcoded. This can be removed.
        
    }

    // This is necessary to fill up the board grid array.
    createGrid(){
        for(let i = 0; i<10; i++){
            this.grid.push([]); // Adds a new row
             for(let j = 0; j<10; j++){
                    const cell = new Cell(); // Instanciates a new cell to add it to the new row (column)
                    this.grid[i].push(cell);
                }
        }
    }

    //this is necessary to print the board on the screen and add a event listener for each cell
    renderGameboard(board){
         for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.createElement('div');
                cell.classList.add('cell'+this.player.type);
                cell.id = i+'-'+j;
                cell.addEventListener('click', ()=>{
                    this.recieveAttack(i, j);
                })
                board.appendChild(cell);
            }
        }    
    }

    //this is necessary to check if the player has hit a ship 
    recieveAttack(x, y){
        if(!this.grid[x][y].played){
            this.ships.map((ship, s)=>{
                if(ship.cells.includes(x+"-"+y)) {
                    ship.hit();
                    console.log("The ship has been hit!");
                    document.getElementById(x+"-"+y).style.backgroundColor = "red";
                    if(ship.isSunk()){
                        this.ships.splice(s, 1);
                        console.log("The ship has been sunk!");
                    }
                } else {
                    document.getElementById(x+"-"+y).style.backgroundColor = "blue";
                }
            })
            this.grid[x][y].played = true;
        }else{
            console.log("You already played this cell!");
        }
    }

    // This is necessary to allocate ships when the game starts
    placeShip(ship){
        
        
    }

    
    
}



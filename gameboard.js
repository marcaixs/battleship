import { Ship } from './ship.js'
import { Cell } from './cell.js';

export class Gameboard {
    constructor(player, board){
        this.grid = []; // Array to hold all the cells (board)
        this.player =  player
        this.board = board;
        //ship collection, player must place them and modify 'cells[]'
        const ship1 = new Ship(2,false, []);
        const ship2 = new Ship(3,false, []);
        const ship3 = new Ship(3,false, []);
        const ship4 = new Ship(4,false, []);
        const ship5 = new Ship(5,false, []);
        //array of all ships
        this.ships = [ship1, ship2, ship3, ship4, ship5];
      
        
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

    //this is necessary to print the board on the screen
    renderGameboard(){
         for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.createElement('div');
                
                cell.classList.add('cell'+this.player.type);
                cell.id = i+'-'+j;   

                //cell.addEventListener('click', ()=>{
               //     this.recieveAttack(i, j);
               // })
                this.board.appendChild(cell);
                this.ships.forEach((ship)=>{ //check all ships cells to paint ships brown
                   if (ship.cells.includes(i+"-"+j)){
                        document.getElementById(i+"-"+j).style.backgroundColor = "brown";
                    }         
                        
                })
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
    placeShip(ship, x, y){
        console.log('placeship');
       if(ship.isHorizontal){
        for(let i = 0; ship.length; i++){
             ship.cells.push(x+'-'+y+i);
        } 
       } else {
        for(let i = 0; ship.length; i++){
             ship.cells.push(x+i+'-'+y);
        } 
       }           
    }

    //initiate the placement of ships, adding event listeners
    initiatePlacement(ship){
        for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.getElementById(i+'-'+j)
                 cell.addEventListener('click', ()=>{
                    this.placeShip(ship, i, j)
                })
            }
        } 

    }
    
    //add event listeners to the cells
    initiateCells(){
        for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.getElementById(i+'-'+j)
                 cell.addEventListener('click', ()=>{
                    this.recieveAttack(i, j);
                })
            }
        }    
    }
    
}



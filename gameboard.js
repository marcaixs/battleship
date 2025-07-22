import { Ship } from './ship.js'

export class Gameboard {
    constructor(){
        this.grid = [];
        createGrid();

        const ship1 = new Ship(5,'vertical', []);
        const ship2 = new Ship(5,'vertical', []);
        const ship3 = new Ship(5,'vertical', []);

        this.ships = [ship1, ship2, ship3];
    }

    createGrid(){
        for(let i = 0; i<10; i++){
             for(let j = 0; j<10; j++){
                    const cell = new Cell(i, j);
                    this.grid.push(cell)
                }
        }
    }

    placeShip(ship, x, y){
        ship.startingCell.push(x, y)

        if(ship.direction == 'vertical'){
            for (let i = 0; i<ship.length; i++){
                ship.cells.push(this.grid[x][y+i])
            }
        }

        if(ship.direction == 'horizontal'){
            for (let i = 0; i<ship.length; i++){
                ship.cells.push(this.grid[x+i][y])
            }
        }
        
    }

    recieveAttack(x,y){
        if(this.grid[x,y].played == false){
            this.ships.forEach((ship)=>{
             ship.find((coordenates)=>{
                if(coordenates.x == x && coordenates.y == y){
                    ship.hit();
                    if(ship.isSunk()==true){
                        this.ships - 1;
                    }
                }
             })   
        })

        this.grid[x,y].played = true;
        }     
    }
}

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.played = false;
    }
}

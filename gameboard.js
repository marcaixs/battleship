export class Gameboard {
    constructor(){
        this.grid = [];
        createGrid();
        this.ships = 5;
    }

    createGrid(){
        for(let i = 0; i<10; i++){
             for(let j = 0; j<100; j++){
                    const cell = new Cell(i, j);
                    this.grid.push(cell)
                }
        }
    }

    placeShip(ship){

    }

    recieveAttack(){
        
    }
}

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.position = String(x) + String(y);
        this.ship = false;
        this.missed = false;
        this.destroyed = false;
    }
}

export class Ship {
    constructor(length, direction, startingCell){
        this.length = length;
        this.direction = direction;
        this.startingCell = startingCell;
        this.cells = []
        this.hits = 0;
        this.sunk = false;
    }
    hit(){
        this.hits ++;
    }
    isSunk(){
        if (this.length <= this.hits) this.sunk = true;
        return this.sunk;
    }
}
export class Ship {
    constructor(length, isHorizontal, cells){
        this.length = length;
        this.isHorizontal = isHorizontal;
        this.cells = cells;
        this.hits = 0;
        this.sunk = false;
    }

    hit(){
        this.hits ++;
    }
    
    isSunk(){
        return this.length <= this.hits;
    }

}
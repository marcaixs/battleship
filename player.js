import { Gameboard } from "./gameboard.js"

export class Player{
    constructor(type, board){
        this.type = type;
        this.gameboard = new Gameboard(this, board);
        this.gameboard.createGrid();
    }
}
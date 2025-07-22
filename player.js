import { Gameboard } from "./gameboard.js"

export class Player{
    constructor(type){
        this.gameboard = new Gameboard();
        this.gameboard.createGrid();
        this.type = type;
    }
}
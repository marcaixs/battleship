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
        this.currentShip = 0;  //current ship to be placed
        this.currentHoritzontal = false; //current direction of the ship being placed
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
        this.board.innerHTML = ''; //delete board to render it again

         for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.createElement('div');
                
                cell.classList.add('cell'+this.player.type);
                cell.id = this.player.type+'-'+i + '-' + j;   

                this.board.appendChild(cell);

                this.ships.forEach((ship)=>{ //check all ships cells to paint ships brown
                   if (ship.cells.includes(i+"-"+j)){
                        document.getElementById(this.player.type+'-'+i + '-' + j).style.backgroundColor = "brown";
                    }         
                        
                })
            }
        }    
    }

    //this is necessary to check if the player has hit a ship 
    recieveAttack(x, y){
        if(this.grid[x][y].played){
            console.log("You already played this cell!");
            return;
        }
        
        for(let i = 0; i<this.ships.length; i++){
            const ship = this.ships[i]
             if(ship.cells.includes(x+"-"+y)) {
                ship.hit();
                console.log(this.player.type+" ship has been hit!");
                document.getElementById(this.player.type+'-'+x + '-' + y).style.backgroundColor = "red";

                if(this.ships[i].isSunk()){
                    this.ships.splice(i, 1);
                    console.log(this.player.type + " ship has been sunk!");
                }
                return   
            } 
        }
        this.grid[x][y].played = true;
        document.getElementById(this.player.type+'-'+x + '-' + y).style.backgroundColor = "blue";
        
        
    }

    // This is necessary to allocate ships when the game starts
    placeShip( x, y){
        
        const p = document.getElementById('paragrafShip');
        const message = document.getElementById('message');
        const start = document.getElementById('start');
        const buttonDirection = document.getElementById('direction');

        const ship = this.ships[this.currentShip];

        if(!ship){ //if there are no ships left, quit
            return
        }
       
        p.innerText = 'Ship '+(this.currentShip + 1);
        console.log('Ship '+this.currentShip)

        ship.isHorizontal = this.currentHoritzontal //place ship in the current direction

        if(!ship.isHorizontal){
            //if ship coordenates are out of the board
            if(y+ship.length>10){ 
                message.innerText = 'Ship out of limits';
                console.log('Ship out of limits');
                return;
            }
            //if ship coordenates conflicts with another ship
            for (const otherShip of this.ships) {
                for (let i = 0; i < otherShip.length; i++) {
                    if (otherShip.cells.includes(x + '-' + (y + i))) {
                        message.innerText = 'Cell already taken';
                        console.log('Cell already taken');
                        return; 
                    }
                }
            }

            for(let i = 0; i<ship.length; i++){
                ship.cells.push(x+'-'+(y+i));
            } 

        } else {
            //if ship coordenates are out of the board
            if(x+ship.length>10){ 
                message.innerText = 'Ship out of limits';
                console.log('Ship out of limits')
                return
            }
            //if ship coordenates conflicts with another ship
            for (const otherShip of this.ships) {
                for (let i = 0; i < otherShip.length; i++) {
                    if (otherShip.cells.includes((x+i) + '-' + y)) {
                        message.innerText = 'Cell already taken';
                        console.log('Cell already taken');
                        return; 
                    }
                }
            }

            for(let i = 0; i<ship.length; i++){
                ship.cells.push((x+i)+'-'+y);          
            } 
       }

       this.currentShip ++ 
       this.renderGameboard();
       
       if (this.currentShip < this.ships.length) {
            this.initiatePlacement(); // continue with next ship

        } else {
            //if all ships al placed, hide direction button and show start game button
            console.log("All ships have been placed");
            message.innerText = 'All ships have been placed';
            p.innerText = "Press start!"
            start.style.visibility = 'visible';
            buttonDirection.style.visibility = 'hidden';
        }
    }

    //initiate the placement of ships, adding event listeners
    initiatePlacement(){ 
        for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.getElementById(this.player.type+'-'+i + '-' + j)
                cell.addEventListener('click', ()=>{
                    this.placeShip(i, j)
                    
                })
            }
        } 
    }

    //place random ships for computer
    computerInitiatePlacement(){
        while (this.currentShip < this.ships.length) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const isHorizontal = Math.random() < 0.5;
            this.computerPlaceShip(x, y, isHorizontal);
        }
        //delete to make computer ships invisible
    }

    //place the ships for the computer
    computerPlaceShip(x, y, isHorizontal) {
        const ship = this.ships[this.currentShip];

        if (!ship) return;

        ship.isHorizontal = isHorizontal;

        if (!ship.isHorizontal) {
            if (y + ship.length > 10) return;
            for (const otherShip of this.ships) {
                for (let i = 0; i < otherShip.length; i++) {
                    if (otherShip.cells.includes(x + '-' + (y + i))) return;
                }
            }
            for (let i = 0; i < ship.length; i++) {
                ship.cells.push(x + '-' + (y + i));
            }
        } else {
            if (x + ship.length > 10) return;
            for (const otherShip of this.ships) {
                for (let i = 0; i < otherShip.length; i++) {
                    if (otherShip.cells.includes((x + i) + '-' + y)) return;
                }
            }
            for (let i = 0; i < ship.length; i++) {
                ship.cells.push((x + i) + '-' + y);
            }
        }

        this.currentShip++;
    }

    //change ship direction
    changeShipDirection(){
        const buttonDirection = document.getElementById('direction')
       
        buttonDirection.innerHTML = this.currentHoritzontal ? 'Horizontal' : 'Vertical';

        buttonDirection.addEventListener('click', ()=>{
            this.currentHoritzontal = !this.currentHoritzontal;
            buttonDirection.innerHTML = this.currentHoritzontal ? 'Horizontal' : 'Vertical';
            
        })
    }
    
    //add event listeners to the cells
    initiateCells(){
        for(let i = 0; i<this.grid.length; i++){
            for(let j=0; j<this.grid.length; j++){
                const cell = document.getElementById(this.player.type+'-'+i + '-' + j)
                 cell.addEventListener('click', ()=>{
                    this.recieveAttack(i, j);
                })
            }
        }    
    }
    
}



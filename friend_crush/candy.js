var candies = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple"];
var board = [];
var rows= 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

//main function
window.onload = function()
{
    startGame();

    window.setInterval( function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },100)
}



function randomCandy(){
    return candies[Math.floor(Math.random()*candies.length)];
}

function startGame()
{
    for (let r = 0; r< rows; r++ ){
        let row = [];
        for (let c = 0; c< columns; c++)
        {
            // img
            let tile = document.createElement("img");
            tile.id = r.toString() + '-' + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            //drag_function
            tile.addEventListener("dragstart",dragStart); // click on candy--initial candy
            tile.addEventListener("dragover",dragOver); // click hold and drag
            tile.addEventListener("dragenter",dragEnter); // dragging to another candy 
            tile.addEventListener("dragleave",dragLeave); //leave candy over another candy
            tile.addEventListener("drop",dragDrop); // droping candy over another candy
            tile.addEventListener("dragend",dragEnd); //after drag and drop we swap candies
            

            document.getElementById('board').append(tile);
            row.push(tile);
        }

        board.push(row);
    }

    console.log(board);
}


    function dragStart()
    {
        // this refer to the tile that is clicked
        currTile = this;
    }

    function dragOver(e){
        e.preventDefault(); //dont worry about it
    }

    function dragEnter(e){
        e.preventDefault(); //dont worry about it
    }

    function dragLeave(){

    }

    function dragDrop(){

        otherTile = this; //this refer to the target tile
    }
    
    function dragEnd(){

        if(currTile.src.includes("blank")|| otherTile.src.includes("blank")){
            return;
        }

        let currCoord = currTile.id.split("-") // id 0-0 -> ["0","0"]
        let r = parseInt(currCoord[0]);
        let c = parseInt(currCoord[1]);

        let otherCoord = otherTile.id.split("-") // id 0-0 -> ["0","0"]
        let r2 = parseInt(otherCoord[0]);
        let c2 = parseInt(otherCoord[1]);

        let moveLeft = c2 == c-1 && r==r2;
        let moveRight = c2 == c+1 && r==r2;
        let moveUp = r2 == r-1 && c==c2;
        let moveDown = r2 == r+1 && c==c2;

        let isAdjacent = moveLeft||moveRight||moveUp||moveDown;


        if(isAdjacent){
            let currimg = currTile.src;
            let otherimg = otherTile.src;
            currTile.src  = otherimg;
            otherTile.src = currimg;
            let validMove = checkValid();

            if(!validMove){
                let currimg = currTile.src;
                let otherimg = otherTile.src;
                currTile.src  = otherimg;
                otherTile.src = currimg;
            }
        }
        
        
        
    }

    function crushCandy(){
        //crushFive();
        //crushFour();
        crushThree();
    }

    function crushThree(){
        //check rows;
        for(let r = 0; r < rows; r++){
            for(let c=0; c<columns-2; c++){
                let candy1 = board[r][c];
                let candy2 = board[r][c+1];
                let candy3 = board[r][c+2];
                if(candy1.src== candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    candy1.src = "./images/blank.png";
                    candy2.src = "./images/blank.png";
                    candy3.src = "./images/blank.png";
                }
            }
        }

        //check columns
        for(let c = 0; c < columns; c++){
            for(let r=0; r<rows-2; r++){
                let candy1 = board[r][c];
                let candy2 = board[r+1][c];
                let candy3 = board[r+2][c];
                if(candy1.src== candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    candy1.src = "./images/blank.png";
                    candy2.src = "./images/blank.png";
                    candy3.src = "./images/blank.png";
                }
            }
        }

    }

    function checkValid(){

        //check rows;
        for(let r = 0; r < rows; r++){
            for(let c=0; c<columns-2; c++){
                let candy1 = board[r][c];
                let candy2 = board[r][c+1];
                let candy3 = board[r][c+2];
                if(candy1.src== candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    return true;
                }
            }
        }

        //check columns
        for(let c = 0; c < columns; c++){
            for(let r=0; r<rows-2; r++){
                let candy1 = board[r][c];
                let candy2 = board[r+1][c];
                let candy3 = board[r+2][c];
                if(candy1.src== candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                    return true;
                }
            }
        }
        return false;
    }



    function slideCandy(){
        for(let c = 0; c< columns; c++){
            let ind = rows -1 ;
            for (let r = columns-1; r >=0; r--){
                if(!board[r][c].src.includes("blank")) {
                    board[ind][c].scr = board[r][c].src;
                    ind -= 1;
                }
            }

            for(let r = ind; r >= 0 ;r--){
                board[r][c].src = "./images/blank.png";
            }
        }
    }

    function generateCandy() {
        for (let c = 0; c < columns;  c++) {
            if (board[0][c].src.includes("blank")) {
                board[0][c].src = "./images/" + randomCandy() + ".png";
            }
        }
    }
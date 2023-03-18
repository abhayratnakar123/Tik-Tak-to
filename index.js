const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6], 
];

//lets create a function that initializes the game 

function initGame() {
    currentPlayer = "X";
    //game grid ko to empty kr rhe ho 
    gameGrid = ["","","","","","","","",""];
    //ui pr empty kro 
    boxes.forEach((box , index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //Green color ko bhi remove krna hai
        box.classList = `box box${index+1}`; 
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
      currentPlayer = "O";  
    }
    else{
        currentPlayer = "X";
    }
    //Ui update
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
    
}


function checkGameOver() {
   let answer = "";

   winningPositions.forEach((position) => {

    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="")
    && (gameGrid[position[0]] ===  gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

        //chech if winner is X 
        if(gameGrid[position[0]] === "X" )
        answer = "X";

        else
        answer = "O";

        //disable pointer 
        boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
        })

        //now we know the winner 

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
   });

   //it means we have a winner -- 
   if(answer != ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;

   }

   //when there is no tie --
   let fillCount = 0; 
   gameGrid.forEach((box) =>{
    if(box !== "" )
    fillCount++;
   } );

   if(fillCount ===9){
    gameInfo.innerText = "Game Tied ! ";
    newGameBtn.classList.add("active");
   }
}

function handleClick(index) {
    if(gameGrid[index] === ""){
        //this line change ui
        boxes[index].innerHTML = currentPlayer;
        //this line change gameGrid
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        //koi jit to nhi gya
        checkGameOver();

    }
    
}

//loop to ittrate eaxh 9 boxes and check what box is selected 
boxes.forEach((box ,index)=>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);

 
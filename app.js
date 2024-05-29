const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const resetButton = document.querySelector("#resetButton")
const gameBackground = document.querySelector('.gameBackground');
const startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]
let go = "Noughts"
infoDisplay.textContent = "Noughts goes first"

function createBoard(){
    gameBoard.innerHTML = '';
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")  
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
}

function addGo(e){
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "Noughts" ? "Cross" : "Noughts" // if it is not noughts, change to cross, otherwise keep as noughts
    infoDisplay.textContent = go + "'s turn"
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    for (const array of winningCombos) { // Getting array
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("Noughts")) // Checking every item in array if its noughts
        if (circleWins) {
            infoDisplay.textContent = "Noughts wins"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            gameBackground.style.background = '#FFC470';
            return
        }
    }

    for (const array of winningCombos) { // Getting array
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("Cross")) // Checking every item in array if its a cross
        if (crossWins) {
            infoDisplay.textContent = "Cross wins"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            gameBackground.style.background = '#DD5746';
            return
        }
    }

    const isDraw = [...allSquares].every(square => square.firstChild)
    if (isDraw){
        infoDisplay.textContent = "Draw"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    }
}

function resetGame() {
    go = "Noughts"
    infoDisplay.textContent = "Noughts goes first"
    gameBackground.style.background = '#4793AF';
    createBoard()
}

createBoard()

resetButton.addEventListener("click", resetGame)

let mode = "1p" // 1p | 2p
let playerSymbol = "X" // X | O
let turn = "X"; // X | O
const board = {
    "1,1": "",
    "1,2": "",
    "1,3": "",
    "2,1": "",
    "2,2": "",
    "2,3": "",
    "3,1": "",
    "3,2": "",
    "3,3": "",
}

function insertXorO(element) {
    //get the cell position (to later change the state)
    const cell = element.getAttribute('data-cell');

    //check that cell is not taken already
    if(!board[cell]) {
        
        //insert the correct symbol to the UI
        element.textContent = turn;

        //insert symbol to the state
        board[cell] = turn;

        //check if victory or gameover conditions were met
        if(!isGameover()) {
            //change turn state to other symbol
            turn = turn === "X"? "O": "X";
    
            //change turn UI text to reflect correct turn
            if(mode === "2p")
                document.getElementById('turn-ui').textContent = `Turn: ${turn}`;
            else
                document.getElementById('turn-ui').textContent = `Turn: ${turn} ${turn === playerSymbol? "(Player)":"(CPU)"}`;
        }
    } else {
        alert("This cell is already taken")
    }
}

function isGameover() {
    let gameover = false;
    //if there are 3 same symbols in a row
    if(threeInRow()) {
        //victory message && gameover
        alert(`${turn} wins!`);
        resetGame();
        gameover = true;
    }

    //if there are 3 same symbols in a column
    if(threeInCol()){
        //victory message && gameover
        alert(`${turn} wins!`);
        resetGame();
        gameover = true;
    }

    //if there are 3 same symbols in a diagonal
    if(threeInDiagonal()) {
        //victory message && gameover
        alert(`${turn} wins!`);
        resetGame();
        gameover = true;
    }

    //if board is full
    if(boardIsFull()) {
        //display message of draw && gameover
        alert("Draw!, nobody wins..");
        resetGame();
        gameover = true;
    }
    return gameover;
}

function resetGame() {
    //reset turn to be X's turn
    turn = "X";
    
    //reset grid state to be an empty grid
    for(cell in board) {
        board[cell] = "";
    }

    //reset UI grid to be empty
    const grid = document.getElementById("game-grid");
    for(let i = 0; i < grid.children.length; i++) {
        grid.children[i].textContent = "-";
    }

    //reset turn UI to X
    document.getElementById('turn-ui').textContent = `Turn: ${turn}`;
}

function boardIsFull() {
    let full = true;
    for(let cell in board) {
        if(!board[cell]) full = false;
    }
    return full;
}

function threeInRow() {
    if( (board["1,1"] === board["1,2"] && board["1,2"] === board["1,3"]) && (board["1,1"] && board["1,2"] && board["1,3"]) ||
        (board["2,1"] === board["2,2"] && board["2,2"] === board["2,3"]) && (board["2,1"] && board["2,2"] && board["2,3"]) ||
        (board["3,1"] === board["3,2"] && board["3,2"] === board["3,3"]) && (board["3,1"] && board["3,2"] && board["3,3"]) ) {
        
        return true;
    } else {
        return false;
    }
}

function threeInCol() {
    if( (board["1,1"] === board["2,1"] && board["2,1"] === board["3,1"]) && (board["1,1"] && board["2,1"] && board["3,1"]) ||
        (board["1,2"] === board["2,2"] && board["2,2"] === board["3,2"]) && (board["1,2"] && board["2,2"] && board["3,2"]) ||
        (board["1,3"] === board["2,3"] && board["2,3"] === board["3,3"]) && (board["1,3"] && board["2,3"] && board["3,3"]) ) {
        
        return true;
    } else {
        return false;
    }
}

function threeInDiagonal() {
    if( (board["1,1"] === board["2,2"] && board["2,2"] === board["3,3"]) && (board["1,1"] && board["2,2"] && board["3,3"]) ||
        (board["3,1"] === board["2,2"] && board["2,2"] === board["1,3"]) && (board["3,1"] && board["2,2"] && board["1,3"]) ) {
        
        return true;
    } else {
        return false;
    }
}

function onePlayer() {
    const gameContainer = document.querySelector(".game-container");
    mode = "1p";
    gameContainer.innerHTML = onePlayerHTML;
}

function twoPlayers() {
    const gameContainer = document.querySelector(".game-container");
    mode = "2p";
    gameContainer.innerHTML = twoPlayersHTML;
}

function playerChoice(symbolChoice) {
    const gameContainer = document.querySelector(".game-container");
    playerSymbol = symbolChoice;

    gameContainer.innerHTML = onePlayerGameHTML;
    document.getElementById('turn-ui').textContent = `Turn: ${turn} ${turn === playerSymbol? "(Player)":"(CPU)"}`;
    gameManager(null);
}

function gameManager(element) {
    if(turn === playerSymbol) {
        insertXorO(element);
    }

    if(turn !== playerSymbol) {
        //get all cell elements
        const cells = document.getElementById("game-grid").children;
    
        //find available options
        const options = [];
        for(let i = 0; i < cells.length; i++) {
            if(cells[i].textContent === "-") {
                options.push({element: cells[i], cell: cells[i].getAttribute("data-cell")})
            }
        }
        
        //create the illusion of the computer thinking
        setTimeout(() => {
            //randomly choose one of the options
            const randomCell = options[Math.floor(Math.random() * options.length)];
    
            //insert the chosen symbol to the state and UI and check if the game has ended
            insertXorO(randomCell.element)
        },
        Math.floor(Math.random() * 1) * 1000 + 1000);
    }
}

const onePlayerHTML = `
    <h2>Choose your symbol:</h2>
    <div class="two-btn-choice two-btn-choice2">
        <button class="btn" onclick="playerChoice('X')">X</button>
        <button class="btn" onclick="playerChoice('O')">O</button>
    </div>
`;

const twoPlayersHTML = `
    <div class="top-container">
        <h2 id="turn-ui">Turn: ${turn}</h2>
    </div>

    <div id="game-grid" class="bottom-container">
        <div class="grid-item" data-cell="1,1" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="1,2" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="1,3" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="2,1" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="2,2" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="2,3" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="3,1" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="3,2" onclick="insertXorO(this)">-</div>
        <div class="grid-item" data-cell="3,3" onclick="insertXorO(this)">-</div>
    </div>
`;

const onePlayerGameHTML = `
    <div class="top-container">
        <h2 id="turn-ui"></h2>
    </div>

    <div id="game-grid" class="bottom-container">
        <div class="grid-item" data-cell="1,1" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="1,2" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="1,3" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="2,1" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="2,2" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="2,3" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="3,1" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="3,2" onclick="gameManager(this)">-</div>
        <div class="grid-item" data-cell="3,3" onclick="gameManager(this)">-</div>
    </div>
`;

const gameStartHTML = `
    <h2>How many players?</h2>
    <div class="two-btn-choice">
        <button class="btn" onclick="onePlayer()">1 Player</button>
        <button class="btn" onclick="twoPlayers()">2 Players</button>
    </div>
`;

function startGame() {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = gameStartHTML;
}

startGame();
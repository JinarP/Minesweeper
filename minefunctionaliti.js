let table = [];
let bombLocation = [];

let rows = 8;
let column = 8;

let minesNumber;
let cellCliked = 0;
let gameOver = false;

function  startGame () {
    minesNumber = document.getElementById("numberOfMines").value;
    document.getElementById("mines").innerText = minesNumber;
    setMines();
    for (let r = 0; r < rows; ++r) {
        let row = [];
        for (let c = 0; c < column; ++c) {
            let cell = document.createElement("div");
            cell.id = r.toString() + "-" + c.toString();
            cell.addEventListener("click", clikCell);
            document.getElementById("table").append(cell);
            row.push(cell);
        }
        table.push(row);
    }
}

function setMines () {
    let bombs = minesNumber;
    while (bombs > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * column);
        let id = r.toString() + "-" + c.toString();
        if (!bombLocation.includes(id)) {
            bombLocation.push(id);
            console.log(id);
            --bombs;
        }
    }
}

function  clikCell() {
    if (gameOver || this.classList.contains("cliked")) {
        return;
    }
    let cell = this;
    if (bombLocation.includes(cell.id)) {
        document.getElementById("mesage").innerText =
            "YOU LOSE";
        gameOver = true;
        showBombs();
        return;
    }

    let coordinates = cell.id.split("-");
    let row = parseInt(coordinates[0]);
    let coll =parseInt(coordinates[1]);
    checkBombs(row, coll);
}

function showBombs () {
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < column; ++c) {
            let cell = table[r][c];
            if (bombLocation.includes(cell.id)) {
                cell.innerText =  "💣"
                cell.style.backgroundColor = "red";
            }
        }
    }
}

function checkBombs (row, coll) {

    if (table[row][coll].classList.contains("cliked")) {
        return;
    }

    table[row][coll].classList.add("cliked");
    ++cellCliked;

    if (cellCliked == rows * column - minesNumber) {
        document.getElementById("mesage").innerText =
            "YOU WIN"
        gameOver = true;
        showBombs();
        return;
    }

    let bombNumber = 0;

    bombNumber += checkCell(row - 1, coll - 1);
    bombNumber += checkCell(row - 1, coll);
    bombNumber += checkCell(row - 1, coll + 1);

    bombNumber += checkCell(row, coll - 1);
    bombNumber += checkCell(row, coll + 1);

    bombNumber += checkCell(row + 1, coll - 1);
    bombNumber += checkCell(row + 1, coll);
    bombNumber += checkCell(row + 1, coll + 1);

    if (bombNumber > 0) {
        table[row][coll].innerText = bombNumber;
        table[row][coll].classList.add("d" + bombNumber.toString());

    } else {
        checkBombs(row - 1, coll - 1);
        checkBombs(row - 1, coll);
        checkBombs(row - 1, coll + 1);

        checkBombs(row, coll - 1);
        checkBombs(row, coll + 1);

        checkBombs(row + 1, coll - 1);
        checkBombs(row + 1, coll);
        checkBombs(row + 1, coll + 1);
        console.log(cellCliked);
    }
}

function checkCell (row, coll) {
    if (bombLocation.includes(row.toString() + "-" + coll.toString())) {
        return 1;
    } else {
        return  0;
    }
}

function resetGame () {
    window.location.reload();
}
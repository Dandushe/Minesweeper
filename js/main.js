'use strict'
const EMPTY = '';
const MINE = '💣';
const MARK = '🚩'



var gBoard;
var gIsFirstMove;

var gLevelEasy = {
    size: 4,
    mines: 2
};
var gLevelMed = {
    size: 8,
    mines: 8
};
var gLevelHard = {
    size: 12,
    mines: 18
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function initGame() {
    gBoard = buildBoard(gLevelEasy.size)
    renderBoard(gBoard)
    gIsFirstMove = true;
}

function buildBoard(size) {
    var board = [];

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i][j] = cell


        }

    }
    // board[2][2].isMine = true;
    // board[3][1].isMine = true;

    console.table(board);
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var cellContainHTML = (!currCell.isShown) ? EMPTY : (currCell.isMine) ? MINE : (currCell.minesAroundCount > 0 ? currCell.minesAroundCount : EMPTY)
            var cellClassHTML = `${i}-${j}`;
            strHtml += `<td data-i="${i}" data-j="${j}"
             class = "cell ${cellClassHTML}" onclick = "cellClicked(this, ${i},${j})"oncontextmenu ="cellMarked(this,${i},${j})" > ${cellContainHTML}</td>`

        }
        strHtml += `</tr>`
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}


function cellClicked(elCell, i, j) {
    if (gIsFirstMove) {
        placeMines(i, j, gLevelEasy)
        setMinesNegsCount(gBoard)
        gIsFirstMove = false;
    }
    console.log(elCell);
    if (gBoard[i][j].isShown === true) return
    else {
        gBoard[i][j].isShown = true;
        renderBoard(gBoard)

    }

}




function cellMarked(elCell, i, j) {

    window.addEventListener('contextmenu', function(e) {
        // document.body.innerHTML += 
        e.preventDefault();
    }, );
    gIsFirstMove = false;
    var cell = gBoard[i][j]
    if (!cell.isShown) {
        if (cell.isMarked) {
            cell.isMarked = true;
            elCell.innerText = MARK;
        } else {
            cell.isMarked = false;
            elCell.innerText = EMPTY;
        }
    }
}

function checkGameOver() {

}
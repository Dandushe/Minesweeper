'use strict'
const EMPTY = '';
const MINE = '💣';
const MARK = '🚩';
const HAPPY = '😁';
const LOSER = '🤕';
const WINNER = '🥇';


var gBoard;
var gIsFirstMove;


var gLevel = {
    size: 4,
    mines: 2
};
// var gLevelMed = {
//     size: 8,
//     mines: 12
// };
// var gLevelHard = {
//     size: 12,
//     mines: 30
// }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function initGame(difficultyLevel) {
    difficultyLevel ? gLevel = difficultyLevel : ''
    gBoard = buildBoard(gLevel.size)
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
                isMarked: false
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
    debugger
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var cellContainHTML = (currCell.isMarked) ? MARK : (!currCell.isShown) ? EMPTY : (currCell.isMine) ? MINE : (currCell.minesAroundCount > 0 ? currCell.minesAroundCount : EMPTY)
            var cellClassHTML = `${i}${j}`;


            strHtml += `<td 
             class = "cell${cellClassHTML}" onclick = "cellClicked(this, ${i},${j})"
             oncontextmenu ="cellMarked(${i},${j})" 
            
             > ${cellContainHTML}</td>`

        }
        strHtml += `</tr>`
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}


function cellClicked(elCell, i, j) {
    if (gIsFirstMove) {
        placeMines(i, j, gLevel)
        setMinesNegsCount(gBoard)
        gIsFirstMove = false;
    }
    console.log(elCell);
    if (gBoard[i][j].isShown === true) return;
    gBoard[i][j].isShown = true;
    gBoard[i][j].isMarked = false;
    if (gBoard[i][j].minesAroundCount === 0) {
        expendShown(gBoard, elCell, i, j)
    }


    checkGameOver()
    renderBoard(gBoard);
}

///FLEGS
function cellMarked(i, j) {

    window.addEventListener('contextmenu', function(e) {
        // document.body.innerHTML += 
        e.preventDefault();
    }, );
    // gIsFirstMove = false;
    var cell = gBoard[i][j]
    if (!cell.isShown) {
        if (!cell.isMarked) {
            cell.isMarked = true;
            // elCell.innerText = MARK;
        } else {
            cell.isMarked = false;
            // elCell.innerText = EMPTY;
        }
    }
    renderBoard(gBoard)
}

function restartGame() {
    var elResetBtn = document.querySelector('.resetbtn')
    elResetBtn.innerText = HAPPY
    initGame(gLevel)
}

function checkGameOver() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]

            if (cell.isMine && cell.isShown) {
                GameOver(false)
                return

            }
            if (!cell.isMine && !cell.isShown) return;


        }
    }

    GameOver(true)
}


function GameOver(isWinner) {
    var elIcon = document.querySelector('.resetbtn')

    if (isWinner) {
        elIcon.innerText = WINNER
        alert('"There is one answer to failure: victory."')
        prompt('Type youre name here Put it on the score-board')
    }
    if (!isWinner) {
        elIcon.innerText = LOSER
        alert('Victory is sweetest when you`ve known defeat.')
    }



}

function expendShown(board, elCell, i, j) {

    for (var k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k >= board.length) continue
        for (var l = j - 1; l <= j + 1; l++) {
            if (l < 0 || l >= board[0].length) continue
            var currCell = gBoard[k][l]
            currCell.isShown = true;
            if (currCell.minesAroundCount === 0 && currCell.isShown === false) {
                expendShown(board, elCell, k, l)
            }
        }

    }
}

function difficultyEasy() {

}
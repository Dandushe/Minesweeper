'use strict'


function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var mineCount = 0;
            for (var k = i - 1; k <= i + 1; k++) {
                for (var l = j - 1; l <= j + 1; l++) {

                    if (k < 0 || l < 0 ||
                        k === board.length ||
                        l === board.length ||
                        (k === i && l === j)) continue;
                    if (board[k][l].isMine) {
                        mineCount++

                    }

                }

            }

            currCell.minesAroundCount = mineCount

        }
    }

}

function placeMines(posi, posj, gLevel) {
    var mineCount = 0;
    while (mineCount < gLevel.mines) {
        var randI = getRandomIntInclusive(0, gLevel.size - 1)
        var randJ = getRandomIntInclusive(0, gLevel.size - 1)
        if (randI === posi && randJ === posj) continue
        if (gBoard[randI][randJ].isMine) continue
        gBoard[randI][randJ].isMine = true;
        mineCount++


    }


}
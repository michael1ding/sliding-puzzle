import _ from 'lodash';

const size = 3;

// Getter Methods
export function getIndex(row, col) {
    return parseInt(row, 10) * size + parseInt(col, 10);
}

export function getMatrixPosition(index) {
    return {
        row: Math.floor(index / size),
        col: index % 3,
    };
}

export function getVisualPosition(row, col, width, height) {
    return {
        x: col * width,
        y: row * height,
    };
}

// Check Logic: https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
// takes in an arr[] of the tiles in order
function getInvCount(arr) {
    let inv_count = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = i + 1; j < 3; j++) {

            // Value 0 is used for empty space
            if (arr[j][i] > 0 && arr[j][i] > arr[i][j])
                inv_count += 1;
        }
    }
    return inv_count;
}

function isSolvable(puzzle) {
    return (getInvCount(puzzle) % 2 == 0);
}

export function shuffle(tiles, hole) {
    console.log("execute shuffle");
    do {
        tiles = _.shuffle(_.without(tiles, hole)).concat(hole);
    } while (!isSolvable(tiles));
    return tiles;
}

// Checks if the block can move
export function canSwap(srcIndex, destIndex) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
    const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
    if (Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1) {
        return true;
    }
    return false;
}

export function swap(tiles, src, dest) {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
}
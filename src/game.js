export const gameData = [
    [[1,0], [1,2], [1,3]],
    [[2,0], [2,1], [2,3]],
    [[3,0], [3,1], [3,2]],
    [[0,1], [0,2], [0,3]],
]

export const returnLineDiv = (pos) => {
    return ['<div class="', `line-${pos}`, '"></div>'].join('');
}

export const returnBlockDiv = (lineSet, {rowIdx, lineIdx}) => {
    const lines = lineSet.map((pos) => (
        returnLineDiv(pos)
    ))
    return `<div class="block" rowIdx="${rowIdx}" lineIdx="${lineIdx}">${lines.join('')}</div>`;
}

export const returnBoardDiv = (gameData) => {
    const gameHtml = gameData.map((line, lineIdx) => (
        line.map((row, rowIdx) => (
            returnBlockDiv(row, {rowIdx, lineIdx})
        )).join('')
    )).join('')

    return `<div class="board">${gameHtml}</div>`;
}

export class Game {
    constructor(gameData) {
        this.gameData = gameData;
    }

    render() {
        console.log(this.gameData)
        const gameHtml = returnBoardDiv(this.gameData);
        console.log(typeof gameHtml)
        document.getElementById('root').innerHTML = gameHtml;
        // const htmlStr = this.gameData
    }
}

window.Game = Game;

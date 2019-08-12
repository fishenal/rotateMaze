export const gameData = [
    [[1,0], [1,2], [1,3]],
    [[2,0], [2,1], [2,3]],
    [[3,0], [3,1], [3,2]],
    [[0,1], [0,2], [0,3]],
]
const $ = (selector, el) => {
    if (!el) {el = document;}
    return el.querySelectorAll(selector);
}

const queryBlock = (rowIdx, lineIdx) => {
    const nodeList = $(`.block[rowIdx="${rowIdx}"][lineIdx="${lineIdx}"]`);
    return nodeList[0];
}

export const returnLineDiv = (pos) => {
    return ['<div class="', `line-${pos}`, '"></div>'].join('');
}

export const returnBlockDiv = (lineSet, {rowIdx, lineIdx}) => {
    const lines = lineSet.map((pos) => (
        returnLineDiv(pos)
    ))
    return `<td class="block" rowIdx="${rowIdx}" lineIdx="${lineIdx}">${lines.join('')}</td>`;
}

export const returnBoardDiv = (gameData) => {
    const gameHtml = gameData.map((line, lineIdx) => {
        const trHtml = line.map((row, rowIdx) => (
            returnBlockDiv(row, {rowIdx, lineIdx})
        )).join('')
        return `<tr>${trHtml}</tr>`
    }).join('')

    return `<table class="board">${gameHtml}</table>`;
}

const rotate = (set) => {
    const ro = (pos) => {
        if (pos === 0) {
            return 3
        }
        return pos - 1
    }
    const result = [ro(set[0]), ro(set[1])];
    return result;
}

export class Game {
    constructor(gameData) {
        this.gameData = gameData;
        this.root = document.getElementById('root');
    }

    handleClick(e) {
        if (e.target.tagName !== 'TD' || e.target.className !== 'block') {
            return;
        }
        const rowIdx = Number(e.target.getAttribute('rowIdx'));
        const lineIdx = Number(e.target.getAttribute('lineIdx'));
        console.log(this.gameData)
        console.log(rowIdx, lineIdx)
        this.gameData[lineIdx][rowIdx] = rotate(this.gameData[lineIdx][rowIdx]);
        this.render()
        // const block = queryBlock(rowIdx, lineIdx);

    }

    render() {
        const gameHtml = returnBoardDiv(this.gameData);
        this.root.innerHTML = gameHtml;
        this.root.onclick = this.handleClick.bind(this);
        // const htmlStr = this.gameData
    }
}

const game = new Game(gameData);
game.render();

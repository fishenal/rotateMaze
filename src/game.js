const gameData = [
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

const checkConnect = (gameData) => {
    const highlightList = [];
    gameData.forEach((line, lineIdx) => {
        line.forEach((cell, rowIdx) => {
            const find = checkCellConnected(cell, rowIdx, lineIdx);
            if (find) {
                highlightList.push(find);
            }
        })
    })
    return highlightList;
}

const getCoordStr = (rowIdx, lineIdx) => {
    return '' + rowIdx + lineIdx;
}

const getCellPos = (rowIdx, lineIdx) => {
    return gameData[lineIdx] && gameData[lineIdx][rowIdx];
}

const checkCellConnected = (cellPos, rowIdx, lineIdx) => {
    let find = false;
    cellPos.forEach(pos => {
        if (pos === 0) {
            const targetCell = getCellPos(rowIdx, lineIdx - 1);
            if (targetCell && targetCell.indexOf(2) > -1) {
                find = getCoordStr(rowIdx, lineIdx);
            }
        }
        if (pos === 1) {
            const targetCell = getCellPos(rowIdx + 1, lineIdx);
            if (targetCell && targetCell.indexOf(3) > -1) {
                find = getCoordStr(rowIdx, lineIdx);
            }
        }
        if (pos === 2) {
            const targetCell = getCellPos(rowIdx, lineIdx + 1);
            if (targetCell && targetCell.indexOf(0) > -1) {
                find = getCoordStr(rowIdx, lineIdx);
            }
        }
        if (pos === 3) {
            const targetCell = getCellPos(rowIdx - 1, lineIdx);
            if (targetCell && targetCell.indexOf(1) > -1) {
                find = getCoordStr(rowIdx, lineIdx);
            }
        }
    })
    return find;
}

const returnLineDiv = (pos) => {
    return ['<div class="', `line-${pos}`, '"></div>'].join('');
}

const returnBlockDiv = (lineSet, {rowIdx, lineIdx}, isHighlight) => {
    const lines = lineSet.map((pos) => (
        returnLineDiv(pos)
    ))
    const className = isHighlight ? 'block highlight' : 'block';
    return `<td class="${className}" rowIdx="${rowIdx}" lineIdx="${lineIdx}">${lines.join('')}</td>`;
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
        this.highlightList = [];
        this.root = document.getElementById('root');
    }

    returnBoardDiv(gameData) {
        const gameHtml = this.gameData.map((line, lineIdx) => {
            const trHtml = line.map((row, rowIdx) => {
                const isHighlight = this.highlightList.indexOf(getCoordStr(rowIdx, lineIdx)) > -1;
                return returnBlockDiv(row, {rowIdx, lineIdx}, isHighlight)
            }).join('')
            return `<tr>${trHtml}</tr>`
        }).join('')

        return `<table class="board">${gameHtml}</table>`;
    }

    handleClick(e) {
        if (e.target.tagName !== 'TD' || e.target.className.indexOf('block') < 0) {
            return;
        }
        const rowIdx = Number(e.target.getAttribute('rowIdx'));
        const lineIdx = Number(e.target.getAttribute('lineIdx'));
        this.gameData[lineIdx][rowIdx] = rotate(this.gameData[lineIdx][rowIdx]);
        this.render();
        // const block = queryBlock(rowIdx, lineIdx);

    }

    render() {
        this.highlightList = checkConnect(this.gameData, this.highlightList);
        const gameHtml = this.returnBoardDiv();
        this.root.innerHTML = gameHtml;
        this.root.onclick = this.handleClick.bind(this);
        // const htmlStr = this.gameData
    }
}

const game = new Game(gameData);
game.render();

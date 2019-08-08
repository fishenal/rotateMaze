import {
    returnLineDiv,
    returnBlockDiv,
    gameData,
    returnBoardDiv
} from '../src/game.js';

const mockGameData = [
    [[1,0], [1,2], [1,3]],
    [[2,0], [2,1], [2,3]],
    [[3,0], [3,1], [3,2]],
    [[0,1], [0,2], [0,3]],
]

test('returnLineDiv func', () => {
    [0, 1, 2, 3].forEach(idx => {
        expect(returnLineDiv(idx)).toBe(`<div class="line-${idx}"></div>`)
    })
})
test('returnBlockDiv func', () => {
    [[1,0], [1,2], [1,3], [3,0], [3,1], [0,1], [0,2]].forEach(set => {
        expect(returnBlockDiv(set, {rowIdx: set[0], lineIdx: set[1]})).toBe(`<div class="block" rowIdx="${set[0]}" lineIdx="${set[1]}"><div class="line-${set[0]}"></div><div class="line-${set[1]}"></div></div>`)
    })
})
test('returnBoardDiv func', () => {
    expect(returnBoardDiv(mockGameData)).toBe('<div class="board"><div class="block" rowIdx="0" lineIdx="0"><div class="line-1"></div><div class="line-0"></div></div><div class="block" rowIdx="1" lineIdx="0"><div class="line-1"></div><div class="line-2"></div></div><div class="block" rowIdx="2" lineIdx="0"><div class="line-1"></div><div class="line-3"></div></div><div class="block" rowIdx="0" lineIdx="1"><div class="line-2"></div><div class="line-0"></div></div><div class="block" rowIdx="1" lineIdx="1"><div class="line-2"></div><div class="line-1"></div></div><div class="block" rowIdx="2" lineIdx="1"><div class="line-2"></div><div class="line-3"></div></div><div class="block" rowIdx="0" lineIdx="2"><div class="line-3"></div><div class="line-0"></div></div><div class="block" rowIdx="1" lineIdx="2"><div class="line-3"></div><div class="line-1"></div></div><div class="block" rowIdx="2" lineIdx="2"><div class="line-3"></div><div class="line-2"></div></div><div class="block" rowIdx="0" lineIdx="3"><div class="line-0"></div><div class="line-1"></div></div><div class="block" rowIdx="1" lineIdx="3"><div class="line-0"></div><div class="line-2"></div></div><div class="block" rowIdx="2" lineIdx="3"><div class="line-0"></div><div class="line-3"></div></div></div>')
})

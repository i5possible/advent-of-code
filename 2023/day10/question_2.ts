import { readLines } from '../../fileUtils'

const map = readLines('./input.txt')
    .filter((line) => line !== '')
    .map((line) => line.split(''))

// array[y][x]
// x ------>
// y
// |
// |
// v

// map: the position of pipe -> the next position to go

const pipesMap: Record<string, Record<string, string>> = {
    '|': {
        '0,1': '0,1',
        '0,-1': '0,-1',
    },
    '-': {
        '1,0': '1,0',
        '-1,0': '-1,0',
    },
    L: {
        '0,1': '1,0',
        '-1,0': '0,-1',
    },
    J: {
        '0,1': '-1,0',
        '1,0': '0,-1',
    },
    '7': {
        '1,0': '0,1',
        '0,-1': '-1,0',
    },
    F: {
        '0,-1': '1,0',
        '-1,0': '0,1',
    },
}

const findStartPosition = (map: string[][]): number[] => {
    for (let y = 0; y < map.length; y++) {
        const row = map[y]
        for (let x = 0; x < row.length; x++) {
            if (row[x] === 'S') {
                return [x, y]
            }
        }
    }
    return [-1, -1]
}

const printMap = (map: string[][]): void => {
    console.log('********************')
    const maxX = Math.max(...map.map((row) => row.length))
    const maxY = map.length
    for (let y = 0; y < maxY; y++) {
        const row = map[y]
        let line = ''
        for (let x = 0; x < maxX; x++) {
            const item = row[x]
            line += item || '.'
        }
        console.log(line)
    }
    console.log('********************')
}

const directions = ['0,1', '0,-1', '1,0', '-1,0']
let mapWithLoop: string[][] = []

const walk = (map: string[][]): string[][] => {
    const startPosition = findStartPosition(map)
    // console.log(map)
    // console.log(startPosition);
    const counts = directions.map((direction) => {
        let [x, y] = startPosition
        // console.log('------------')
        // console.log(`start direction: ${direction}`)
        let currentDirection = direction
        let count = 0
        let tempMap: string[][] = []
        while (currentDirection) {
            tempMap[y] = tempMap[y] || []
            tempMap[y][x] = 'X'
            // console.log(
            //     `current position: ${x}, ${y}, current direction: ${currentDirection}`
            // )
            const [dx, dy] = currentDirection.split(',').map(Number)
            // move to the next position
            x = x + dx
            y = y + dy
            // check if the next position is valid
            if (x >= 0 && x < map[0].length && y >= 0 && y < map.length) {
                count++
                // next pipe token
                const nextToken = map[y][x]
                // next token is a valid pipe
                if (Object.keys(pipesMap).includes(nextToken)) {
                    // get the currentDirection to go
                    currentDirection = pipesMap[nextToken][currentDirection]
                } else {
                    break
                }
            } else {
                break
            }
        }
        if (count > 1) {
            // printMap(mapWithLoop)
            mapWithLoop = tempMap
        }
        return count
    })
    return mapWithLoop
}

const checkAndMarkTile = (
    map: string[][],
    x: number,
    y: number,
    maxX: number,
    maxY: number
): void => {
    if (!map[y]) {
        map[y] = []
    }
    const item = map[y][x]
    if (item === 'X') {
        return
    } else if (y === 0 || y === maxY - 1 || x === 0 || x === maxX - 1) {
        map[y][x] = 'O'
    } else if (
        map[y][x - 1] === 'O' ||
        map[y][x + 1] === 'O' ||
        map[y - 1][x] === 'O' ||
        map[y + 1][x] === 'O'
    ) {
        map[y][x] = 'O'
    }
}

const countInsideTiles = (map: string[][]): number => {
    const maxX = Math.max(...map.map((row) => row.length))
    const maxY = map.length
    let count = 0
    for (let y = 0; y < maxY; y++) {
        const row = map[y]
        for (let x = 0; x < maxX; x++) {
            const item = row[x]
            if (!item) {
                count++
            }
        }
    }
    return count
}

// const markOutsideTiles = (map: string[][]): string[][] => {
//     const maxX = Math.max(...map.map((row) => row.length))
//     const maxY = map.length
//     let i = 0
//     while (true) {
//         for (let y = i; y < maxY - i; y++) {
//             ;[i, maxX - i - 1].forEach((x) =>
//                 checkAndMarkTile(map, x, y, maxX, maxY)
//             )
//         }
//         for (let x = i; x < maxX - i; x++) {
//             ;[i, maxY - i - 1].forEach((y) =>
//                 checkAndMarkTile(map, x, y, maxX, maxY)
//             )
//         }
//         i++
//         if (i > maxX / 2 || i > maxY / 2) {
//             break
//         }
//     }
//     return map
// }

walk(map)
// const markedMap = markOutsideTiles(mapWithLoop)
// printMap(markedMap)
// console.log(countInsideTiles(markedMap))

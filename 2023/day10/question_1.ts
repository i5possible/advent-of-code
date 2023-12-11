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

const directions = ['0,1', '0,-1', '1,0', '-1,0']

const walk = (map: string[][]): number => {
    const startPosition = findStartPosition(map)
    // console.log(map)
    // console.log(startPosition);
    const counts = directions.map((direction) => {
        let [x, y] = startPosition
        // console.log('------------')
        // console.log(`start direction: ${direction}`)
        let currentDirection = direction
        let count = 0
        while (currentDirection) {
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
        return count
    })
    console.log(counts)
    return counts.find((count) => count !== 1) || 0
}

console.log(walk(map) / 2)

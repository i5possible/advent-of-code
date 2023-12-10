import { readData } from '../../fileUtils'
import { sum } from '../../utils/reducer'

const data = readData('./input.txt')

const predictNextValue = (currentNumbers: number[]): number => {
    let current = currentNumbers.reverse()
    let nextValue = currentNumbers[0]
    while (!current.every((num) => num === 0)) {
        for (let i = 0; i < current.length - 1; i++) {
            current[i] = current[i] - current[i + 1]
        }
        current.pop()
        nextValue += current[0]
    }
    // console.log(nextValue)
    return nextValue
}

const result = data
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => predictNextValue(line.split(' ').map(Number)))
    .reduce(sum, 0)

// 1743490457
console.log(result)

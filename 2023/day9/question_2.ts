import { readData } from '../../fileUtils'
import { sum } from '../../utils/reducer'

const data = readData('./input.txt')

const predictNextValue = (currentNumbers: number[]): number => {
    let firstValues = []
    let current = currentNumbers
    while (!current.every((num) => num === 0)) {
        firstValues.unshift(current[0])
        for (let i = 0; i < current.length - 1; i++) {
            current[i] = current[i + 1] - current[i]
        }
        current.pop()
    }
    // console.log(firstValues)
    let currentValue = 0
    for (let i = 0; i < firstValues.length; i++) {
        currentValue = firstValues[i] - currentValue
        // console.log(firstValues[i], currentValue)
    }
    // console.log('----')
    return currentValue
}

const result = data
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => predictNextValue(line.split(' ').map(Number)))
    .reduce(sum, 0)

// 1743490457
console.log(result)

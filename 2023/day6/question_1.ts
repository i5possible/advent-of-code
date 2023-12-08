import { readData } from '../../fileUtils'

const data: string = readData('./input.txt')

const [time, distance] = data.split('\n')
const times = time.split(': ')[1].trim().split(/\s+/).map(Number)
const distances = distance.split(': ')[1].trim().split(/\s+/).map(Number)

console.log(times, distances)

// optimization for large data set:
//      use binary search to find (within [0, time/2]) the first one that is larger than the target
//      then the value is (time + 1 - index * 2)
const result = times
    .map((time, index) => {
        const distance = distances[index]
        let count = 0
        for (let i = 0; i <= time; i++) {
            if (i * (time - i) > distance) {
                count++
            }
        }
        return count
    })
    .reduce((acc, cur) => acc * cur, 1)

// 281600
console.log(result)

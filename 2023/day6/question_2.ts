import { readData } from '../../fileUtils'

const data: string = readData('./input.txt')

const [timeStr, distanceStr] = data.split('\n')
const totalTime = Number(timeStr.split(': ')[1].trim().split(/\s+/).join(''))
const targetDistance = Number(
    distanceStr.split(': ')[1].trim().split(/\s+/).join('')
)

console.log(totalTime, targetDistance)

let cap = Math.round(totalTime) / 2
let current = Math.floor(cap / 2)
let distance = 0
while (distance < targetDistance) {
    let value = current * (totalTime - current)
    console.log(value, current, cap)
    if (value > targetDistance) {
        cap = current
        current = Math.floor(current / 2)
    } else {
        distance = value
        if (current === Math.floor((current + cap) / 2)) {
            break
        }
        current = Math.floor((current + cap) / 2)
    }
}

console.log(totalTime + 1 - 2 * cap)

// 33875953

import { readData } from '../../fileUtils'

const data: string = readData('./input.txt')

const [instructions, maps] = data.split('\n\n')

console.log(instructions, maps)

type Item = {
    key: string
    left: string
    right: string
}

const items: Item[] = maps
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
        const [key, left, right] = line
            .split(/[=,()]/)
            .map((element) => element.trim())
            .filter((element) => element !== '')
        console.log(key, left, right)
        return { key, left, right }
    })

const map = items.reduce(
    (acc, cur) => {
        acc[cur.key] = cur
        return acc
    },
    {} as Record<string, Item>
)

let current = 'AAA'
let target = 'ZZZ'
let i = 0
let count = 0
while (current !== target) {
    const instruction = instructions[i++]
    current = instruction === 'L' ? map[current].left : map[current].right
    count++
    if (i === instructions.length) {
        i = 0
    }
}
// 12737
console.log(count)

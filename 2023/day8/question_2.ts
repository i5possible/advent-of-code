import { readData } from '../../fileUtils'

const data: string = readData('./input.txt')

const [instructions, maps] = data.split('\n\n')

// console.log(instructions, maps)

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
        // console.log(key, left, right)
        return { key, left, right }
    })

const map = items.reduce(
    (acc, cur) => {
        acc[cur.key] = cur
        return acc
    },
    {} as Record<string, Item>
)

const endWithZ = (items: Item[]) =>
    items.every((item) => item.key.endsWith('Z'))

let currentItems = items.filter((item) => item.key.endsWith('A'))
console.log(currentItems)
// It takes too long to run
// while (!endWithZ(currentItems)) {
//     const instruction = instructions[i++]
//
//     if (count % 1000000 === 0) {
//         console.log(
//             instruction,
//             currentItems.map((item) => item.key).join(','),
//             count,
//             i
//         )
//     }
//
//     currentItems = currentItems.map((current) =>
//         instruction === 'L'
//             ? map[map[current.key].left]
//             : map[map[current.key].right]
//     )
//     count++
//     if (i === instructions.length) {
//         i = 0
//     }
// }

const endWithZItem = (item: Item) => item.key.endsWith('Z')

const findSteps = (currentItem: Item, instructions: string) => {
    let i = 0
    let count = 0
    while (!endWithZItem(currentItem)) {
        const instruction = instructions[i++]
        currentItem =
            instruction === 'L' ? map[currentItem.left] : map[currentItem.right]
        count++
        if (i === instructions.length) {
            i = 0
        }
    }
    return count
}
const gcd = (a: number, b: number): number => {
    if (b === 0) return a
    return gcd(b, a % b)
}

const itemsSteps = currentItems.map((item) => findSteps(item, instructions))

console.log(itemsSteps)

for (let i = 0; i < itemsSteps.length; i++) {
    for (let j = i + 1; j < itemsSteps.length; j++) {
        const a = itemsSteps[i] / 271
        const b = itemsSteps[j] / 271
        const g = gcd(a, b)
        console.log(a, b, g)
    }
}
console.log(
    itemsSteps.reduce((acc, cur) => acc * BigInt(cur / 271), BigInt(271))
)

import { readLines } from '../../fileUtils'
import { product, sum } from '../../utils/reducer'

const lines = readLines('./input.txt')

type Game = {
    id: number
    bags: Record<string, number[]>
}

const parseGame = (line: string): Game => {
    const [game, data] = line.split(':')
    const id = Number(game.split(' ')[1])
    const bags = data
        .split(/[,;]/)
        .map((bag) => {
            const [count, name] = bag.trim().split(' ')
            // console.log(name, count)
            return { name, count }
        })
        .reduce(
            (acc, cur) => {
                acc[cur.name] = acc[cur.name]
                    ? [Number(cur.count), ...acc[cur.name]]
                    : [Number(cur.count)]
                return acc
            },
            {} as Record<string, number[]>
        )
    return { id, bags }
}

const colors = ['red', 'green', 'blue']

const result = lines
    .map((line) => parseGame(line))
    .map((game) => {
        // console.log(game)
        return game
    })
    .map((game) =>
        colors.map((color) => Math.max(...game.bags[color])).reduce(product, 1)
    )
    .reduce(sum, 0)

// 59795
console.log(result)

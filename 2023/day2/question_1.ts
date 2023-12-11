import { readLines } from '../../fileUtils'
import { sum } from '../../utils/reducer'

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

const result = lines
    .map((line) => parseGame(line))
    .map((game) => {
        // console.log(game)
        return game
    })
    .filter((game) => {
        const bags = game.bags
        return (
            bags['red'].every((round) => round <= 12) &&
            bags['green'].every((round) => round <= 13) &&
            bags['blue'].every((round) => round <= 14)
        )
    })
    .map((game) => game.id)
    .reduce(sum, 0)

// 2617
console.log(result)

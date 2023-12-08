import { readData } from '../../fileUtils'

const data: string = readData('./input.txt')

const processSeeds = (seedLine: string): number[] =>
    seedLine.split(': ')[1].split(' ').map(Number)

const processData = (data: string): number => {
    const sections: string[] = data.split('\n\n')
    const seedLine = sections.shift() || ''
    // console.log(seedLine);
    const seeds: number[] = processSeeds(seedLine)
    // console.log(seeds);
    const dictList: number[][][] = sections.map((section) =>
        section
            .split('\n')
            .splice(1)
            .filter((line) => line !== '')
            .map((line) => line.split(' ').map(Number))
    )

    return seeds
        .map((seed) => {
            // console.log("seed", seed);
            let current = seed
            for (let i = 0; i < dictList.length; i++) {
                const dict: number[][] = dictList[i]
                const result = dict
                    .map((rule) => {
                        const [destination, source, length] = rule
                        const inRange =
                            current >= source && current < source + length
                        // console.log(current, source, inRange);
                        if (inRange) {
                            return destination + (current - source)
                        } else {
                            return -1
                        }
                    })
                    .filter((cur) => cur !== -1)
                if (result.length > 0) {
                    current = result[0]
                }
                // console.log("current", current);
            }
            return current
        })
        .sort((a, b) => a - b)[0]
}

// 510109797
console.log(processData(data))

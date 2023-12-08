import { readData } from '../../fileUtils'

const data: string = readData('./input.txt')

const processSeeds = (seedLine: string): number[][] =>
    seedLine
        .split(': ')[1]
        .split(' ')
        .map(Number)
        .map((num, index, array) => {
            if (index % 2 === 0) {
                return []
            } else {
                return [array[index - 1], array[index]]
            }
        })
        .filter((num) => num.length > 0)

const intersection = (current: number[], rule: number[]): number[] => {
    const [curStart, curRange] = current
    const [destination, ruleStart, ruleRange] = rule
    const start = Math.max(curStart, ruleStart)
    const end = Math.min(curStart + curRange, ruleStart + ruleRange)
    //
    if (start >= end) {
        return []
    } else {
        // ruleStart < currentStart < ruleStart + ruleRange
        // currentStart mapping to destination + (start - ruleStart)
        const newStart = destination + (start - ruleStart)
        const range = end - start
        return [newStart, range]
    }
}

const findMin = (arr: number[][]): number => {
    let min = Infinity
    for (let i = 0; i < arr.length; i++) {
        const [start] = arr[i]
        if (start < min) {
            min = start
        }
    }
    return min
}

const processData = (data: string): number => {
    const sections: string[] = data.split('\n\n')
    const seedLine = sections.shift() || ''
    console.log(seedLine)
    const seeds: number[][] = processSeeds(seedLine)
    console.log(seeds)
    const dictList: number[][][] = sections.map((section) =>
        section
            .split('\n')
            .splice(1)
            .filter((line) => line !== '')
            .map((line) => line.split(' ').map(Number))
    )
    console.log('dictList', dictList)

    const seedPosition: number[][][] = seeds
        .map((seed) => {
            console.log('seed', seed)
            let current: number[][] = [seed]
            for (let i = 0; i < dictList.length; i++) {
                const dict: number[][] = dictList[i]
                let temp: number[][] = []
                for (let j = 0; j < current.length; j++) {
                    let mapped: number[][] = []
                    dict.map((rule) => {
                        const result = intersection(current[j], rule)
                        // console.log('result', current[j], rule, result)
                        if (result.length > 0) {
                            temp.push(result)
                        }
                        // match from the rule's start, length is the matched length
                        if (result[0] === rule[0]) {
                            mapped.push([rule[1], result[1]])
                        }
                        // match from the current's start, length is the matched length
                        if (result[0] === current[j][0] + rule[0] - rule[1]) {
                            mapped.push([current[j][0], result[1]])
                        }
                    })
                    // console.log('current[j]', current[j])
                    // console.log('mapped', mapped)
                    // compare current[j] with mapped, carry on the range that is not matched
                    const [curStart, curRange] = current[j]
                    mapped.sort((a, b) => a[0] - b[0])
                    let cur = curStart
                    for (let k = 0; k < mapped.length; k++) {
                        const [start, range] = mapped[k]
                        if (start > cur) {
                            temp.push([curStart, start - cur])
                        }
                        cur = start + range
                    }
                    if (cur < curStart + curRange) {
                        temp.push([cur, curStart + curRange - cur])
                    }
                }
                current = temp
            }
            return current.sort((a, b) => a[0] - b[0])
        })
        .sort((a, b) => findMin(a) - findMin(b))
    // console.log(seedPosition)
    return seedPosition[0][0] ? seedPosition[0][0][0] : 0
}

// 9622622
console.log(processData(data))

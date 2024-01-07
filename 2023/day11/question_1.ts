import { readLines } from '../../fileUtils'

const image = readLines('../input.txt').filter((line) => line.length > 0)

const expendInRow = (image: string[][]): string[][] => {
    const newImage: string[][] = []
    image.forEach((row) => {
        newImage.push(row)
        if (!row.join('').includes('#')) {
            newImage.push(row)
        }
    })
    return newImage
}

const expendInColumn = (image: string[][]): string[][] => {
    const newImage: string[][] = []
    for (let i = 0; i < image[0].length; i++) {
        const row = image[i]
        newImage.push(row)
        if (!row.join('').includes('#')) {
            newImage.push(row)
        }
    }
    return newImage
}

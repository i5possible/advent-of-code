import { readData } from '../../fileUtils'
import { sum } from '../../utils/reducer'
import { isEmpty, sortBy } from 'lodash'

const data: string = readData('./input.txt')

const allCards = 'J23456789TQKA'

const valueOfCard = (card: string): number => {
    return allCards.indexOf(card) + 2
}

const valueOfHand = (cards: string[]): number =>
    cards
        .map((card, index) => valueOfCard(card) << ((5 - index) * 4))
        .reduce(sum, 0)

type Counter = Record<string, number>

const kindOfHand = (cards: string[]): number => {
    let map: Counter = cards.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {} as Counter)
    const jCount = map['J'] || 0
    let max = ''
    for (let i = 0; i < Object.keys(map).length; i++) {
        const key = Object.keys(map)[i]
        if (key === 'J') {
            map[key] = 0
            continue
        }
        if (!max || map[key] > map[max]) {
            max = key
        }
    }
    if (jCount && max !== '') {
        map[max] = map[max] + jCount
    } else {
        map['J'] = jCount
    }
    return Object.values(map).reduce((acc, cur) => acc + Math.pow(cur, 2), 0)
}

// console.log(kindOfHand('JJJJJ'.split('')))
// console.log(kindOfHand('JJJJA'.split('')))
// console.log(kindOfHand('4JJJA'.split('')))
// console.log(kindOfHand('44JAA'.split('')))
// console.log(kindOfHand('45JAA'.split('')))
// console.log(kindOfHand('455AA'.split('')))
// console.log(kindOfHand('456JA'.split('')))
// console.log(kindOfHand('4567A'.split('')))

type Hand = {
    cards: string[]
    kind: number
    value: number
    bid: number
}

const value = sortBy(
    data
        .split('\n')
        .filter((item) => !isEmpty(item))
        .map((line) => {
            const [cardsStr, bidStr] = line.split(' ')
            const cards = cardsStr.split('')
            const bid = Number(bidStr)
            const kind = kindOfHand(cards)
            const value = valueOfHand(cards)
            const info: Hand = { cards, kind, value, bid }
            // console.log(info)
            return info
        }),
    ['kind', 'value']
)
    .map((hand, index) => {
        console.log(hand.cards.join(''), hand.bid, index + 1)
        return hand.bid * (index + 1)
    })
    .reduce(sum, 0)

// your answer is too high. 250668911
// 250665248
console.log(value)

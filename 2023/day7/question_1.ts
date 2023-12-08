import { readData } from '../../fileUtils'
import { sum } from '../../utils/reducer'
import { isEmpty, sortBy } from 'lodash'

const data: string = readData('./input.txt')

const allCards = '23456789TJQKA'

const valueOfCard = (card: string): number => {
    return allCards.indexOf(card) + 2
}

const valueOfHand = (cards: string[]): number =>
    cards
        .map((card, index) => valueOfCard(card) << ((5 - index) * 4))
        .reduce(sum, 0)

type Counter = Record<string, number>

const kindOfHand = (cards: string[]): number =>
    Object.values(
        cards.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1
            return acc
        }, {} as Counter)
    ).reduce((acc, cur) => acc + Math.pow(cur, 2), 0)

// console.log(kindOfHand('AAAAA'.split('')))
// console.log(kindOfHand('4AAAA'.split('')))
// console.log(kindOfHand('44AAA'.split('')))
// console.log(kindOfHand('45AAA'.split('')))
// console.log(kindOfHand('455AA'.split('')))
// console.log(kindOfHand('456AA'.split('')))
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
        // console.log(hand.cards.join(''), hand.bid, index + 1)
        return hand.bid * (index + 1)
    })
    .reduce(sum, 0)

// 250120186
console.log(value)

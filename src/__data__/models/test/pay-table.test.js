import { payTable } from '../pay-table'

import { IMG_BAR_3, IMG_BAR_2, IMG_BAR_1, IMG_SEVEN, IMG_CHERRY } from '../../constants'

describe('pay-table', () => {
    it('payTable consistency', () => {
        expect(payTable.length).toBe(9)
    })

    it('3 CHERRY symbols on top line', () => {
        const { check, cost } = payTable[0]
        expect(check).toBeDefined()
        expect(cost).toBe(2000)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
        ])).toBe(0)
        expect(check([
            [IMG_CHERRY, IMG_BAR_1, IMG_CHERRY],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('3 CHERRY symbols on center line', () => {
        const { check, cost } = payTable[1]
        expect(check).toBeDefined()
        expect(cost).toBe(1000)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
        ])).toBe(1)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('3 CHERRY symbols on bottom line', () => {
        const { check, cost } = payTable[2]
        expect(check).toBeDefined()
        expect(cost).toBe(4000)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toBe(2)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('3 7 symbols on any line', () => {
        const { check, cost } = payTable[3]
        expect(check).toBeDefined()
        expect(cost).toBe(150)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_SEVEN, IMG_SEVEN, IMG_SEVEN],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toBe(1)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('Any combination of CHERRY and 7 on any line', () => {
        const { check, cost } = payTable[4]
        expect(check).toBeDefined()
        expect(cost).toBe(75)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_SEVEN, IMG_SEVEN, IMG_SEVEN],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toBe(0)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_BAR_3, IMG_BAR_1],
            [IMG_CHERRY, IMG_BAR_2, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('3 3xBAR symbols on any line', () => {
        const { check, cost } = payTable[5]
        expect(check).toBeDefined()
        expect(cost).toBe(50)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_BAR_3, IMG_BAR_3, IMG_BAR_3],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toBe(1)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_BAR_3, IMG_BAR_1],
            [IMG_CHERRY, IMG_BAR_2, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('3 2xBAR symbols on any line', () => {
        const { check, cost } = payTable[6]
        expect(check).toBeDefined()
        expect(cost).toBe(20)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_BAR_2, IMG_BAR_2, IMG_BAR_2],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toBe(1)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_BAR_3, IMG_BAR_1],
            [IMG_CHERRY, IMG_BAR_2, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('3 BAR symbols on any line', () => {
        const { check, cost } = payTable[7]
        expect(check).toBeDefined()
        expect(cost).toBe(10)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN, IMG_BAR_1],
            [IMG_BAR_1, IMG_BAR_1, IMG_BAR_1],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toBe(1)
        expect(check([
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
            [IMG_CHERRY, IMG_BAR_3, IMG_BAR_1],
            [IMG_CHERRY, IMG_BAR_2, IMG_BAR_1],
        ])).toBe(-1)
    })

    it('Combination of any BAR symbols on any line', () => {
        const { check, cost } = payTable[8]
        expect(check).toBeDefined()
        expect(cost).toBe(5)
        expect(check([
            [IMG_CHERRY, IMG_SEVEN],
            [ IMG_BAR_1],
            [IMG_CHERRY, IMG_BAR_1, IMG_CHERRY],
        ])).toEqual([1, 2])
        expect(check([
            [IMG_CHERRY, IMG_SEVEN],
            [ IMG_SEVEN],
            [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY],
        ])).toEqual([])
    })
})

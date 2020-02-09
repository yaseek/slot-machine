import { Map, OrderedMap } from 'immutable'

import {
    IMG_BAR_3, IMG_BAR_2, IMG_BAR_1,
    IMG_SEVEN, IMG_CHERRY } from '../constants'
import * as img from '../../assets'

import { payTable } from './pay-table'

export const slotMachine = Map({
    images: Map([
        [IMG_BAR_3, img.barx3],
        [IMG_BAR_1, img.barx1],
        [IMG_BAR_2, img.barx2],
        [IMG_SEVEN, img.seven],
        [IMG_CHERRY, img.cherry],
    ]),
    payTable,
    isSpinning: false,
    total: 1,
    win: Map(),
    debug: Map([
    ]),
    reels: OrderedMap([
        [0, Map({
            value: [
                0,
                1,
            ],
        })],
        [1, Map({
            value: [
                0,
                1,
            ],
        })],
        [2, Map({
            value: [
                0,
                1,
            ],
        })],
    ])
})